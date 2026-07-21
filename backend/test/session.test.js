const test = require('node:test');
const assert = require('node:assert/strict');

process.env.SESSION_SECRET = 'test-session-secret-with-at-least-32-bytes';
const {
  authenticateCredentials,
  createSessionToken,
  hashPassword,
  verifySessionToken,
} = require('../lib/session');

test('credentials verify the persisted scrypt password hash', async () => {
  const passwordHash = await hashPassword('local-test-password');
  const database = {
    query: async (_sql, values) => ({
      rows: values[0] === 'operator@example.test' ? [{
        id: 7,
        email: 'operator@example.test',
        password_hash: passwordHash,
        name: 'Operator',
        role: 'admin',
        active: true,
      }] : [],
    }),
  };
  assert.equal((await authenticateCredentials('operator@example.test', 'local-test-password', database)).email, 'operator@example.test');
  assert.equal(await authenticateCredentials('operator@example.test', 'wrong-password', database), null);
});

test('signed sessions verify and reject tampering', () => {
  const token = createSessionToken({ id: '7', email: 'operator@example.test', role: 'admin' });
  assert.equal(verifySessionToken(token).email, 'operator@example.test');
  assert.throws(() => verifySessionToken(`${token.slice(0, -1)}x`), /signature|session token/);
});
