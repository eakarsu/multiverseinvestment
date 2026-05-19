const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const SYSTEM_PROMPTS = {
  'strategy-advisor': 'You are an elite strategy consultant at Multiverse Consulting. Provide detailed, actionable strategy advice with clear frameworks, implementation steps, and expected outcomes. Format your response with clear sections.',
  'market-analysis': 'You are a senior market analyst at Multiverse Consulting. Provide comprehensive market analysis with data-driven insights, competitive landscape, trends, and strategic recommendations. Format your response with clear sections.',
  'talent-matcher': 'You are a talent acquisition specialist at Multiverse Consulting. Analyze requirements and suggest ideal candidate profiles, skill assessments, and hiring strategies. Format your response with clear sections.',
  'report-generator': 'You are a professional report writer at Multiverse Consulting. Generate detailed, well-structured business reports with executive summaries, key findings, and recommendations. Format your response with clear sections.',
  'proposal-assistant': 'You are a senior proposal writer at Multiverse Consulting. Draft persuasive client proposals with executive summary, scope, deliverables, timeline, pricing rationale, and risk mitigation. Format your response with clear sections.',
  'investment-thesis-analyzer': 'You are a senior investment analyst at Multiverse Consulting. Analyze the investment thesis provided. Evaluate market opportunity, competitive moat, financial projections, key risks, and produce a clear bull/bear case with a recommended action. Format your response with clear sections.',
  'talent-brief-generator': 'You are a senior recruiter at Multiverse Consulting. From the role context provided, generate a structured talent brief covering role summary, must-have skills, nice-to-have skills, experience profile, target companies, and outreach messaging. Format your response with clear sections.',
};

async function callOpenRouter(systemPrompt, userQuery) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL;

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not configured');
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000',
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userQuery },
      ],
    }),
  });

  const responseText = await response.text();

  let data;
  try {
    data = JSON.parse(responseText);
  } catch (e) {
    throw new Error(`OpenRouter returned non-JSON response (HTTP ${response.status}): ${responseText.substring(0, 200)}`);
  }

  if (data.error) {
    throw new Error(data.error.message || 'OpenRouter API error');
  }

  return {
    result: data.choices[0].message.content,
    model: data.model,
    usage: data.usage,
  };
}

// POST /api/ai/strategy-advisor
router.post('/strategy-advisor', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    const response = await callOpenRouter(SYSTEM_PROMPTS['strategy-advisor'], query);
    res.json(response);
  } catch (err) {
    console.error('Strategy advisor error:', err);
    res.status(500).json({ error: 'Failed to get strategy advice', message: err.message });
  }
});

// POST /api/ai/market-analysis
router.post('/market-analysis', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    const response = await callOpenRouter(SYSTEM_PROMPTS['market-analysis'], query);
    res.json(response);
  } catch (err) {
    console.error('Market analysis error:', err);
    res.status(500).json({ error: 'Failed to get market analysis', message: err.message });
  }
});

// POST /api/ai/talent-matcher
router.post('/talent-matcher', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    const response = await callOpenRouter(SYSTEM_PROMPTS['talent-matcher'], query);
    res.json(response);
  } catch (err) {
    console.error('Talent matcher error:', err);
    res.status(500).json({ error: 'Failed to match talent', message: err.message });
  }
});

// POST /api/ai/report-generator
router.post('/report-generator', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    const response = await callOpenRouter(SYSTEM_PROMPTS['report-generator'], query);
    res.json(response);
  } catch (err) {
    console.error('Report generator error:', err);
    res.status(500).json({ error: 'Failed to generate report', message: err.message });
  }
});

// POST /api/ai/proposal-assistant
router.post('/proposal-assistant', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    const response = await callOpenRouter(SYSTEM_PROMPTS['proposal-assistant'], query);
    res.json(response);
  } catch (err) {
    console.error('Proposal assistant error:', err);
    res.status(500).json({ error: 'Failed to draft proposal', message: err.message });
  }
});

// POST /api/ai/investment-thesis-analyzer
router.post('/investment-thesis-analyzer', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    const response = await callOpenRouter(SYSTEM_PROMPTS['investment-thesis-analyzer'], query);
    res.json(response);
  } catch (err) {
    console.error('Investment thesis analyzer error:', err);
    res.status(500).json({ error: 'Failed to analyze investment thesis', message: err.message });
  }
});

// POST /api/ai/talent-brief-generator
router.post('/talent-brief-generator', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    const response = await callOpenRouter(SYSTEM_PROMPTS['talent-brief-generator'], query);
    res.json(response);
  } catch (err) {
    console.error('Talent brief generator error:', err);
    res.status(500).json({ error: 'Failed to generate talent brief', message: err.message });
  }
});

module.exports = router;
