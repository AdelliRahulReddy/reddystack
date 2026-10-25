import { test } from 'node:test';
import assert from 'node:assert/strict';

import { buildWhatsAppLink } from './whatsapp.ts';

test('builds a wa.me link with an encoded message', () => {
  const link = buildWhatsAppLink('917207022577', 'Hello world');
  assert.equal(link, 'https://wa.me/917207022577?text=Hello%20world');
});

test('strips formatting characters from the number', () => {
  assert.equal(buildWhatsAppLink('+91 72070 22577', ''), 'https://wa.me/917207022577');
});

test('omits the query when the message is empty', () => {
  assert.equal(buildWhatsAppLink('917207022577', ''), 'https://wa.me/917207022577');
});
