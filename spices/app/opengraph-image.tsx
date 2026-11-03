import { ImageResponse } from 'next/og';
import { COMPANY } from '@/lib/products';

export const alt = `${COMPANY.name} — Kerala Whole & Ground Spice Exporter (Concept Demo)`;
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
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#1E1410',
          color: '#F5EDE0',
          padding: '64px',
          border: '12px solid #D9911A',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 22,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#D9911A',
          }}
        >
          <span>KOCHI PORT (INCOK) · IDUKKI &amp; WAYANAD ORIGIN</span>
          <span>HS 0904 – 0910</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '960px' }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#F5EDE0',
            }}
          >
            {COMPANY.name}
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.35,
              color: '#D8C7AE',
            }}
          >
            Whole &amp; ground Kerala spices, steam-sterilised and lab-tested lot by lot for UAE, UK
            &amp; US buyers.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #D8C7AE',
            paddingTop: '24px',
            fontSize: 20,
            color: '#D8C7AE',
          }}
        >
          <span>FOB Kochi · CIF Jebel Ali · Felixstowe · Newark</span>
          <span>Concept design — fictional company. Website by Rajiv Dudeja.</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
