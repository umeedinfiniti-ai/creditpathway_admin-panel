import React from "react";
import SectionCard from "../shared/layout/SectionCard";
import TableToolbar from "../shared/table/TableToolbar";
import SearchInput from "../shared/inputs/SearchInput";
import DataTable, { type Column } from "../shared/table/DataTable";


export type SupportTicket = {
  id: string;
  subject: string;
  user: string;
  status: "open" | "pending" | "closed";
  priority: "low" | "medium" | "high";
  assignedTo?: string;
  message?: string;
  messages?: { id: string; author: string; text: string; date: string }[];
  lastUpdated: string;
};

type Props = {
  tickets: SupportTicket[];
  search: string;
  onSearchChange: (value: string) => void;
  onRowClick?: (ticket: SupportTicket) => void;
  onEdit?: (ticket: SupportTicket) => void;
};

const SupportTicketsTable: React.FC<Props> = ({ tickets, search, onSearchChange, onRowClick, onEdit }) => {
  const columns: Column<SupportTicket>[] = [
    { key: "subject", header: "Subject", className: "min-w-[220px] font-medium" },
    { key: "user", header: "User", className: "min-w-[160px] text-gray-600" },
    { key: "status", header: "Status", className: "min-w-[120px]" , render: (r) => <span className="capitalize">{r.status}</span>},
    { key: "priority", header: "Priority", className: "min-w-[100px]" , render: (r) => <span className="capitalize">{r.priority}</span>},
    { key: "assignedTo", header: "Assigned", className: "min-w-[140px] text-gray-600" },
    { key: "lastUpdated", header: "Last updated", className: "min-w-[140px] text-gray-600" },
    { key: "actions", header: "", className: "w-24 text-right", render: (row) => (
      <div className="flex justify-end gap-2">
        <button type="button" onClick={(e) => { e.stopPropagation(); onEdit?.(row); }} className="text-sm text-amber-600 hover:underline">Edit</button>
      </div>
    ) },
  ];

  return (
    <SectionCard title="Support Tickets" subtitle="Customer tickets and support requests.">
      <TableToolbar
        search={
          <SearchInput placeholder="Search subject or user..." value={search} onChange={(e) => onSearchChange(e.target.value)} />
        }
      />

      <DataTable columns={columns} data={tickets} getRowId={(r) => r.id} onRowClick={onRowClick} hover />

      {tickets.length === 0 && (
        <div className="mt-3 text-xs text-gray-500">No tickets found.</div>
      )}
    </SectionCard>
  );
};

export default SupportTicketsTable;
