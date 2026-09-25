"use client";

import React from "react";
import { SectorPerformance } from "@/types/market";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface SectorHeatmapProps {
  sectors: SectorPerformance[];
}

export function SectorHeatmap({ sectors }: SectorHeatmapProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Sector Momentum & Heatmap</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time capital flow and leadership across major domestic sectors
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {sectors.map((sec) => {
          const isPositive = sec.changePercent > 0;
          const isNeutral = sec.changePercent === 0;

          return (
            <div
              key={sec.sector}
              className={`p-3.5 rounded-lg border transition-all ${
                isPositive
                  ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-800/50"
                  : isNeutral
                  ? "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
                  : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-800/50"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                  {sec.sector}
                </span>
                <span
                  className={`flex items-center gap-0.5 text-xs font-bold font-mono ${
                    isPositive
                      ? "text-emerald-700 dark:text-emerald-400"
                      : isNeutral
                      ? "text-slate-500"
                      : "text-rose-700 dark:text-rose-400"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : isNeutral ? (
                    <Minus className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {isPositive ? "+" : ""}
                  {sec.changePercent}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-2.5 w-full bg-slate-200 dark:bg-slate-700/60 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    isPositive ? "bg-emerald-500" : isNeutral ? "bg-slate-400" : "bg-rose-500"
                  }`}
                  style={{ width: `${Math.min(Math.abs(sec.changePercent) * 25, 100)}%` }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Top Mover:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300 font-mono">
                  {sec.leadingStock}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
