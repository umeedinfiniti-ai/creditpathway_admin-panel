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
      // TODO: call your export API here
      // await api.exportAnalytics({ range, format, includeUsers, ... });
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
