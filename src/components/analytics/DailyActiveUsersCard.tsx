// src/components/analytics/DailyActiveUsersCard.tsx
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

const DailyActiveUsersCard: React.FC<Props> = () => {
  const data: Point[] = useMemo(
    () => [
      { label: "Mon", value: 1200 },
      { label: "Tue", value: 1400 },
      { label: "Wed", value: 1350 },
      { label: "Thu", value: 1500 },
      { label: "Fri", value: 1600 },
      { label: "Sat", value: 1300 },
      { label: "Sun", value: 1482 },
    ],
    []
  );

  return (
    <SectionCard
      title="Daily Active Users (DAU)"
      subtitle="vs. last 7 days"
    >
      <div className="mb-3 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-gray-900">
          1,482
        </span>
        <span className="text-xs text-emerald-600">
          +5.4%
        </span>
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

export default DailyActiveUsersCard;
