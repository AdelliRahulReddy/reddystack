/** Personal/demo work must always say so. */
export const projectBadge = (p: { client: string; year: number }) =>
  `${p.client.toLowerCase().includes('personal') ? 'Personal / demo' : 'Build'} · ${p.year}`;
