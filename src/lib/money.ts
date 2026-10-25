// Whole-INR amounts are stored as integers. Format them for the Indian
// visitor without decimals: 14999 -> "₹14,999".

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

export function formatInr(amountInWholeRupees: number): string {
  return inrFormatter.format(amountInWholeRupees);
}
