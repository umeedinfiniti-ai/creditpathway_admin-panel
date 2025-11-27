// src/components/analytics/TimeRangeTabs.tsx
import React from "react";
import SegmentedControl, {
  type SegmentedOption,
} from "../shared/buttons/SegmentedControl";
import type { AnalyticsRange } from "../../pages/analytics/AnalyticsPage";

type Props = {
  value: AnalyticsRange;
  onChange: (value: AnalyticsRange) => void;
};

const options: SegmentedOption[] = [
  { label: "Last 7 Days", value: "last_7_days" },
  { label: "Last 30 Days", value: "last_30_days" },
  { label: "This Month", value: "this_month" },
  { label: "This Quarter", value: "this_quarter" },
  { label: "Custom Range", value: "custom" },
];

const TimeRangeTabs: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex items-center justify-between">
      <SegmentedControl
        options={options}
        value={value}
        onChange={(val) => onChange(val as AnalyticsRange)}
      />
    </div>
  );
};

export default TimeRangeTabs;
