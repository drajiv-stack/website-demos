import { ImageResponse } from 'next/og';
import { COMPANY } from '@/lib/products';

export const dynamic = 'force-static';
export const alt = `${COMPANY.name} — Investment Castings & 5-Axis CNC Components`;
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
          backgroundColor: '#14171A',
          color: '#ECEEF0',
          padding: '64px',
          border: '2px solid #FF5A1F',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontSize: 22,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#FF5A1F',
              fontWeight: 700,
            }}
          >
            RAJKOT · INDIA // FOB MUNDRA · CIF HAMBURG
          </span>
          <span
            style={{
              fontSize: 18,
              color: '#8A949C',
            }}
          >
            DWG // KCM-REV-2026
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              textTransform: 'uppercase',
              color: '#ECEEF0',
            }}
          >
            {COMPANY.name}
          </div>
          <div
            style={{
              fontSize: 30,
              color: '#8A949C',
              maxWidth: '900px',
            }}
          >
            Investment castings and five-axis CNC components built for German and North American OEM lines.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid #8A949C',
            paddingTop: '24px',
            fontSize: 18,
            color: '#8A949C',
          }}
        >
          <span>316 Stainless · Carbon Steel · Ductile Iron · Aluminium</span>
          <span style={{ color: '#FF5A1F' }}>
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
