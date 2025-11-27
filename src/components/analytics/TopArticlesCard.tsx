// src/components/analytics/TopArticlesCard.tsx
import React from "react";
import SectionCard from "../shared/layout/SectionCard";
import ProgressBarRow from "../shared/data-display/ProgressBarRow";

const TopArticlesCard: React.FC = () => {
  const articles = [
    { title: "Intro to Credit", views: 4200 },
    { title: "Fixing Errors", views: 3800 },
    { title: "Building Score", views: 2900 },
    { title: "Debt Mgt.", views: 2100 },
    { title: "Loans 101", views: 1500 },
  ];

  const max = Math.max(...articles.map((a) => a.views));

  return (
    <SectionCard
      title="Content Performance"
      subtitle="Top 5 Articles · Views in the last 7 days"
    >
      <div className="mt-2 space-y-3">
        {articles.map((a) => (
          <ProgressBarRow
            key={a.title}
            label={a.title}
            value={`${(a.views / 1000).toFixed(1)}k`}
            percent={(a.views / max) * 100}
          />
        ))}
      </div>
    </SectionCard>
  );
};

export default TopArticlesCard;
