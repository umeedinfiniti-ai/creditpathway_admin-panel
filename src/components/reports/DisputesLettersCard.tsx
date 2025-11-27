// src/components/reports/DisputesLettersCard.tsx
import React from "react";
import SectionCard from "../shared/layout/SectionCard";
import DataTable, { type Column } from "../shared/table/DataTable";
import StatusBadge from "../shared/data-display/StatusBadge";
import type { DateRange } from "../../pages/dashboard/DashboardPage";

type DisputeStatus = "open" | "resolved" | "mailed";

type DisputeRow = {
  id: string;
  user: string;
  caseId: string;
  type: string;
  status: DisputeStatus;
  lastUpdated: string;
};

const rows: DisputeRow[] = [
  {
    id: "1",
    user: "John Doe",
    caseId: "D-123",
    type: "Charge-off dispute",
    status: "open",
    lastUpdated: "2024-05-20",
  },
  {
    id: "2",
    user: "Jane Smith",
    caseId: "D-124",
    type: "Late payment removal",
    status: "mailed",
    lastUpdated: "2024-05-18",
  },
  {
    id: "3",
    user: "Mary Williams",
    caseId: "D-125",
    type: "Collection removal",
    status: "resolved",
    lastUpdated: "2024-05-10",
  },
];

type Props = {
  dateRange: DateRange;
};

const DisputesLettersCard: React.FC<Props> = () => {
  const columns: Column<DisputeRow>[] = [
    { key: "user", header: "User", className: "min-w-[160px]" },
    { key: "caseId", header: "Case ID", className: "min-w-[80px]" },
    { key: "type", header: "Type", className: "min-w-[200px]" },
    {
      key: "status",
      header: "Status",
      className: "min-w-[120px]",
      render: (row) => {
        if (row.status === "open") {
          return (
            <StatusBadge label="Open" variant="warning" />
          );
        }
        if (row.status === "mailed") {
          return (
            <StatusBadge label="Mailed" variant="info" />
          );
        }
        return (
          <StatusBadge label="Resolved" variant="success" />
        );
      },
    },
    {
      key: "lastUpdated",
      header: "Last updated",
      className: "min-w-[130px] text-gray-600",
    },
  ];

  return (
    <SectionCard
      title="Disputes & Letters"
      subtitle="Track dispute progress and letter mailing status."
    >
      <DataTable
        columns={columns}
        data={rows}
        getRowId={(r) => r.id}
      />
    </SectionCard>
  );
};

export default DisputesLettersCard;
