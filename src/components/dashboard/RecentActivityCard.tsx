import React from "react";
import SectionCard from "../shared/layout/SectionCard";
import ActivityItem from "../shared/data-display/ActivityItem";

const RecentActivityCard: React.FC = () => {
  const items = [
    {
      id: 1,
      title: "New user 'john.doe' signed up.",
      timeAgo: "5m ago",
      colorClass: "bg-blue-500",
    },
    {
      id: 2,
      title: "Dispute #123 was opened.",
      timeAgo: "12m ago",
      colorClass: "bg-red-500",
    },
    {
      id: 3,
      title: "VIP membership activated for 'jane.smith'.",
      timeAgo: "28m ago",
      colorClass: "bg-amber-400",
    },
    {
      id: 4,
      title: "Dispute #121 was resolved.",
      timeAgo: "45m ago",
      colorClass: "bg-emerald-500",
    },
    {
      id: 5,
      title: "3 new letters generated automatically.",
      timeAgo: "1h ago",
      colorClass: "bg-purple-500",
    },
  ];

  return (
    <SectionCard title="Recent Activity" className="h-full">
      <div className="space-y-4">
        {items.map((item) => (
          <ActivityItem
            key={item.id}
            title={item.title}
            timeAgo={item.timeAgo}
            colorClass={item.colorClass}
          />
        ))}
      </div>
    </SectionCard>
  );
};

export default RecentActivityCard;
