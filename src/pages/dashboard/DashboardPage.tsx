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
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    try {
      setIsGenerating(true);

      // Demo stats (kept in sync with StatsOverview static demo data)
      const stats = [
        { id: "total_users", label: "Total Users", value: "1,420", delta: 2.5 },
        { id: "active_users", label: "Active Users", value: "893", delta: -1.2 },
        { id: "members_by_tier", label: "Members by Tier", value: "65", suffix: "%", delta: 5.0 },
        { id: "open_disputes", label: "Open Disputes", value: "12", delta: 8.0 },
        { id: "letters_generated", label: "Letters Generated", value: "47", delta: 15.3 },
      ];

      // Build CSV
      const header = ["id", "label", "value", "delta", "range"];
      const rows = [header.join(",")];
      for (const s of stats) {
        const row = [
          s.id,
          `"${String(s.label).replace(/"/g, '""')}"`,
          String(s.value),
          String(s.delta ?? ""),
          range,
        ];
        rows.push(row.join(","));
      }

      const csv = rows.join("\n");

      // Download
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      a.href = url;
      a.download = `report-${range}-${timestamp}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
   
      console.error("Failed to generate report:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="High-level overview of system health & activity."
        rightContent={
          <>
            <DateRangeFilter value={range} onChange={setRange} />
            <Button onClick={handleGenerateReport} disabled={isGenerating}>
              {isGenerating ? "Generating…" : "Generate Report"}
            </Button>
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
