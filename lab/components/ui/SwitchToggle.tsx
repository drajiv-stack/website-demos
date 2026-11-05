'use client';

import React from 'react';

interface SwitchToggleProps {
  isBroken: boolean;
  onToggle: (broken: boolean) => void;
  correctLabel?: string;
  brokenLabel?: string;
  disabled?: boolean;
}

export function SwitchToggle({
  isBroken,
  onToggle,
  correctLabel = 'Correct Mode',
  brokenLabel = 'Broken Mode',
  disabled = false,
}: SwitchToggleProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-[#332E29] bg-[#161412] p-1 text-xs font-semibold shadow-inner">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onToggle(false)}
        className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-all ${
          !isBroken
            ? 'bg-[#D9911A] text-[#1A1714] font-bold shadow-sm'
            : 'text-[#8C827A] hover:text-[#F5EDE0]'
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        <span>{correctLabel}</span>
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onToggle(true)}
        className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-all ${
          isBroken
            ? 'bg-red-600 text-white font-bold shadow-sm'
            : 'text-[#8C827A] hover:text-[#F5EDE0]'
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        <span>{brokenLabel}</span>
      </button>
    </div>
  );
}
