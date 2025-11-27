/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useEffect, useState, useRef, useLayoutEffect } from "react";
import SectionCard from "../shared/layout/SectionCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { DateRange } from "../../pages/dashboard/DashboardPage";

type Props = {
  dateRange: DateRange;
};

type UsagePoint = {
  label: string;
  value: number;
};

const UsageEngagementCard: React.FC<Props> = ({ dateRange }) => {
  const rangeLabel = useMemo(() => {
    switch (dateRange) {
      case "last_7_days":
        return "Last 7 Days";
      case "this_month":
        return "This Month";
      case "this_quarter":
        return "This Quarter";
      case "last_30_days":
      default:
        return "Last 30 Days";
    }
  }, [dateRange]);
  // Demo data – you can branch on dateRange later if you want
  const data: UsagePoint[] = useMemo(
    () => [
      { label: "Day 1", value: 620 },
      { label: "Day 2", value: 580 },
      { label: "Day 3", value: 610 },
      { label: "Day 4", value: 540 },
      { label: "Day 5", value: 670 },
      { label: "Day 6", value: 430 },
      { label: "Day 7", value: 890 },
    ],
    []
  );

  const [isDark, setIsDark] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return undefined;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setContainerSize({ width: Math.max(0, Math.floor(rect.width)), height: Math.max(0, Math.floor(rect.height)) });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    try {
      setIsDark(document.documentElement.classList.contains("dark"));
      const obs = new MutationObserver(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
      });
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      return () => obs.disconnect();
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <SectionCard title="Usage & Engagement">
      <div className="mb-3 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-gray-900">
          893
        </span>
        <span className="text-xs text-gray-500">
          {rangeLabel}{" "}
          <span className="font-medium text-emerald-600">
            +2.5%
          </span>
        </span>
      </div>

      <div
        className="h-56 w-full"
        ref={containerRef}
        style={{ minWidth: 0, minHeight: 220 }}
      >
        {containerSize.width > 0 && containerSize.height > 0 ? (
          <ResponsiveContainer width="100%" height={Math.max(200, containerSize.height)}>
            <AreaChart data={data} margin={{ left: -20, right: 0, top: 10 }}>
            <defs>
              <linearGradient id="usageFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4A317" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#FDF5DF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke={isDark ? "#1f2937" : "#f3f4f6"}
              vertical={false}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: isDark ? "#94a3b8" : "#9ca3af" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: isDark ? "#94a3b8" : "#9ca3af" }}
            />
            <Tooltip
              cursor={{ stroke: isDark ? "#374151" : "#e5e7eb", strokeWidth: 1 }}
              contentStyle={{
                borderRadius: 12,
                border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
                boxShadow: isDark ? "0 10px 25px rgba(2,6,23,0.6)" : "0 10px 25px rgba(15,23,42,0.08)",
                fontSize: 12,
                background: isDark ? "#0f1724" : undefined,
                color: isDark ? "#e6eef8" : undefined,
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#D4A317"
              strokeWidth={2.4}
              fill="url(#usageFill)"
            />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-sm text-gray-400">
            Chart loading...
          </div>
        )}
      </div>
    </SectionCard>
  );
};

export default UsageEngagementCard;
