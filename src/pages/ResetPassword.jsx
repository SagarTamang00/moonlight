import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../utils/auth";
import PopupModal from "../Admin/PopupModal";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // get token from URL
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [modal, setModal] = useState({
    isOpen: false,
    type: "alert",
    title: "",
    message: "",
    onConfirm: null,
  });

  const showModal = (type, title, message, onConfirm = null) => {
    setModal({ isOpen: true, type, title, message, onConfirm });
  };

  const closeModal = () =>
    setModal((prev) => ({ ...prev, isOpen: false }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or missing token");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await resetPassword({
        token,
        newPassword
      });

      showModal(
        "alert",
        "Password Reset",
        "Password reset successful. You can now login.",
        () => navigate("/admin/login")
      );

      setNewPassword("");
      setConfirmPassword("");

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black font-mono px-4 transition-colors duration-300 relative">
      <PopupModal
        {...modal}
        onCancel={closeModal}
        onConfirm={() => {
          if (modal.onConfirm) modal.onConfirm();
          else closeModal();
        }}
      />
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-16 text-center">
          <div className="w-16 h-16 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center rounded-2xl mx-auto mb-8 transition-colors duration-300">
            <span className="text-2xl font-bold font-sans">M</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 dark:text-neutral-500 mb-3">
            Authentication
          </p>
          <h1 className="text-4xl sm:text-5xl font-black uppercase leading-none tracking-tight text-black dark:text-white transition-colors duration-300">
            Reset<br />Password
          </h1>
          <div className="mt-8 h-px bg-black dark:bg-white w-16 mx-auto transition-colors duration-300" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="group relative">
            <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 mb-2 transition-colors group-focus-within:text-black dark:group-focus-within:text-white">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 pb-3 pt-1 text-sm text-black dark:text-white placeholder:text-neutral-300 dark:placeholder:text-neutral-700 outline-none transition-all duration-300 focus:border-black dark:focus:border-white"
                required
              />
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-black dark:bg-white transition-all duration-300 group-focus-within:w-full" />
            </div>
          </div>

          <div className="group relative">
            <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 mb-2 transition-colors group-focus-within:text-black dark:group-focus-within:text-white">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 pb-3 pt-1 text-sm text-black dark:text-white placeholder:text-neutral-300 dark:placeholder:text-neutral-700 outline-none transition-all duration-300 focus:border-black dark:focus:border-white"
                required
              />
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-black dark:bg-white transition-all duration-300 group-focus-within:w-full" />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs mt-2">{error}</p>
          )}

          <div className="text-right mt-2">
            <button
              type="button"
              onClick={() => navigate("/admin/login")}
              className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black dark:hover:text-white transition"
            >
              Back to Login
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full group relative overflow-hidden bg-black dark:bg-white text-white dark:text-black px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white border-2 border-black dark:border-white disabled:opacity-50 disabled:cursor-not-allowed mt-8"
          >
            <span className="relative z-10">{loading ? "Resetting..." : "Reset Password"}</span>
          </button>
        </form>

        <div className="mt-16 text-center">
          <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-300 dark:text-neutral-700">
            MoonLight Admin Panel • v1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;