// Builds wa.me deep links. The number is the owner's digits only (country code
// first, no "+"), e.g. "917207022577".

export function buildWhatsAppLink(whatsappNumber: string, message: string): string {
  const digits = whatsappNumber.replace(/\D/g, '');
  const query = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${digits}${query}`;
}
