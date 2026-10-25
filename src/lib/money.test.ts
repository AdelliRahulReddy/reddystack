import { test } from 'node:test';
import assert from 'node:assert/strict';

import { formatInr } from './money.ts';

test('formats whole INR with Indian grouping', () => {
  assert.equal(formatInr(14999), '₹14,999');
  assert.equal(formatInr(4999), '₹4,999');
  assert.equal(formatInr(24999), '₹24,999');
});

test('formats zero and large values without decimals', () => {
  assert.equal(formatInr(0), '₹0');
  assert.equal(formatInr(100000), '₹1,00,000');
});
