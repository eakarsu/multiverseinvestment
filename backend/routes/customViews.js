// === Custom Views (Invest Views) ===
// 4 endpoints: 2 VIZ (portfolio performance, sector allocation heatmap)
//              2 NON-VIZ (investment statement PDF, investment rules CRUD)
// In-memory store; no DB writes required.

const express = require('express');
const router = express.Router();

// In-memory rules store (lazy table)
let _ruleSeq = 1;
const investmentRules = new Map();

// Seed a few default rules so the UI is not empty.
function seedRules() {
  if (investmentRules.size > 0) return;
  const defaults = [
    { name: 'Max single position', metric: 'position_weight', operator: '<=', threshold: 10, action: 'flag', enabled: true, notes: 'No more than 10% in a single holding.' },
    { name: 'Sector concentration', metric: 'sector_weight', operator: '<=', threshold: 35, action: 'rebalance', enabled: true, notes: 'Cap any single sector at 35%.' },
    { name: 'Min cash buffer', metric: 'cash_weight', operator: '>=', threshold: 5, action: 'alert', enabled: true, notes: 'Keep at least 5% cash buffer.' },
    { name: 'Max drawdown', metric: 'drawdown_pct', operator: '<=', threshold: 20, action: 'review', enabled: true, notes: 'Trigger review if drawdown exceeds 20%.' },
  ];
  for (const r of defaults) {
    const id = _ruleSeq++;
    investmentRules.set(id, { id, createdAt: new Date().toISOString(), ...r });
  }
}
seedRules();

// ---------- VIZ #1: Portfolio performance chart ----------
// Deterministic synthetic 12-month performance for the portfolio + benchmark.
router.get('/portfolio-performance', (req, res) => {
  try {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let portfolio = 100;
    let benchmark = 100;
    const series = months.map((m, i) => {
      // deterministic pseudo-random returns
      const pReturn = ((Math.sin(i * 1.7 + 0.5) + Math.cos(i * 0.9)) * 1.4) + 1.1; // mostly positive
      const bReturn = ((Math.sin(i * 1.3 + 1.1) + Math.cos(i * 1.05)) * 1.1) + 0.6;
      portfolio = +(portfolio * (1 + pReturn / 100)).toFixed(2);
      benchmark = +(benchmark * (1 + bReturn / 100)).toFixed(2);
      return {
        month: m,
        portfolio,
        benchmark,
        portfolioReturn: +pReturn.toFixed(2),
        benchmarkReturn: +bReturn.toFixed(2),
      };
    });
    const totalReturn = +((portfolio - 100)).toFixed(2);
    const benchTotal = +((benchmark - 100)).toFixed(2);
    res.json({
      series,
      summary: {
        startValue: 100,
        endValue: portfolio,
        totalReturnPct: totalReturn,
        benchmarkReturnPct: benchTotal,
        alphaPct: +(totalReturn - benchTotal).toFixed(2),
        bestMonth: series.reduce((a, b) => (b.portfolioReturn > a.portfolioReturn ? b : a)),
        worstMonth: series.reduce((a, b) => (b.portfolioReturn < a.portfolioReturn ? b : a)),
      },
    });
  } catch (e) {
    res.status(500).json({ error: e.message || 'failed to build portfolio performance' });
  }
});

// ---------- VIZ #2: Sector allocation heatmap ----------
// Grid of sectors x regions with allocation %, suitable for a heatmap render.
router.get('/sector-allocation', (req, res) => {
  try {
    const sectors = ['Technology','Financials','Healthcare','Energy','Consumer','Industrials','Materials','Real Estate'];
    const regions = ['NA','EU','APAC','LATAM'];
    let total = 0;
    const cells = [];
    for (let i = 0; i < sectors.length; i++) {
      for (let j = 0; j < regions.length; j++) {
        const raw = Math.abs(Math.sin((i + 1) * (j + 2) * 0.73)) * 8 + 0.5;
        const val = +raw.toFixed(2);
        total += val;
        cells.push({ sector: sectors[i], region: regions[j], allocationPct: val });
      }
    }
    // normalize to 100%
    cells.forEach(c => { c.allocationPct = +((c.allocationPct / total) * 100).toFixed(2); });

    // per-sector totals
    const sectorTotals = sectors.map(s => ({
      sector: s,
      totalPct: +cells.filter(c => c.sector === s).reduce((a, c) => a + c.allocationPct, 0).toFixed(2),
    }));
    const regionTotals = regions.map(r => ({
      region: r,
      totalPct: +cells.filter(c => c.region === r).reduce((a, c) => a + c.allocationPct, 0).toFixed(2),
    }));

    res.json({ sectors, regions, cells, sectorTotals, regionTotals });
  } catch (e) {
    res.status(500).json({ error: e.message || 'failed to build sector allocation' });
  }
});

// ---------- NON-VIZ #1: Investment statement PDF ----------
// Produces a minimal valid PDF inline (no external deps).
router.get('/statement-pdf', (req, res) => {
  try {
    const acct = (req.query.account || 'MV-000123').toString();
    const period = (req.query.period || '2026-Q1').toString();
    const lines = [
      'Multiverse Investment Platform',
      'Account Statement',
      `Account: ${acct}`,
      `Period: ${period}`,
      `Generated: ${new Date().toISOString()}`,
      '',
      'Holdings:',
      '  AAPL  120 sh   $24,500.00',
      '  MSFT   80 sh   $33,120.00',
      '  GOOGL  45 sh   $ 8,640.00',
      '  VTI   200 sh   $52,800.00',
      '  Cash             $ 9,840.00',
      '',
      'Portfolio value:  $128,900.00',
      'YTD return:       +8.42%',
      'Benchmark YTD:    +5.15%',
      '',
      'Disclosures: For informational purposes only. Not investment advice.',
    ];

    // Build a single-page PDF (Helvetica) with the lines as a text block.
    const escape = (s) => s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    let textOps = 'BT\n/F1 12 Tf\n14 TL\n72 760 Td\n';
    for (const line of lines) {
      textOps += `(${escape(line)}) Tj T*\n`;
    }
    textOps += 'ET';
    const stream = textOps;

    const objects = [];
    objects.push('<< /Type /Catalog /Pages 2 0 R >>');
    objects.push('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    objects.push('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>');
    objects.push(`<< /Length ${Buffer.byteLength(stream, 'binary')} >>\nstream\n${stream}\nendstream`);
    objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');

    let pdf = '%PDF-1.4\n';
    const offsets = [];
    for (let i = 0; i < objects.length; i++) {
      offsets.push(Buffer.byteLength(pdf, 'binary'));
      pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
    }
    const xrefStart = Buffer.byteLength(pdf, 'binary');
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (const off of offsets) {
      pdf += `${off.toString().padStart(10, '0')} 00000 n \n`;
    }
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

    const buf = Buffer.from(pdf, 'binary');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="statement-${acct}-${period}.pdf"`);
    res.setHeader('Content-Length', buf.length.toString());
    res.status(200).end(buf);
  } catch (e) {
    res.status(500).json({ error: e.message || 'failed to generate PDF' });
  }
});

// ---------- NON-VIZ #2: Investment rules editor (CRUD) ----------
router.get('/rules', (req, res) => {
  res.json({ rules: Array.from(investmentRules.values()).sort((a, b) => a.id - b.id) });
});

router.post('/rules', (req, res) => {
  try {
    const { name, metric, operator = '<=', threshold, action = 'flag', enabled = true, notes = '' } = req.body || {};
    if (!name || !metric || threshold === undefined || threshold === null) {
      return res.status(400).json({ error: 'name, metric, threshold required' });
    }
    const id = _ruleSeq++;
    const rule = {
      id,
      name: String(name),
      metric: String(metric),
      operator: String(operator),
      threshold: Number(threshold),
      action: String(action),
      enabled: !!enabled,
      notes: String(notes),
      createdAt: new Date().toISOString(),
    };
    investmentRules.set(id, rule);
    res.status(201).json(rule);
  } catch (e) {
    res.status(500).json({ error: e.message || 'failed to create rule' });
  }
});

router.put('/rules/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    const existing = investmentRules.get(id);
    if (!existing) return res.status(404).json({ error: 'rule not found' });
    const updated = { ...existing, ...req.body, id, updatedAt: new Date().toISOString() };
    if (req.body && req.body.threshold !== undefined) updated.threshold = Number(req.body.threshold);
    investmentRules.set(id, updated);
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message || 'failed to update rule' });
  }
});

router.delete('/rules/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!investmentRules.has(id)) return res.status(404).json({ error: 'rule not found' });
  investmentRules.delete(id);
  res.json({ ok: true, id });
});

module.exports = router;
