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

const WeeklyActiveUsersCard: React.FC<Props> = () => {
  const data: Point[] = useMemo(
    () => [
      { label: "Week 1", value: 8500 },
      { label: "Week 2", value: 9100 },
      { label: "Week 3", value: 8900 },
      { label: "Week 4", value: 8930 },
    ],
    []
  );

  return (
    <SectionCard
      title="Weekly Active Users (WAU)"
      subtitle="vs. last 7 days"
    >
      <div className="mb-3 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-gray-900">
          8,930
        </span>
        <span className="text-xs text-emerald-600">
          +2.1%
        </span>
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
