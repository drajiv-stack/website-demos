import { COMPANY } from '@/lib/products';

interface WhatsAppButtonProps {
  label?: string;
  productName?: string;
  className?: string;
}

export function WhatsAppButton({
  label = 'Chat on WhatsApp',
  productName,
  className = '',
}: WhatsAppButtonProps) {
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') ?? '';
  if (!rawNumber) {
    return null;
  }

  const text = productName
    ? `Hello ${COMPANY.name}, I would like export pricing, MOQ and lead time for ${productName}.`
    : `Hello ${COMPANY.name}, I would like to request an export spice quote.`;

  const href = `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`${label} (opens WhatsApp in a new tab)`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
      </svg>
      <span>{label}</span>
    </a>
  );
}
