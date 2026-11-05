'use client';

import React from 'react';
import { type PatternConfig } from '@/lib/lab-data';
import { useLab } from '@/context/LabContext';
import { SwitchToggle } from '@/components/ui/SwitchToggle';
import { Collapsible } from '@/components/ui/Collapsible';

interface PatternWrapperProps {
  config: PatternConfig;
  readouts: React.ReactNode;
  children: React.ReactNode;
}

export function PatternWrapper({
  config,
  readouts,
  children,
}: PatternWrapperProps) {
  const { isPatternBroken, setPatternOverride } = useLab();
  const isBroken = isPatternBroken(config.id);

  return (
    <section
      id={config.id}
      aria-labelledby={`${config.id}-heading`}
      className="relative border-b border-[#332E29] bg-[#1A1714] text-[#F5EDE0] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Grid: Title, Headline, 25-Word Copy, and Switch Toggle */}
        <div className="mb-10 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#D9911A]">
                PATTERN 0{config.number}
              </span>
              <span className="text-xs text-[#8C827A]">/</span>
              <span className="text-xs font-medium text-[#C9BFB5]">{config.title}</span>
            </div>

            <h2
              id={`${config.id}-heading`}
              className="mt-2 font-display text-3xl font-normal leading-tight text-[#F5EDE0] sm:text-4xl"
            >
              {config.headline}
            </h2>

            {/* Strict brief constraint: max 25 words copy */}
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#C9BFB5] sm:text-base">
              {config.copy}
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 lg:col-span-5 lg:items-end">
            <SwitchToggle
              isBroken={isBroken}
              onToggle={(broken) => setPatternOverride(config.id, broken)}
              correctLabel="Correct"
              brokenLabel="Broken"
            />

            {/* Readout Metrics */}
            <div className="flex flex-wrap items-center gap-2">
              {readouts}
            </div>
          </div>
        </div>

        {/* Live Pattern Stage */}
        <div className="relative mb-8">
          {children}
        </div>

        {/* Diagnostic Collapsibles */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Collapsible
            title="How it works (Correct)"
            badge="Engineering Spec"
            badgeVariant="turmeric"
          >
            <ul className="space-y-2 list-disc pl-4 text-xs">
              {config.howItWorks.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </Collapsible>

          <Collapsible
            title="Why the broken one fails"
            badge="Anti-Pattern"
            badgeVariant="red"
          >
            <ul className="space-y-2 list-disc pl-4 text-xs">
              {config.whyBrokenFails.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </Collapsible>
        </div>
      </div>
    </section>
  );
}
