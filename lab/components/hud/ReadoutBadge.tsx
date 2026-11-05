import React from 'react';

interface ReadoutBadgeProps {
  label: string;
  value: string | number;
  unit?: string;
  variant?: 'turmeric' | 'red' | 'stone' | 'green';
}

export function ReadoutBadge({
  label,
  value,
  unit,
  variant = 'turmeric',
}: ReadoutBadgeProps) {
  const styles = {
    turmeric: 'border-[#D9911A]/40 bg-[#D9911A]/10 text-[#D9911A]',
    red: 'border-red-600/40 bg-red-950/30 text-red-400',
    stone: 'border-[#443E38] bg-[#221F1B] text-[#C9BFB5]',
    green: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-400',
  }[variant];

  return (
    <div className={`inline-flex items-center gap-2 rounded-xs border px-3 py-1 font-mono text-xs ${styles}`}>
      <span className="text-[11px] uppercase tracking-wider text-[#8C827A]">{label}:</span>
      <span className="font-bold text-[#F5EDE0]">
        {value}
        {unit && <span className="ml-1 text-[10px] text-[#8C827A] font-normal">{unit}</span>}
      </span>
    </div>
  );
}
