const test = require('node:test');
const assert = require('node:assert/strict');
const fp = require('../lib/feature-pack');

test('export preserves false, 0 and empty values', () => {
  const rows = [{ name: 'A', count: 0, active: false, note: '' }];
  assert.match(fp.recordsToCsv(rows, ['name', 'count', 'active', 'note']), /A,0,false,/);
  const parsed = JSON.parse(fp.recordsToJson(rows));
  assert.equal(parsed.records[0].count, 0); assert.equal(parsed.records[0].active, false); assert.equal(parsed.records[0].note, '');
});
test('client filter builds search and status clauses', () => {
  const { where, params } = fp.buildClientFilter({ q: 'acme', status: 'active' });
  assert.match(where, /ILIKE/); assert.match(where, /status =/); assert.deepEqual(params, ['%acme%', 'active']);
  assert.equal(fp.buildClientFilter({}).where, '');
});
test('deterministic AI fallback is labelled and grounded', () => {
  const out = fp.fallbackClientHealth([{ name: 'A', status: 'active', industry: 'Tech' }, { name: 'B', status: 'active', industry: '' }]);
  assert.equal(out.aiGenerated, false); assert.equal(out.sections.totalClients, 2); assert.equal(out.sections.activeClients, 2); assert.equal(out.sections.emptyIndustryCount, 1);
  assert.equal(fp.fallbackTaskFocus([{ status: 'pending', priority: 'high', assigned_to: '' }]).aiGenerated, false);
  assert.equal(fp.hasProvider({}), false);
});
test('readable sections preserve false, 0 and empty', () => {
  const text = fp.readableSections({ count: 0, active: false, note: '' });
  assert.match(text, /Count: 0/); assert.match(text, /Active: false/); assert.match(text, /Note: \(empty\)/);
});
test('feature routes and export are mounted behind session auth', () => {
  const fs = require('node:fs');
  assert.match(fs.readFileSync(__dirname + '/../server.js', 'utf8'), /\/api\/feature/);
  assert.match(fs.readFileSync(__dirname + '/../routes/clients.js', 'utf8'), /\/export/);
});
