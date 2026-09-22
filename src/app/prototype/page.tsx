import type { Metadata } from 'next';
import HomeOne from '@/components/homes/home';
import Wrapper from '@/layouts/Wrapper';

export const metadata: Metadata = {
  title: { absolute: 'ReddyStack — Brand Preview' },
  description: 'A local preview of the proposed ReddyStack brand identity.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function BrandPreview() {
  return (
    <Wrapper>
      <HomeOne />
    </Wrapper>
  );
}
