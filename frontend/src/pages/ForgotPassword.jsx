// import { useState } from "react";
// import axios from "axios";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [sent, setSent] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSendOTP = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       await axios.post("http://localhost:5000/api/auth/forgot-password", {
//         email,
//       });

//       setSent(true); // show success message
//     } catch (err) {
//       setError(err.response?.data?.msg || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400 flex items-center justify-center px-6">
//       <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

//         {!sent ? (
//           <>
//             <h2 className="text-2xl font-bold text-center text-gray-800">
//               Forgot Password
//             </h2>

//             <p className="text-center text-gray-600 mt-2">
//               Enter your email to receive OTP
//             </p>

//             {error && (
//               <div className="text-red-500 text-sm mt-3 text-center">
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSendOTP} className="mt-6 space-y-4">
//               <input
//                 type="email"
//                 placeholder="you@example.com"
//                 className="input input-bordered w-full"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />

//               <button
//                 className="btn btn-neutral w-full"
//                 disabled={loading}
//               >
//                 {loading ? "Sending OTP..." : "Send OTP"}
//               </button>
//             </form>
//           </>
//         ) : (
//           // ✅ OTP SENT UI
//           <div className="text-center">
//             <h2 className="text-2xl font-bold text-green-600">
//               OTP Sent ✅
//             </h2>

//             <p className="text-gray-700 mt-4">
//               An OTP has been sent to your email address.
//             </p>

//             <p className="text-gray-500 text-sm mt-2">
//               Please check your inbox and spam folder.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [msg, setMsg] = useState("");

  const sendOtp = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/send-otp", { email });
    setMsg(res.data.message || "OTP sent successfully");
    setStep(2);
  } catch (err) {
    setMsg(err.response?.data?.message || "Error sending OTP");
  }
};

  const resetPassword = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      setMsg(res.data.msg);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-slate-800 p-6 rounded-lg w-96">

        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

        {msg && <p className="text-sm mb-3 text-teal-400">{msg}</p>}

        {step === 1 && (
          <>
            <input
              className="w-full p-2 rounded text-black mb-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={sendOtp} className="w-full bg-teal-500 p-2 rounded">
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              className="w-full p-2 rounded text-black mb-3"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <input
              className="w-full p-2 rounded text-black mb-3"
              placeholder="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button onClick={resetPassword} className="w-full bg-teal-500 p-2 rounded">
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
