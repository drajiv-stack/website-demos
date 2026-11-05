'use client';

import React, { useState } from 'react';
import { useLab } from '@/context/LabContext';
import { FpsMeter } from './FpsMeter';

export function LabHud() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    showMarkers,
    setShowMarkers,
    enableLenis,
    setEnableLenis,
    simulateReducedMotion,
    setSimulateReducedMotion,
    globalBreakIt,
    setGlobalBreakIt,
    pageScrollPercent,
    activeSectionId,
    activeSectionProgress,
  } = useLab();

  return (
    <aside
      aria-label="Scroll Lab Telemetry HUD"
      className="fixed bottom-4 right-4 z-50 font-mono text-xs text-[#F5EDE0] transition-all"
    >
      <div className="rounded-sm border border-[#332E29] bg-[#161412]/95 p-3.5 shadow-2xl backdrop-blur-md">
        {/* Top Telemetry Bar */}
        <div className="flex items-center justify-between gap-4 border-b border-[#332E29] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#D9911A] animate-pulse" />
            <span className="font-bold tracking-wider text-[#D9911A]">[LAB HUD]</span>
          </div>

          <div className="flex items-center gap-3">
            <FpsMeter />
            <span className="text-[#8C827A]">|</span>
            <span className="text-[#C9BFB5]">{pageScrollPercent}%</span>
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="ml-1 text-[11px] text-[#8C827A] hover:text-[#F5EDE0]"
              aria-label={collapsed ? 'Expand HUD' : 'Collapse HUD'}
            >
              {collapsed ? '▲' : '▼'}
            </button>
          </div>
        </div>

        {/* Expanded Controls & Telemetry */}
        {!collapsed && (
          <div className="mt-3 space-y-3">
            {/* Active Section Telemetry */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#A39990] border-b border-[#332E29]/80 pb-2.5">
              <div>SECTION: <strong className="text-[#F5EDE0] uppercase">{activeSectionId}</strong></div>
              <div>PROGRESS: <strong className="text-[#D9911A]">{(activeSectionProgress * 100).toFixed(0)}%</strong></div>
              <div>ENGINE: <strong className="text-[#F5EDE0]">GSAP / CSS</strong></div>
              <div>MOTION: <strong className={simulateReducedMotion ? 'text-[#D9911A]' : 'text-emerald-400'}>{simulateReducedMotion ? 'REDUCED' : 'STANDARD'}</strong></div>
            </div>

            {/* Diagnostic Toggles */}
            <div className="space-y-1.5 pt-1 text-[11px]">
              {/* Toggle 1: Global Break It */}
              <label className="flex cursor-pointer items-center justify-between gap-3 text-red-300 hover:text-red-200">
                <span className="font-bold">[BREAK IT] GLOBAL</span>
                <input
                  type="checkbox"
                  checked={globalBreakIt}
                  onChange={(e) => setGlobalBreakIt(e.target.checked)}
                  className="h-4 w-4 accent-red-600 cursor-pointer focus-visible:ring-2 focus-visible:ring-red-500"
                />
              </label>

              {/* Toggle 2: ScrollTrigger Markers */}
              <label className="flex cursor-pointer items-center justify-between gap-3 text-[#C9BFB5] hover:text-[#F5EDE0]">
                <span>ScrollTrigger Markers</span>
                <input
                  type="checkbox"
                  checked={showMarkers}
                  onChange={(e) => setShowMarkers(e.target.checked)}
                  className="h-4 w-4 accent-[#D9911A] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D9911A]"
                />
              </label>

              {/* Toggle 3: Lenis Smooth Scroll */}
              <label className="flex cursor-pointer items-center justify-between gap-3 text-[#C9BFB5] hover:text-[#F5EDE0]">
                <span>Smooth Scroll (Lenis)</span>
                <input
                  type="checkbox"
                  checked={enableLenis}
                  onChange={(e) => setEnableLenis(e.target.checked)}
                  className="h-4 w-4 accent-[#D9911A] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D9911A]"
                />
              </label>

              {/* Toggle 4: Simulate Reduced Motion */}
              <label className="flex cursor-pointer items-center justify-between gap-3 text-[#C9BFB5] hover:text-[#F5EDE0]">
                <span>Simulate Reduced Motion</span>
                <input
                  type="checkbox"
                  checked={simulateReducedMotion}
                  onChange={(e) => setSimulateReducedMotion(e.target.checked)}
                  className="h-4 w-4 accent-[#D9911A] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D9911A]"
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
