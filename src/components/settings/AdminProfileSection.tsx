import React, { useState } from "react";
import SectionCard from "../shared/layout/SectionCard";
import TextInput from "../shared/inputs/TextInput";
import SettingsSection from "./SettingsSection";

type ProfileForm = {
  displayName: string;
  email: string;
};

const AdminProfileSection: React.FC = () => {
  const [form, setForm] = useState<ProfileForm>({
    displayName: "Alex Greyson",
    email: "alex.greyson@paramount.com",
  });

  const handleChange =
    (field: keyof ProfileForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <SettingsSection title="Admin Profile">
      <SectionCard>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            label="Display Name"
            value={form.displayName}
            onChange={handleChange("displayName")}
          />
          <TextInput
            label="Email Address"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
          />
        </div>
      </SectionCard>
    </SettingsSection>
  );
};

export default AdminProfileSection;
