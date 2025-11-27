// src/components/reports/IssuesSupportCard.tsx
import React from "react";
import SectionCard from "../shared/layout/SectionCard";
import DataTable, { type Column } from "../shared/table/DataTable";
import StatusBadge from "../shared/data-display/StatusBadge";
import type { DateRange } from "../../pages/dashboard/DashboardPage";

type IssueStatus = "open" | "in_progress" | "resolved";

type IssueRow = {
  id: string;
  user: string;
  subject: string;
  channel: "Chat" | "Phone" | "Email";
  advisor: string;
  status: IssueStatus;
  lastContact: string;
};

const issues: IssueRow[] = [
  {
    id: "1",
    user: "John Doe",
    subject: "Confused about next steps",
    channel: "Chat",
    advisor: "Alex G.",
    status: "in_progress",
    lastContact: "5m ago",
  },
  {
    id: "2",
    user: "Jane Smith",
    subject: "Dispute response received",
    channel: "Phone",
    advisor: "Sam R.",
    status: "open",
    lastContact: "25m ago",
  },
  {
    id: "3",
    user: "Mary Williams",
    subject: "Billing question",
    channel: "Email",
    advisor: "Taylor P.",
    status: "resolved",
    lastContact: "Yesterday",
  },
];

type Props = {
  dateRange: DateRange;
};

const IssuesSupportCard: React.FC<Props> = () => {
  const columns: Column<IssueRow>[] = [
    { key: "user", header: "User", className: "min-w-[150px]" },
    {
      key: "subject",
      header: "Issue",
      className: "min-w-[220px]",
    },
    {
      key: "channel",
      header: "Channel",
      className: "min-w-[80px] text-gray-700",
    },
    {
      key: "advisor",
      header: "Advisor",
      className: "min-w-[110px]",
    },
    {
      key: "status",
      header: "Status",
      className: "min-w-[110px]",
      render: (row) => {
        if (row.status === "open") {
          return <StatusBadge label="Open" variant="warning" />;
        }
        if (row.status === "in_progress") {
          return (
            <StatusBadge
              label="In Progress"
              variant="info"
            />
          );
        }
        return (
          <StatusBadge label="Resolved" variant="success" />
        );
      },
    },
    {
      key: "lastContact",
      header: "Last contact",
      className: "min-w-[120px] text-gray-600",
    },
  ];

  return (
    <SectionCard
      title="User Issues & Support"
      subtitle="Track support tickets, channels, and advisor workload."
    >
      <DataTable
        columns={columns}
        data={issues}
        getRowId={(r) => r.id}
      />
    </SectionCard>
  );
};

export default IssuesSupportCard;
