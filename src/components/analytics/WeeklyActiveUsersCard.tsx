// src/components/analytics/WeeklyActiveUsersCard.tsx
import React, { useMemo } from "react";
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

const WeeklyActiveUsersCard: React.FC<Props> = ({ range }) => {
  const { data, subtitle, value, change } = React.useMemo(() => {
    const weeks = (() => {
      switch (range) {
        case "last_7_days":
          return 4;
        case "last_30_days":
          return 4;
        case "this_month":
          return 4;
        case "this_quarter":
          return 12;
        case "custom":
        default:
          return 4;
      }
    })();

    const labels: string[] = [];
    for (let i = weeks - 1; i >= 0; i--) {
      labels.push(`W-${i + 1}`);
    }

    const generated: Point[] = labels.map((lbl, idx) => ({
      label: lbl,
      value: Math.round(7000 + Math.cos(idx / Math.max(2, weeks / 4)) * 800 + Math.random() * 500),
    }));

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
    <SectionCard title="Weekly Active Users (WAU)" subtitle={`vs. ${subtitle}`}>
      <div className="mb-3 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</span>
        <span className={`text-xs ${change >= 0 ? "text-emerald-600" : "text-rose-500"}`}>{change >= 0 ? `+${change}%` : `${change}%`}</span>
      </div>
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: -20, right: 5, top: 5 }}>
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
              cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
                fontSize: 12,
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

export default WeeklyActiveUsersCard;
