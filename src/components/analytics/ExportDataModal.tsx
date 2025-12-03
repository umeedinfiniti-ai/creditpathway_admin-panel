// src/components/analytics/ExportDataModal.tsx
import React, { useState } from "react";
import Modal from "../shared/overlay/Modal";
import Button from "../shared/buttons/Button";
import SelectFilter from "../shared/inputs/SelectFilter";
import ToggleSwitch from "../shared/inputs/ToggleSwitch";
import TextInput from "../shared/inputs/TextInput";
import type { AnalyticsRange } from "../../pages/analytics/AnalyticsPage";

type Props = {
  open: boolean;
  onClose: () => void;
  defaultRange: AnalyticsRange;
};

const ExportDataModal: React.FC<Props> = ({
  open,
  onClose,
  defaultRange,
}) => {
  const [range, setRange] = useState<AnalyticsRange>(defaultRange);
  const [format, setFormat] = useState<"csv" | "pdf">("csv");
  const [includeUsers, setIncludeUsers] = useState(true);
  const [includeDisputes, setIncludeDisputes] = useState(true);
  const [includeContent, setIncludeContent] = useState(true);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    try {
      setLoading(true);
      // For CSV format, build a simple demo CSV client-side and download it.
      if (format === "csv") {
        const rows: string[] = [];

        // header
        rows.push(["dataset", "id", "label", "value"].join(","));

        // Users & Membership (demo rows)
        if (includeUsers) {
          rows.push(["users", "u_1", "Total Users", "1420"].join(","));
          rows.push(["users", "u_2", "Active Users", "893"].join(","));
        }

        // Disputes & Letters
        if (includeDisputes) {
          rows.push(["disputes", "d_1", "Open Disputes", "12"].join(","));
          rows.push(["disputes", "d_2", "Letters Generated", "47"].join(","));
        }

        // Content Performance
        if (includeContent) {
          rows.push(["content", "c_1", "Top Article 1", "1200"].join(","));
          rows.push(["content", "c_2", "Top Article 2", "980"].join(","));
        }

        // metadata row
        rows.push(["", "", "range", range].join(","));

        const csv = rows.join("\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        a.href = url;
        a.download = `analytics-export-${range}-${timestamp}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        // If an email was provided, you would call your backend API here
        // to send the file to the email. For now we just log the intent.
        if (email) {

          console.log(`Would send export to ${email} (not implemented).`);
        }

        setLoading(false);
        onClose();
        return;
      }

      console.log("PDF export requested (not implemented)");
      setLoading(false);
      onClose();
    } catch (err) {
      setLoading(false);
      // handle error / toast here
      console.error("Failed to export analytics", err);
    }
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title="Export Analytics Data"
      description="Choose the date range, format, and datasets you want to export."
      size="lg"
      footer={
        <>
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            type="button"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleExport}
            type="button"
            disabled={loading}
          >
            {loading ? "Preparing..." : "Export"}
          </Button>
        </>
      }
    >
      <div className="space-y-6 text-sm">
        {/* Date range + format */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-xs font-medium text-gray-700">
              Date Range
            </p>
            <SelectFilter
              value={range}
              onChange={(val) =>
                setRange((val as AnalyticsRange) || defaultRange)
              }
              options={[
                { value: "last_7_days", label: "Last 7 Days" },
                { value: "last_30_days", label: "Last 30 Days" },
                { value: "this_month", label: "This Month" },
                { value: "this_quarter", label: "This Quarter" },
                { value: "custom", label: "Custom Range" },
              ]}
              placeholder="Select range"
              className="w-full"
            />
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-gray-700">
              File Format
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={format === "csv" ? "primary" : "secondary"}
                onClick={() => setFormat("csv")}
              >
                CSV
              </Button>
              <Button
                type="button"
                size="sm"
                variant={format === "pdf" ? "primary" : "secondary"}
                onClick={() => setFormat("pdf")}
              >
                PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Datasets */}
        <div>
          <p className="mb-2 text-xs font-medium text-gray-700">
            Include Data
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span>Users & Membership</span>
              <ToggleSwitch
                checked={includeUsers}
                onChange={setIncludeUsers}
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <span>Disputes & Letters</span>
              <ToggleSwitch
                checked={includeDisputes}
                onChange={setIncludeDisputes}
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <span>Content Performance</span>
              <ToggleSwitch
                checked={includeContent}
                onChange={setIncludeContent}
              />
            </div>
          </div>
        </div>

        {/* Email field */}
        <div>
          <TextInput
            label="Send export link to (optional)"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            hint="If left empty, the file will download directly in your browser."
          />
        </div>
      </div>
    </Modal>
  );
};

export default ExportDataModal;
