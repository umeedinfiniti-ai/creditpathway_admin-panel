import React from "react";
import StatCard from "../shared/data-display/StatCard";
import type { DateRange } from "../../pages/dashboard/DashboardPage";

type Props = {
  dateRange: DateRange;
};

const StatsOverview: React.FC<Props> = () => {
  // Static demo data – you can swap with real API later
  const stats = [
    {
      id: "total_users",
      label: "Total Users",
      value: "1,420",
      delta: 2.5,
    },
    {
      id: "active_users",
      label: "Active Users",
      value: "893",
      delta: -1.2,
    },
    {
      id: "members_by_tier",
      label: "Members by Tier",
      value: "65",
      suffix: "%",
      delta: 5.0,
    },
    {
      id: "open_disputes",
      label: "Open Disputes",
      value: "12",
      delta: 8.0,
    },
    {
      id: "letters_generated",
      label: "Letters Generated",
      value: "47",
      delta: 15.3,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          label={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          delta={stat.delta}
          deltaLabel="+ vs. last period"
        />
      ))}
    </div>
  );
};

export default StatsOverview;
