// src/components/analytics/DailyActiveUsersCard.tsx
import React, { useState, useEffect } from "react";
import SectionCard from "../shared/layout/SectionCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { AnalyticsRange } from "../../pages/analytics/AnalyticsPage";

type Props = {
  range: AnalyticsRange;
};

type Point = { label: string; value: number };

const DailyActiveUsersCard: React.FC<Props> = ({ range }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    if (typeof document === "undefined" || typeof MutationObserver === "undefined") return;
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const { data, subtitle, value, change } = React.useMemo(() => {
    // Determine number of points for the selected range
    const points = (() => {
      switch (range) {
        case "last_7_days":
          return 7;
        case "last_30_days":
          return 30;
        case "this_month": {
          const now = new Date();
          return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        }
        case "this_quarter":
          return 90;
        case "custom":
        default:
          return 7;
      }
    })();

    // generate labels (recent -> older)
    const labels: string[] = [];
    for (let i = points - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      // short label for readability
      labels.push(`${d.getMonth() + 1}/${d.getDate()}`);
    }

    // synthetic values (simple sine-ish + deterministic noise) for demo
    const deterministicNoise = (seed: number) => {
      // pure deterministic pseudo-random based on Math.sin
      const r = Math.sin(seed * 12.9898) * 43758.5453;
      return r - Math.floor(r);
    };

    const generated: Point[] = labels.map((lbl, idx) => ({
      label: lbl,
      value: Math.round(
        900 +
          Math.sin(idx / Math.max(3, points / 7)) * 400 +
          deterministicNoise(idx + points) * 200
      ),
    }));

    // show current value as last point and change vs previous
    const last = generated[generated.length - 1];
    const prev = generated[generated.length - 2] || last;
    const pct = prev.value ? Math.round(((last.value - prev.value) / prev.value) * 1000) / 10 : 0;

    const subtitleLabel =
      range === "last_7_days"
        ? "Last 7 days"
        : range === "last_30_days"
        ? "Last 30 days"
        : range === "this_month"
        ? "This month"
        : range === "this_quarter"
        ? "This quarter"
        : "Custom range";

    return { data: generated, subtitle: subtitleLabel, value: last.value.toLocaleString(), change: pct };
  }, [range]);

  return (
    <SectionCard title="Daily Active Users (DAU)" subtitle={`vs. ${subtitle}`}>
      <div className="mb-3 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</span>
        <span className={`text-xs ${change >= 0 ? "text-emerald-600" : "text-rose-500"}`}>{change >= 0 ? `+${change}%` : `${change}%`}</span>
      </div>
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: -20, right: 5, top: 5 }}>
            <defs>
              <linearGradient id="analyticsLine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4A317" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#FDE7A7" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="#f3f4f6"
              vertical={false}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
            />
            <Tooltip
              cursor={{ stroke: isDark ? "#374151" : "#e5e7eb", strokeWidth: 1 }}
              contentStyle={{
                borderRadius: 12,
                border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
                boxShadow: isDark
                  ? "0 10px 25px rgba(2,6,23,0.6)"
                  : "0 10px 25px rgba(15,23,42,0.08)",
                fontSize: 12,
                background: isDark ? "#0f1724" : undefined,
                color: isDark ? "#e6eef8" : undefined,
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#D4A317"
              strokeWidth={2.4}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
};

export default DailyActiveUsersCard;
