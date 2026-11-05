'use client';

import React, { useState } from 'react';

interface CollapsibleProps {
  title: string;
  badge?: string;
  badgeVariant?: 'turmeric' | 'red' | 'stone';
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function Collapsible({
  title,
  badge,
  badgeVariant = 'turmeric',
  children,
  defaultOpen = false,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const badgeStyles = {
    turmeric: 'bg-[#D9911A]/20 text-[#D9911A] border-[#D9911A]/40',
    red: 'bg-red-950/40 text-red-400 border-red-800/50',
    stone: 'bg-[#332E29] text-[#8C827A] border-[#443E38]',
  }[badgeVariant];

  return (
    <div className="rounded-sm border border-[#332E29] bg-[#221F1B]/70 overflow-hidden text-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-[#2B2722]"
      >
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs text-[#8C827A]">{isOpen ? '▼' : '►'}</span>
          <span className="font-semibold text-[#F5EDE0]">{title}</span>
          {badge && (
            <span className={`rounded-xs border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${badgeStyles}`}>
              {badge}
            </span>
          )}
        </div>
        <span className="font-mono text-xs text-[#8C827A]">{isOpen ? 'Hide' : 'Expand'}</span>
      </button>

      {isOpen && (
        <div className="border-t border-[#332E29] px-4 py-3.5 text-[#C9BFB5] leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}
