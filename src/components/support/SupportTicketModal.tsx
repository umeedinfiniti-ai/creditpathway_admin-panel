import React, { useEffect, useState } from "react";
import Modal from "../shared/overlay/Modal";
import TextInput from "../shared/inputs/TextInput";
import SelectFilter from "../shared/inputs/SelectFilter";
import Button from "../shared/buttons/Button";

export type TicketValues = {
  subject?: string;
  user?: string;
  status?: "open" | "pending" | "closed";
  priority?: "low" | "medium" | "high";
  assignedTo?: string;
  message?: string;
  messages?: { id: string; author: string; text: string; date: string }[];
};

type Props = {
  open: boolean;
  mode: "create" | "edit";
  initialValues?: any;
  onClose: () => void;
  onSubmit: (values: TicketValues) => void;
};

const SupportTicketModal: React.FC<Props> = ({ open, mode, initialValues, onClose, onSubmit }) => {
  const [values, setValues] = useState<TicketValues>({});
  const [messages, setMessages] = useState<{ id: string; author: string; text: string; date: string }[]>([]);
  const [replyText, setReplyText] = useState("");

  const handleSave = () => {
    // if there's reply text, append it to messages before submitting
    const next = replyText.trim()
      ? [...(messages || []), { id: Date.now().toString(), author: "Support", text: replyText.trim(), date: new Date().toISOString().slice(0,10) }]
      : messages || [];
    // clear reply box
    setReplyText("");
    // send values including messages
    onSubmit({ ...values, messages: next });
  };

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      setValues(initialValues);
      setMessages(initialValues.messages || []);
    }
    if (mode === "create") setValues({ subject: "", user: "", status: "open", priority: "medium", assignedTo: "", message: "" });
  }, [initialValues, mode, open]);

  const handleChange = (field: keyof TicketValues) => (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const v = e && e.target ? e.target.value : e;
    setValues((p) => ({ ...p, [field]: v }));
  };

  const title = mode === "create" ? "Create Support Ticket" : "Edit Ticket";

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title={title}
      size="md"
      footer={
        <>
          <Button variant="secondary" size="sm" type="button" onClick={onClose}>Cancel</Button>
          <Button size="sm" type="button" onClick={handleSave}>Save</Button>
        </>
      }
    >
      <form className="space-y-3">
        <TextInput label="Subject" value={values.subject || ""} onChange={(e) => handleChange("subject")(e)} />
        <TextInput label="User" value={values.user || ""} onChange={(e) => handleChange("user")(e)} />
        <div className="grid grid-cols-2 gap-2">
          <SelectFilter
            label="Status"
            value={values.status}
            onChange={(v) => setValues((p) => ({ ...p, status: (v as any) }))}
            options={[{ value: "open", label: "Open" }, { value: "pending", label: "Pending" }, { value: "closed", label: "Closed" }]}
          />
          <SelectFilter
            label="Priority"
            value={values.priority}
            onChange={(v) => setValues((p) => ({ ...p, priority: (v as any) }))}
            options={[{ value: "low", label: "Low" }, { value: "medium", label: "Medium" }, { value: "high", label: "High" }]}
          />
        </div>

        <TextInput label="Assigned To" value={values.assignedTo || ""} onChange={(e) => handleChange("assignedTo")(e)} />
        <TextInput label="Message" value={values.message || ""} onChange={(e) => handleChange("message")(e)} />

        {mode === "edit" && (
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">Conversation</div>
            <div className="max-h-40 overflow-y-auto rounded-lg border border-gray-200 bg-white p-3 pr-4 text-sm text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
              {messages && messages.length > 0 ? (
                messages.map((m) => (
                  <div key={m.id} className="mb-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400">{m.author} • {m.date}</div>
                    <div className="mt-1 text-sm">{m.text}</div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-gray-500">No messages yet.</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Reply</label>
              <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200" rows={3} />
              <div className="mt-2 text-right text-xs text-gray-500">(Reply will be saved when you click Save)</div>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default SupportTicketModal;
