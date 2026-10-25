// Day/week boundaries in IST (UTC+05:30, no daylight saving). Used by the
// admin dashboard for "today" and "this week" enquiry counts.

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

function shiftToIst(date: Date): Date {
  return new Date(date.getTime() + IST_OFFSET_MS);
}

/** Start of today in IST, as an ISO string. */
export function startOfTodayIso(now: Date = new Date()): string {
  const ist = shiftToIst(now);
  return new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate()) - IST_OFFSET_MS).toISOString();
}

/** Start of the current week (Monday) in IST, as an ISO string. */
export function startOfWeekIso(now: Date = new Date()): string {
  const ist = shiftToIst(now);
  const daysSinceMonday = (ist.getUTCDay() + 6) % 7;
  return new Date(
    Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate() - daysSinceMonday) - IST_OFFSET_MS,
  ).toISOString();
}
