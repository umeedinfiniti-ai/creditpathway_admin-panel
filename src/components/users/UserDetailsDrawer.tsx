// src/components/users/UserDetailsDrawer.tsx
import React, { useState } from "react";
import Drawer from "../shared/overlay/Drawer";
import Avatar from "../shared/data-display/Avatar";
import Tabs, { type Tab } from "../shared/navigation/Tabs";
import Button from "../shared/buttons/Button";
import type { User } from "./UserTable";

type Props = {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onEdit: (user: User) => void;
  onToggleStatus: (user: User) => void;
};

const DETAIL_TABS: Tab[] = [
  { label: "User Details", value: "details" },
  { label: "Documents", value: "documents" },
  { label: "Credit Monitoring", value: "monitoring" },
];

const UserDetailsDrawer: React.FC<Props> = ({
  open,
  user,
  onClose,
  onEdit,
  onToggleStatus,
}) => {
  const [tab, setTab] = useState<string>("details");

  if (!user) return null;

  const handleEdit = () => onEdit(user);
  const handleToggle = () => onToggleStatus(user);

  return (
    <Drawer
      isOpen={open}
      onClose={onClose}
      title="User Details"
      widthClassName="w-full max-w-md"
    >
      {/* Header with avatar & name */}
      <div className="flex items-center gap-3 pb-4">
        <Avatar name={user.name} src={user.avatarUrl} size="lg" />
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4">
        <Tabs
          tabs={DETAIL_TABS}
          value={tab}
          onChange={setTab}
          variant="underline"
        />
      </div>

      {/* Tab content */}
      {tab === "details" && (
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-gray-800 dark:text-gray-200">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Tier
            </p>
            <p className="dark:text-gray-100">{user.tier}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Status
            </p>
            <p className="capitalize dark:text-gray-100">{user.status}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Phone Number
            </p>
            <p className="dark:text-gray-100">{user.phone ?? "—"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Address
            </p>
            <p className="dark:text-gray-100">{user.address ?? "—"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Date Joined
            </p>
            <p className="dark:text-gray-100">{user.dateJoined}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Last Activity
            </p>
            <p className="dark:text-gray-100">{user.lastActivity}</p>
          </div>
        </div>
      )}

      {tab === "documents" && (
        <div className="mt-2 text-sm text-gray-500">
          <p>No documents uploaded yet.</p>
        </div>
      )}

      {tab === "monitoring" && (
        <div className="mt-2 text-sm text-gray-500">
          <p>Credit monitoring status and connections will appear here.</p>
        </div>
      )}

      {/* Footer buttons */}
      <div className="mt-8 flex items-center justify-between gap-3 border-t border-gray-100 dark:border-gray-800 pt-4">
        <Button
          variant="secondary"
          size="sm"
          type="button"
          onClick={handleToggle}
        >
          {user.status === "active" ? "Deactivate" : "Reactivate"}
        </Button>
        <Button
          size="sm"
          type="button"
          onClick={handleEdit}
        >
          Edit Details
        </Button>
      </div>
    </Drawer>
  );
};

export default UserDetailsDrawer;
