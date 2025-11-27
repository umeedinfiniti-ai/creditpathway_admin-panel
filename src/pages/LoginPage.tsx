import React from "react";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import Logo from "../components/shared/Logo";

const LoginPage: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-5xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:flex flex-col items-start gap-6 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-serif text-gray-900 dark:text-gray-100">Welcome back</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Sign in to manage content, users and reports.</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md animate-fade-in-up">
              <div className="rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
                <div className="mb-6 flex items-center gap-4">
                  <Logo />
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Sign in</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Access the admin dashboard</p>
                  </div>
                </div>
                <LoginForm />
              </div>
              <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">By signing in you agree to the Terms of Service.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
