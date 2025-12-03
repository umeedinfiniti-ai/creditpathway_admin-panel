import React, { useState } from "react";
import Modal from "../shared/overlay/Modal";
import TextInput from "../shared/inputs/TextInput";
import SelectFilter from "../shared/inputs/SelectFilter";
import Button from "../shared/buttons/Button";

type TicketMessage = {
  id: string;
  author: string;
  text: string;
  date: string;
};

export type TicketValues = {
  subject?: string;
  user?: string;
  status?: "open" | "pending" | "closed" | null;
  priority?: "low" | "medium" | "high" | null;
  assignedTo?: string;
  message?: string;
  messages?: TicketMessage[];
};

type Props = {
  open: boolean;
  mode: "create" | "edit";
  initialValues?: TicketValues | null;
  onClose: () => void;
  onSubmit: (values: TicketValues) => void;
};

const EMPTY_TICKET: TicketValues = {
  subject: "",
  user: "",
  status: "open",
  priority: "medium",
  assignedTo: "",
  message: "",
  messages: [],
};

const SupportTicketModal: React.FC<Props> = ({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
}) => {
  // Initialize form values from mode + initialValues on first mount
  const [values, setValues] = useState<TicketValues>(() => {
    if (mode === "edit" && initialValues) {
      return {
        ...EMPTY_TICKET,
        ...initialValues,
      };
    }
    return { ...EMPTY_TICKET };
  });

  const [messages, setMessages] = useState<TicketMessage[]>(
    () => initialValues?.messages ?? []
  );
  const [replyText, setReplyText] = useState<string>("");

  const handleSave = () => {
    const trimmed = replyText.trim();

    const nextMessages: TicketMessage[] =
      trimmed.length > 0
        ? [
            ...messages,
            {
              id: Date.now().toString(),
              author: "Support",
              text: trimmed,
              date: new Date().toISOString().slice(0, 10),
            },
          ]
        : messages;

    // ✅ use the setter so ESLint is happy and UI updates immediately
    setMessages(nextMessages);
    setReplyText("");

    onSubmit({ ...values, messages: nextMessages });
  };

  const handleChange =
    (field: keyof TicketValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setValues((prev) => ({ ...prev, [field]: v }));
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
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button size="sm" type="button" onClick={handleSave}>
            Save
          </Button>
        </>
      }
    >
      <form className="space-y-3">
        <TextInput
          label="Subject"
          value={values.subject || ""}
          onChange={handleChange("subject")}
        />
        <TextInput
          label="User"
          value={values.user || ""}
          onChange={handleChange("user")}
        />

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Status
            </label>
            <SelectFilter
              value={values.status ?? null}
              onChange={(v: string | null) =>
                setValues((prev) => ({
                  ...prev,
                  status: v as TicketValues["status"],
                }))
              }
              options={[
                { value: "open", label: "Open" },
                { value: "pending", label: "Pending" },
                { value: "closed", label: "Closed" },
              ]}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Priority
            </label>
            <SelectFilter
              value={values.priority ?? null}
              onChange={(v: string | null) =>
                setValues((prev) => ({
                  ...prev,
                  priority: v as TicketValues["priority"],
                }))
              }
              options={[
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
              ]}
            />
          </div>
        </div>

        <TextInput
          label="Assigned To"
          value={values.assignedTo || ""}
          onChange={handleChange("assignedTo")}
        />
        <TextInput
          label="Message"
          value={values.message || ""}
          onChange={handleChange("message")}
        />

        {mode === "edit" && (
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Conversation
            </div>
            <div className="max-h-40 overflow-y-auto rounded-lg border border-gray-200 bg-white p-3 pr-4 text-sm text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
              {messages && messages.length > 0 ? (
                messages.map((m) => (
                  <div key={m.id} className="mb-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {m.author} • {m.date}
                    </div>
                    <div className="mt-1 text-sm">{m.text}</div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-gray-500">No messages yet.</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Reply
              </label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                rows={3}
              />
              <div className="mt-2 text-right text-xs text-gray-500">
                (Reply will be saved when you click Save)
              </div>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default SupportTicketModal;
