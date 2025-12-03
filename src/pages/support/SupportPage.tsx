import React, { useMemo, useState } from "react";
import PageHeader from "../../components/shared/layout/PageHeader";
import SupportTicketsTable, { type SupportTicket } from "../../components/support/SupportTicketsTable";
import SupportTicketModal from "../../components/support/SupportTicketModal";
import DateRangeFilter from "../../components/dashboard/DateRangeFilter";
import Button from "../../components/shared/buttons/Button";

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
      { id: "m1", author: "john.doe@example.com", text: "I can't sign in with my account.", date: "2024-05-20" },
      { id: "m2", author: "Ava", text: "Can you confirm if you receive an error message?", date: "2024-05-21" },
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
      { id: "m3", author: "jane.smith@example.com", text: "Why was I billed twice?", date: "2024-05-18" },
      { id: "m4", author: "Liam", text: "We're reviewing this and will update soon.", date: "2024-05-19" },
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
      { id: "m5", author: "mary.williams@example.com", text: "It would be great to download reports.", date: "2024-05-14" },
      { id: "m6", author: "Support", text: "Thanks — we'll consider this in roadmap.", date: "2024-05-15" },
    ],
    lastUpdated: "2024-05-15",
  },
];

const SupportPage: React.FC = () => {
  const [range, setRange] = useState<any>("last_30_days");
  const [tickets, setTickets] = useState<SupportTicket[]>(sampleTickets);
  const [search, setSearch] = useState("");

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<SupportTicket | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return tickets;
    return tickets.filter(t => t.subject.toLowerCase().includes(q) || t.user.toLowerCase().includes(q));
  }, [tickets, search]);

  const handleCreate = (vals: any) => {
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
      lastUpdated: new Date().toISOString().slice(0,10),
    };
    setTickets(prev => [nt, ...prev]);
    setCreateOpen(false);
  };

  const handleEdit = (vals: any) => {
    if (!editing) return;
    setTickets(prev => prev.map(t => t.id === editing.id ? { ...t, ...vals, lastUpdated: new Date().toISOString().slice(0,10) } : t));
    setEditing(null);
    setEditOpen(false);
  };

  const onEditClick = (t: SupportTicket) => {
    setEditing(t);
    setEditOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Support" description="Customer support tickets and workflows." rightContent={<div className="flex items-center gap-2"><DateRangeFilter value={range} onChange={setRange} /><Button size="sm" onClick={() => setCreateOpen(true)}>Create Ticket</Button></div>} />

      <SupportTicketsTable tickets={filtered} search={search} onSearchChange={setSearch} onRowClick={(t) => { setEditing(t); setEditOpen(true); }} onEdit={onEditClick} />

      <SupportTicketModal open={createOpen} mode="create" onClose={() => setCreateOpen(false)} onSubmit={handleCreate} />
      <SupportTicketModal open={editOpen} mode="edit" initialValues={editing || undefined} onClose={() => { setEditOpen(false); setEditing(null); }} onSubmit={handleEdit} />
    </div>
  );
};

export default SupportPage;
