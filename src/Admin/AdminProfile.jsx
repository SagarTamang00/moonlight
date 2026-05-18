import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import checkAuthAndRedirect from "../utils/auth";
import { UserCog, Mail, ShieldCheck, LogOut } from "lucide-react";

const AdminProfile = () => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProfile = async () => {
            const ok = await checkAuthAndRedirect(navigate);
            if (!ok) return;

            try {
                const token = localStorage.getItem("token");
                const res = await API.get("/admin/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Note: Adjust depending on backend response, e.g. res.data or res.data.admin
                setProfile(res.data.admin || res.data);
            } catch (err) {
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/admin/login");
    };

    return (
        <div className="flex-1 overflow-y-auto p-6 md:p-10 transition-all duration-300">
            <div className="mb-10 max-w-4xl mx-auto">
                <h2
                    className="text-3xl font-bold text-black dark:text-white"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                >
                    Admin Profile
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Manage your account details and access.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-black dark:border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl p-6 text-center">
                        <p>{error}</p>
                    </div>
                )}

                {profile && (
                    <div className="bg-[#f7f7f7] dark:bg-[#111111] border border-[#e5e5e5] dark:border-[#222222] rounded-[2rem] p-8 md:p-12 shadow-sm transition-all duration-300">

                        {/* HEADER / AVATAR */}
                        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                            <div className="w-32 h-32 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-5xl font-bold shrink-0">
                                {profile.name?.charAt(0)?.toUpperCase() || "A"}
                            </div>
                            <div className="text-center md:text-left">
                                <h1
                                    className="text-4xl font-bold text-black dark:text-white mb-2"
                                    style={{ fontFamily: "'Syne', sans-serif" }}
                                >
                                    {profile.name || "Admin User"}
                                </h1>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium">
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                                    Active Account
                                </div>
                            </div>
                        </div>

                        {/* INFO GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

                            <div className="bg-white dark:bg-[#1a1a1a] border border-[#ececec] dark:border-[#2a2a2a] rounded-2xl p-6 flex items-start gap-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                                <div className="w-14 h-14 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                                        Email Address
                                    </p>
                                    <p className="text-black dark:text-white font-medium break-all text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>
                                        {profile.email}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#1a1a1a] border border-[#ececec] dark:border-[#2a2a2a] rounded-2xl p-6 flex items-start gap-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                                <div className="w-14 h-14 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                                        Role & Access
                                    </p>
                                    <p className="text-black dark:text-white font-medium capitalize text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>
                                        {profile.role || "Super Administrator"}
                                    </p>
                                </div>
                            </div>

                        </div>


                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;