// src/components/analytics/MembershipDistributionCard.tsx
import React from "react";
// import SectionCard from "../shared/layout/SectionCard";
import DonutChartCard from "../shared/charts/DonutChartCard";

const MembershipDistributionCard: React.FC = () => {
  const data = [
    { label: "Premium (50%)", value: 50, color: "#D4A317" },
    { label: "Enterprise (30%)", value: 30, color: "#A0761A" },
    { label: "Free (20%)", value: 20, color: "#FACC6B" },
  ];

  return (
    <DonutChartCard
      title="Membership Distribution"
      subtitle="Breakdown of user tiers"
      data={data}
    />
  );
};

export default MembershipDistributionCard;
