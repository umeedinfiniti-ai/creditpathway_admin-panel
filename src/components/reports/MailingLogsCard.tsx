// src/components/reports/MailingLogsCard.tsx
import React from "react";
import SectionCard from "../shared/layout/SectionCard";
import DataTable, { type Column } from "../shared/table/DataTable";
import StatusBadge from "../shared/data-display/StatusBadge";
import type { DateRange } from "../../pages/dashboard/DashboardPage";

type MailStatus = "queued" | "sent" | "failed";

type MailLog = {
  id: string;
  user: string;
  item: string;
  channel: "Mail" | "Email";
  status: MailStatus;
  createdAt: string;
  error?: string;
};

const logs: MailLog[] = [
  {
    id: "1",
    user: "John Doe",
    item: "Letter #321",
    channel: "Mail",
    status: "sent",
    createdAt: "2024-05-20 10:23",
  },
  {
    id: "2",
    user: "Jane Smith",
    item: "Letter #322",
    channel: "Mail",
    status: "queued",
    createdAt: "2024-05-20 10:45",
  },
  {
    id: "3",
    user: "Peter Jones",
    item: "Email notice",
    channel: "Email",
    status: "failed",
    createdAt: "2024-05-19 18:03",
    error: "SMTP timeout",
  },
];

type Props = {
  dateRange: DateRange;
};

const MailingLogsCard: React.FC<Props> = () => {
  const columns: Column<MailLog>[] = [
    { key: "user", header: "User", className: "min-w-[150px]" },
    { key: "item", header: "Item", className: "min-w-[160px]" },
    {
      key: "channel",
      header: "Channel",
      className: "min-w-[80px] text-gray-700",
    },
    {
      key: "status",
      header: "Status",
      className: "min-w-[110px]",
      render: (row) => {
        if (row.status === "queued") {
          return (
            <StatusBadge label="Queued" variant="warning" />
          );
        }
        if (row.status === "sent") {
          return <StatusBadge label="Sent" variant="success" />;
        }
        return <StatusBadge label="Failed" variant="danger" />;
      },
    },
    {
      key: "createdAt",
      header: "Created",
      className: "min-w-[140px] text-gray-600",
    },
    {
      key: "error",
      header: "Error",
      className: "min-w-[160px] text-xs text-red-500",
    },
  ];

  return (
    <SectionCard
      title="Mailing Logs"
      subtitle="Monitor outgoing letters & emails and catch failures quickly."
    >
      <DataTable columns={columns} data={logs} getRowId={(r) => r.id} />
    </SectionCard>
  );
};

export default MailingLogsCard;
