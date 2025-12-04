import React, { useMemo, useState } from "react";
import PageHeader from "../../components/shared/layout/PageHeader";
import SupportTicketsTable, {
  type SupportTicket,
} from "../../components/support/SupportTicketsTable";
import SupportTicketModal, {
  type TicketValues,
} from "../../components/support/SupportTicketModal";
import DateRangeFilter from "../../components/dashboard/DateRangeFilter";
import Button from "../../components/shared/buttons/Button";
import type { DateRange } from "../dashboard/DashboardPage";

const sampleTickets: SupportTicket[] = [
  {
    id: "t1",
    subject: "Cannot login",
    user: "john.doe@example.com",
    status: "open",
    priority: "high",
    assignedTo: "Ava",
    message: "User reports login failure.",
    messages: [
      {
        id: "m1",
        author: "john.doe@example.com",
        text: "I can't sign in with my account.",
        date: "2024-05-20",
      },
      {
        id: "m2",
        author: "Ava",
        text: "Can you confirm if you receive an error message?",
        date: "2024-05-21",
      },
    ],
    lastUpdated: "2024-05-21",
  },
  {
    id: "t2",
    subject: "Billing question",
    user: "jane.smith@example.com",
    status: "pending",
    priority: "medium",
    assignedTo: "Liam",
    message: "Invoice clarification.",
    messages: [
      {
        id: "m3",
        author: "jane.smith@example.com",
        text: "Why was I billed twice?",
        date: "2024-05-18",
      },
      {
        id: "m4",
        author: "Liam",
        text: "We're reviewing this and will update soon.",
        date: "2024-05-19",
      },
    ],
    lastUpdated: "2024-05-19",
  },
  {
    id: "t3",
    subject: "Feature request",
    user: "mary.williams@example.com",
    status: "closed",
    priority: "low",
    assignedTo: "",
    message: "Request for export feature.",
    messages: [
      {
        id: "m5",
        author: "mary.williams@example.com",
        text: "It would be great to download reports.",
        date: "2024-05-14",
      },
      {
        id: "m6",
        author: "Support",
        text: "Thanks — we'll consider this in roadmap.",
        date: "2024-05-15",
      },
    ],
    lastUpdated: "2024-05-15",
  },
];

const SupportPage: React.FC = () => {
  const [range, setRange] = useState<DateRange>("last_30_days");
  const [tickets, setTickets] = useState<SupportTicket[]>(sampleTickets);
  const [search, setSearch] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<SupportTicket | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return tickets;
    return tickets.filter(
      (t) =>
        t.subject.toLowerCase().includes(q) ||
        t.user.toLowerCase().includes(q)
    );
  }, [tickets, search]);

  const handleCreate = (vals: TicketValues) => {
    const id = Date.now().toString();
    const nt: SupportTicket = {
      id,
      subject: vals.subject || "New ticket",
      user: vals.user || "unknown",
      status: vals.status || "open",
      priority: vals.priority || "medium",
      assignedTo: vals.assignedTo || "",
      message: vals.message || "",
      messages: vals.messages || [],
      lastUpdated: new Date().toISOString().slice(0, 10),
    };
    setTickets((prev) => [nt, ...prev]);
    setCreateOpen(false);
  };

  // 🔁 Edit keeps modal open so admin can chat multiple times
  const handleEdit = (vals: TicketValues) => {
    if (!editing) return;
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== editing.id) return t;
        return {
          ...t,
          ...vals,
          status: vals.status ?? t.status,
          priority: vals.priority ?? t.priority,
          message: vals.message ?? t.message,
          messages: vals.messages ?? t.messages,
          lastUpdated: new Date().toISOString().slice(0, 10),
        };
      })
    );
    // do NOT close the modal here; user can keep chatting
  };

  const onEditClick = (t: SupportTicket) => {
    setEditing(t);
    setEditOpen(true);
  };

  return (
    <div className="space-y-6 text-gray-900 dark:text-gray-100">
      <PageHeader
        title="Support"
        description="Customer support tickets and workflows."
        rightContent={
          <div className="flex items-center gap-2">
            <DateRangeFilter value={range} onChange={setRange} />
            <Button
              size="sm"
              variant="secondary"
              onClick={async () => {
                setIsExporting(true);
                try {
                  const header = [
                    "id",
                    "subject",
                    "user",
                    "status",
                    "priority",
                    "assignedTo",
                    "message",
                    "lastUpdated",
                  ];
                  const rows: string[] = [header.join(",")];

                  for (const t of filtered) {
                    const row = [
                      t.id,
                      `"${String(t.subject).replace(/"/g, '""')}"`,
                      t.user,
                      t.status,
                      t.priority,
                      t.assignedTo || "",
                      `"${String(t.message).replace(/"/g, '""')}"`,
                      t.lastUpdated,
                    ];
                    rows.push(row.join(","));
                  }

                  const csv = rows.join("\n");
                  const blob = new Blob([csv], {
                    type: "text/csv;charset=utf-8;",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  const ts = new Date().toISOString().replace(/[:.]/g, "-");
                  a.href = url;
                  a.download = `support-tickets-${range}-${ts}.csv`;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  URL.revokeObjectURL(url);
                } catch (err) {
                  console.error("Failed to export tickets:", err);
                } finally {
                  setIsExporting(false);
                }
              }}
              disabled={isExporting}
            >
              {isExporting ? "Exporting…" : "Export"}
            </Button>

         
          </div>
        }
      />

      <SupportTicketsTable
        tickets={filtered}
        search={search}
        onSearchChange={setSearch}
        onRowClick={(t: SupportTicket) => {
          setEditing(t);
          setEditOpen(true);
        }}
        onEdit={onEditClick}
      />

      <SupportTicketModal
        key="create"
        open={createOpen}
        mode="create"
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
      />
      <SupportTicketModal
        key={editing?.id ?? "edit"}
        open={editOpen}
        mode="edit"
        initialValues={editing || undefined}
        onClose={() => {
          setEditOpen(false);
          setEditing(null);
        }}
        onSubmit={handleEdit}
      />
    </div>
  );
};

export default SupportPage;
