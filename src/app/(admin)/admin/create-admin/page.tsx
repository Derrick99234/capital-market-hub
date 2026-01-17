"use client";
import { useState } from "react";
import { Shield, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function CreateAdminPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const createAdmin = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/admin/create-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || "Failed to create admin user");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Create Admin User
          </h1>
          <p className="text-gray-400">
            Set up the system administrator account
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">
              Admin Account Details
            </h2>
            <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
              <div className="text-sm text-gray-300 space-y-1">
                <div>
                  <strong>Email:</strong> admin@capitalmarkethub.com
                </div>
                <div>
                  <strong>Role:</strong> Administrator
                </div>
                <div>
                  <strong>Permissions:</strong> Full System Access
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg mb-6">
              <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-400 shrink-0" />
                <p className="text-green-400">{result.message}</p>
              </div>

              {result.credentials && (
                <div className="bg-gray-700/50 rounded-lg p-4 border border-yellow-500/20">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">
                    🔐 Admin Credentials
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Email:</span>
                      <span className="text-white font-mono">
                        {result.credentials.email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Password:</span>
                      <span className="text-white font-mono">
                        {result.credentials.password}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Role:</span>
                      <span className="text-blue-400">
                        {result.credentials.role}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                    <p className="text-yellow-400 text-sm">
                      ⚠️ <strong>Important:</strong> Save these credentials
                      securely! You won&pos;t be able to see the password again.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="text-center">
            <button
              onClick={createAdmin}
              disabled={loading || !!result}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating Admin User...
                </>
              ) : result ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Admin User Created
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  Create Admin User
                </>
              )}
            </button>

            {result && (
              <div className="mt-4">
                <a
                  href="/admin/login"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Proceed to Admin Login
                </a>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h3 className="text-sm font-medium text-blue-400 mb-2">
              Security Information
            </h3>
            <ul className="text-xs text-blue-300 space-y-1">
              <li>• Password is securely hashed with bcrypt</li>
              <li>• Admin role provides full system access</li>
              <li>• Session management with automatic logout</li>
              <li>• All admin actions are logged for security</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
