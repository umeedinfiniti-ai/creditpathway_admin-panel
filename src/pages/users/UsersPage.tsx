// src/pages/users/UserManagementPage.tsx
import React, { useMemo, useState } from "react";
import PageHeader from "../../components/shared/layout/PageHeader";
import Button from "../../components/shared/buttons/Button";
import UserTable, {
  type User,
  type UserStatus,
  type UserTier,
} from "../../components/users/UserTable";
import UserDetailsDrawer from "../../components/users/UserDetailsDrawer";
import UserFormModal, {
  type UserFormValues,
} from "../../components/users/UserFormModal";

const PAGE_SIZE = 5;

const initialUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    tier: "Gold",
    status: "active",
    dateJoined: "2023-10-26",
    lastActivity: "2024-05-20",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    tier: "Silver",
    status: "active",
    dateJoined: "2023-09-15",
    lastActivity: "2024-05-18",
    phone: "(555) 555-1234",
    address: "45 River Rd, Anytown, USA",
  },
  {
    id: "3",
    name: "Peter Jones",
    email: "peter.jones@email.com",
    tier: "Bronze",
    status: "inactive",
    dateJoined: "2023-08-01",
    lastActivity: "2024-01-10",
    phone: "(555) 222-3333",
    address: "9 Market St, Anytown, USA",
  },
  {
    id: "4",
    name: "Mary Williams",
    email: "mary.williams@email.com",
    tier: "Gold",
    status: "active",
    dateJoined: "2023-11-05",
    lastActivity: "2024-05-21",
    phone: "(555) 777-8888",
    address: "77 Sunset Blvd, Anytown, USA",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@email.com",
    tier: "Silver",
    status: "active",
    dateJoined: "2024-01-20",
    lastActivity: "2024-05-19",
    phone: "(555) 444-9999",
    address: "12 Oak Ave, Anytown, USA",
  },
];

export type SortBy = "date_joined" | "last_activity";

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<UserTier | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  const [sortBy, setSortBy] = useState<SortBy>("date_joined");

  const [page, setPage] = useState(1);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // ---------- filtering + sorting ----------
  const filteredUsers = useMemo(() => {
    let data = [...users];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }

    if (tierFilter !== "all") {
      data = data.filter((u) => u.tier === tierFilter);
    }

    if (statusFilter !== "all") {
      data = data.filter((u) => u.status === statusFilter);
    }

    data.sort((a, b) => {
      const field =
        sortBy === "date_joined"
          ? "dateJoined"
          : ("lastActivity" as "dateJoined" | "lastActivity");
      return a[field] < b[field] ? 1 : -1;
    });

    return data;
  }, [users, search, tierFilter, statusFilter, sortBy]);

  // ---------- pagination ----------
  const total = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, currentPage]);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setDetailsOpen(true);
  };

  const handleOpenCreateUser = () => {
    setFormMode("create");
    setEditingUser(null);
    setFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    setFormMode("edit");
    setEditingUser(user);
    setFormOpen(true);
  };

  const handleFormSubmit = (values: UserFormValues) => {
    if (formMode === "create") {
      const now = new Date().toISOString().slice(0, 10);
      const newUser: User = {
        id: String(Date.now()),
        name: values.name,
        email: values.email,
        tier: values.tier,
        status: values.status,
        dateJoined: values.dateJoined || now,
        lastActivity: values.lastActivity || now,
        phone: values.phone,
        address: values.address,
      };
      setUsers((prev) => [newUser, ...prev]);
    } else if (formMode === "edit" && editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                ...values,
                dateJoined: values.dateJoined || u.dateJoined,
                lastActivity: values.lastActivity || u.lastActivity,
              }
            : u
        )
      );
      const updated = {
        ...editingUser,
        ...values,
      };
      setSelectedUser(updated);
    }

    setFormOpen(false);
    setEditingUser(null);
  };

  const handleToggleStatus = (user: User) => {
    const nextStatus: UserStatus =
      user.status === "active" ? "inactive" : "active";

    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, status: nextStatus } : u
      )
    );

    if (selectedUser?.id === user.id) {
      setSelectedUser({ ...user, status: nextStatus });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="Manage all user accounts in the system."
        rightContent={
          <>
            <Button variant="primary" onClick={handleOpenCreateUser}>
              + Add User
            </Button>
            {/* Top-right admin avatar can be part of your layout header */}
          </>
        }
      />

      <UserTable
        users={paginatedUsers}
        total={total}
        page={currentPage}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
        search={search}
        onSearchChange={setSearch}
        tierFilter={tierFilter}
        onTierFilterChange={setTierFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onRowClick={handleRowClick}
      />

      <UserDetailsDrawer
        open={detailsOpen}
        user={selectedUser}
        onClose={() => setDetailsOpen(false)}
        onEdit={handleEditUser}
        onToggleStatus={handleToggleStatus}
      />

      <UserFormModal
        open={formOpen}
        mode={formMode}
        onClose={() => {
          setFormOpen(false);
          setEditingUser(null);
        }}
        initialValues={editingUser || undefined}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default UserManagementPage;
