import { test } from 'node:test';
import assert from 'node:assert/strict';

import { startOfTodayIso, startOfWeekIso } from './dates.ts';

// 2026-10-25 is a Sunday. Use fixed instants expressed in IST to keep the
// assertions independent of the machine's local timezone.
test('startOfTodayIso returns midnight IST', () => {
  // 2026-10-25 14:00 IST = 08:30 UTC
  const now = new Date('2026-10-25T08:30:00.000Z');
  // 2026-10-25 00:00 IST = 2026-10-24 18:30 UTC
  assert.equal(startOfTodayIso(now), '2026-10-24T18:30:00.000Z');
});

test('startOfWeekIso returns Monday midnight IST', () => {
  // Sunday 2026-10-25 14:00 IST -> Monday 2026-10-19 00:00 IST = 2026-10-18 18:30 UTC
  const now = new Date('2026-10-25T08:30:00.000Z');
  assert.equal(startOfWeekIso(now), '2026-10-18T18:30:00.000Z');
});

test('startOfWeekIso stays within the same week on Monday', () => {
  // Monday 2026-10-19 09:00 IST = 03:30 UTC
  const now = new Date('2026-10-19T03:30:00.000Z');
  assert.equal(startOfWeekIso(now), '2026-10-18T18:30:00.000Z');
});
