import React, { useState } from "react";
import PageHeader from "../../components/shared/layout/PageHeader";
import Button from "../../components/shared/buttons/Button";
import DateRangeFilter from "../../components/dashboard/DateRangeFilter";
import StatsOverview from "../../components/dashboard/StatsOverview";
import UsageEngagementCard from "../../components/dashboard/UsageEngagementCard";
import RecentActivityCard from "../../components/dashboard/RecentActivityCard";
import QuickLinksCard from "../../components/dashboard/QuickLinksCard"; // 👈 NEW

export type DateRange =
  | "last_7_days"
  | "last_30_days"
  | "this_month"
  | "this_quarter";

const DashboardPage: React.FC = () => {
  const [range, setRange] = useState<DateRange>("last_7_days");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="High-level overview of system health & activity."
        rightContent={
          <>
            <DateRangeFilter value={range} onChange={setRange} />
            <Button>Generate Report</Button>
          </>
        }
      />

      {/* KPI cards row */}
      <StatsOverview dateRange={range} />

      {/* Usage chart + side column */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2 gap-3">
          <UsageEngagementCard dateRange={range} />
          <QuickLinksCard />
        </div>
        
        {/* Right column: Recent Activity + Quick Links */}
        <div className="space-y-4">
          <RecentActivityCard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
