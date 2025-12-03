import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import Button from "../shared/buttons/Button";

const LoginForm: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState<"superadmin" | "support">("superadmin");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    setSubmitting(true);
    try {
      // Minimal stub - you could validate password here or call an API
      await auth.login(email.trim(), role, password);
      navigate(role === "support" ? "/support" : "/");
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm animate-fade-in-up">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition duration-150 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition duration-150 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          placeholder="Enter your password"
        />
      </div>

      {error && <p className="text-sm text-rose-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Role</label>
        <select
          value={role}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value as "superadmin" | "support")}
          className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
        >
          <option value="superadmin">Super Admin</option>
          <option value="support">Support Team</option>
        </select>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign in"}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
