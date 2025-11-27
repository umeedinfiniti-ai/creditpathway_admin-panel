import React, { useState } from "react";
import Modal from "../shared/overlay/Modal";
import TextInput from "../shared/inputs/TextInput";
import Button from "../shared/buttons/Button";

type Props = {
  open: boolean;
  onClose: () => void;
};

const ChangePasswordModal: React.FC<Props> = ({ open, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!currentPassword || !nextPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (nextPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);
      // TODO: call your API here
      // await api.changePassword({ currentPassword, nextPassword });
      setSubmitting(false);
      onClose();
      setCurrentPassword("");
      setNextPassword("");
      setConfirmPassword("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setSubmitting(false);
      setError("Failed to update password. Please try again.");
    }
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title="Change Password"
      description="Update your account password. Make sure it's at least 8 characters long."
      size="md"
      footer={
        <>
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            type="submit"
            form="change-password-form"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save Password"}
          </Button>
        </>
      }
    >
      <form
        id="change-password-form"
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <TextInput
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextInput
          label="New Password"
          type="password"
          value={nextPassword}
          onChange={(e) => setNextPassword(e.target.value)}
          hint="Minimum 8 characters, with a mix of letters and numbers."
        />
        <TextInput
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && (
          <p className="pt-1 text-sm text-red-500">{error}</p>
        )}
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
