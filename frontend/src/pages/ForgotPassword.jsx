import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });

      setSent(true); // show success message
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        {!sent ? (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Forgot Password
            </h2>

            <p className="text-center text-gray-600 mt-2">
              Enter your email to receive OTP
            </p>

            {error && (
              <div className="text-red-500 text-sm mt-3 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSendOTP} className="mt-6 space-y-4">
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button
                className="btn btn-neutral w-full"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </>
        ) : (
          // ✅ OTP SENT UI
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">
              OTP Sent ✅
            </h2>

            <p className="text-gray-700 mt-4">
              An OTP has been sent to your email address.
            </p>

            <p className="text-gray-500 text-sm mt-2">
              Please check your inbox and spam folder.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
