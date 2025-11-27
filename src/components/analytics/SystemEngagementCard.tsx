// src/components/analytics/SystemEngagementCard.tsx
import React from "react";
import SectionCard from "../shared/layout/SectionCard";

const SystemEngagementCard: React.FC = () => {
  const bars = [
    { label: "Imports", value: 2600 },
    { label: "Letters", value: 7200 },
    { label: "Disputes", value: 2800 },
  ];
  const max = Math.max(...bars.map((b) => b.value));

  return (
    <SectionCard
      title="System Engagement"
      subtitle="Usage in the last 7 days"
    >
      <div className="mb-3 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-gray-900">
          12,450 Actions
        </span>
        <span className="text-xs text-emerald-600">
          +12.8%
        </span>
      </div>

      <div className="mt-2 space-y-3">
        {bars.map((bar) => {
          const percent = (bar.value / max) * 100;
          return (
            <div key={bar.label}>
              <div className="mb-1 flex items-center justify-between text-xs text-gray-600">
                <span>{bar.label}</span>
                <span>{bar.value.toLocaleString()}</span>
              </div>
              <div className="h-3 rounded-full bg-gray-100">
                <div
                  className="h-3 rounded-full bg-[#D4A317]"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
};

export default SystemEngagementCard;
