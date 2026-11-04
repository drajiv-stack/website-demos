import { ImageResponse } from 'next/og';
import { COMPANY } from '@/lib/products';

export const dynamic = 'force-static';
export const alt = `${COMPANY.name} — Private-Label Home Textiles from Karur`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#F4F1EA',
          color: '#1F2430',
          padding: '64px',
          border: '3px solid #2E3A8C',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: 20,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#2E3A8C',
              fontWeight: 700,
            }}
          >
            KARUR MILL · EST. 1998† · CIF HAMBURG &amp; ROTTERDAM
          </span>
          <span
            style={{
              fontSize: 16,
              color: '#524E46',
            }}
          >
            240 LOOMS† · AIR-JET &amp; JACQUARD
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: 66,
              fontWeight: 400,
              lineHeight: 1.05,
              color: '#1F2430',
            }}
          >
            {COMPANY.name}
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#524E46',
              maxWidth: '920px',
              fontStyle: 'italic',
            }}
          >
            Woven in Karur. Tailored for Hamburg, Rotterdam &amp; Melbourne.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid #B9B2A5',
            paddingTop: '24px',
            fontSize: 16,
            color: '#524E46',
          }}
        >
          <span>Organic Percale · European Flax · Combed Terry · Waffle Bath</span>
          <span style={{ color: '#2E3A8C', fontWeight: 600 }}>
            Concept design — fictional company. Website by Rajiv Dudeja.
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
