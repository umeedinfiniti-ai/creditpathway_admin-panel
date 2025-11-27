// src/pages/reports/ReportsPage.tsx
import React, { useMemo, useState } from "react";
import PageHeader from "../../components/shared/layout/PageHeader";
import ReportsTabs, { type ReportsTab } from "../../components/reports/ReportsTabs";
import UserJourneyTable, {
  type UserJourney,
} from "../../components/reports/UserJourneyTable";
import UserJourneyDrawer from "../../components/reports/UserJourneyDrawer";
import DisputesLettersCard from "../../components/reports/DisputesLettersCard";
import MailingLogsCard from "../../components/reports/MailingLogsCard";
import IssuesSupportCard from "../../components/reports/IssuesSupportCard";
import DateRangeFilter from "../../components/dashboard/DateRangeFilter";
import type { DateRange } from "../dashboard/DashboardPage";

const sampleJourneys: UserJourney[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    plan: "Premium Boost",
    stage: "Letters in progress",
    progress: 70,
    lastUpdated: "2024-05-20",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    plan: "Score Rebuild",
    stage: "Disputes filed",
    progress: 45,
    lastUpdated: "2024-05-18",
  },
  {
    id: "3",
    name: "Peter Jones",
    email: "peter.jones@email.com",
    plan: "Debt Relief",
    stage: "Onboarding",
    progress: 15,
    lastUpdated: "2024-05-10",
  },
  {
    id: "4",
    name: "Mary Williams",
    email: "mary.williams@email.com",
    plan: "Premium Boost",
    stage: "Monitoring",
    progress: 90,
    lastUpdated: "2024-05-21",
  },
];

const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ReportsTab>("journeys");
  const [dateRange, setDateRange] = useState<DateRange>("last_30_days");

  const [journeySearch, setJourneySearch] = useState("");
  const [selectedJourney, setSelectedJourney] =
    useState<UserJourney | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredJourneys = useMemo(() => {
    const q = journeySearch.toLowerCase().trim();
    if (!q) return sampleJourneys;
    return sampleJourneys.filter(
      (j) =>
        j.name.toLowerCase().includes(q) ||
        j.email.toLowerCase().includes(q) ||
        j.plan.toLowerCase().includes(q)
    );
  }, [journeySearch]);

  const handleJourneyClick = (journey: UserJourney) => {
    setSelectedJourney(journey);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Monitor user journeys, disputes, mailing activity, and support issues."
        rightContent={
          <DateRangeFilter
            value={dateRange}
            onChange={setDateRange}
          />
        }
      />

      <ReportsTabs value={activeTab} onChange={setActiveTab} />

      {activeTab === "journeys" && (
        <>
          <UserJourneyTable
            journeys={filteredJourneys}
            search={journeySearch}
            onSearchChange={setJourneySearch}
            onRowClick={handleJourneyClick}
          />
          <UserJourneyDrawer
            open={drawerOpen}
            journey={selectedJourney}
            onClose={() => setDrawerOpen(false)}
          />
        </>
      )}

      {activeTab === "disputes" && (
        <DisputesLettersCard dateRange={dateRange} />
      )}

      {activeTab === "mail" && <MailingLogsCard dateRange={dateRange} />}

      {activeTab === "issues" && <IssuesSupportCard dateRange={dateRange} />}
    </div>
  );
};

export default ReportsPage;
