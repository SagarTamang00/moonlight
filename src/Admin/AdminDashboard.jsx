import { useState } from "react";
import AdminSettings from "./AdminSettings";
import AdminSocialLinks from "./AdminSocialLinks";
import AdminTeam from "./AdminTeam";
import useSettings from "../hooks/useSettings";
import useDarkMode from "../hooks/useDarkMode";
import AdminPartners from "./AdminPartners";
import AdminProjects from "./AdminProjects";
import AdminNewsBlogs from "./AdminNewsBlogs";
import AdminAudition from "./AdminAuditions";
import AdminProjectCategories from "./AdminProjectCategories";
import AdminProjectLinks from "./AdminProjectLinks";
import AdminProjectMedia from "./AdminProjectMedia";
import { BASE_URL } from "../utils/api";
import checkAuthAndRedirect from "../utils/auth";
import { useNavigate } from "react-router-dom";

const NAV = [
  {
    grp: "Main",
    items: [
      { icon: "ti-layout-dashboard", label: "Dashboard" },
      { icon: "ti-settings", label: "Settings" },
      { icon: "ti-users", label: "Team" },
      { icon: "ti-link", label: "Social Links" },
      { icon: "ti-handshake", label: "Partners" },
      { icon: "ti-briefcase", label: "Projects" },
      { icon: "ti-newspaper", label: "News & Blogs" },
      { icon: "ti-microphone", label: "Auditions" },
      { icon: "ti-tag", label: "Project Categories" },
      { icon: "ti-link", label: "Project Links" },
      { icon: "ti-image", label: "Project Media" },

    ],
  },
];

const STATS = [
  { label: "Projects", value: "128", delta: "+12%", up: true },
  { label: "Clients", value: "48", delta: "+6%", up: true },
  { label: "Revenue", value: "$24,200", delta: "-2%", up: false },
];

const WORKS = [
  {
    title: "Brand Campaign",
    client: "Nike",
    status: "Completed",
  },
  {
    title: "Music Video",
    client: "Sony Music",
    status: "In Progress",
  },
  {
    title: "Fashion Shoot",
    client: "Zara",
    status: "Pending",
  },
];

const TEAM = [
  {
    name: "Alex Carter",
    role: "Creative Director",
  },
  {
    name: "Sophia Lee",
    role: "UI Designer",
  },
  {
    name: "James Walker",
    role: "Video Editor",
  },
];

const BADGE = {
  Completed:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  "In Progress":
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  Pending:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white dark:bg-[#181818] border border-[#ececec] dark:border-[#2a2a2a] rounded-3xl transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [colorTheme, setTheme] = useDarkMode();
  const dark = colorTheme === "light";

  const [activeNav, setActiveNav] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { settings } = useSettings();

  // useEffect(() => {
  //   checkAuthAndRedirect(navigate);
  // }, []);

  return (
    <div
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >

      <div className="flex min-h-screen bg-[#f6f6f7] dark:bg-[#111111] transition-all duration-300">

        {/* MOBILE OVERLAY */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`
            fixed lg:sticky z-50 lg:z-0
            top-0 left-0 h-[100dvh]
            w-[260px] min-w-[260px]
            bg-white dark:bg-[#0d0d0d]
            border-r border-gray-200 dark:border-[#232323]
            flex flex-col
            transition-transform duration-300
            ${sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          {/* Logo */}
          <div className="px-6 py-6 border-b border-gray-200 dark:border-[#232323]">
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">
                {/* Logo Image OR fallback */}
                <div className="w-11 h-11 rounded-2xl bg-black dark:bg-white flex items-center justify-center overflow-hidden">
                  {settings?.logo ? (
                    <img
                      src={`${BASE_URL}${settings.logo}`}
                      alt="logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white dark:text-black font-bold text-lg">
                      M
                    </span>
                  )}
                </div>

                <div>
                  <h1
                    style={{ fontFamily: "'Syne', sans-serif" }}
                    className="text-black dark:text-white text-[18px] font-bold"
                  >
                    MoonLight
                  </h1>

                  <p className="text-xs text-gray-500">
                    Admin
                  </p>
                </div>
              </div>

              {/* Close button mobile */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-black dark:text-white text-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            {NAV.map((section) => (
              <div key={section.grp}>

                <div className="space-y-2">
                  {section.items.map((item) => {
                    const isActive = activeNav === item.label;

                    return (
                      <button
                        key={item.label}
                        onClick={() => {
                          setActiveNav(item.label);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200
                        ${isActive
                            ? "bg-black text-white dark:bg-white dark:text-black shadow-lg"
                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1c1c1c] hover:text-black dark:hover:text-white"
                          }`}
                      >
                        <span className="font-medium text-sm">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-gray-200 dark:border-[#232323]">
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#181818] rounded-2xl p-3">
              <div className="w-10 h-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-semibold">
                A
              </div>
              <button
                onClick={() => {

                  // CLEAR TOKEN
                  localStorage.removeItem("token");

                  // OPTIONAL: clear everything
                  // localStorage.clear();

                  // REDIRECT
                  window.location.href = "/";
                }}
                className="
    w-full
    h-11
    rounded-2xl
    bg-black
    dark:bg-white
    text-white
    dark:text-black
    text-sm
    font-medium
    hover:opacity-80
    transition-all
    duration-300
  "
              >
                Logout
              </button>

              <div>
                <p className="text-black dark:text-white text-sm font-medium">
                  Admin
                </p>

                <p className="text-xs text-gray-500">
                  Super Admin
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 flex flex-col w-full min-w-0">

          {/* TOPBAR */}
          <div className="sticky top-0 z-40 h-[72px] bg-white/80 dark:bg-[#181818]/80 backdrop-blur-md border-b border-[#ececec] dark:border-[#2a2a2a] px-4 sm:px-6 flex items-center justify-between gap-4 transition-all duration-300">

            {/* LEFT */}
            <div className="flex items-center gap-4">

              {/* Mobile Menu */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-11 h-11 rounded-2xl bg-black text-white flex items-center justify-center"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div>
                <h1
                  style={{ fontFamily: "'Syne', sans-serif" }}
                  className="text-2xl sm:text-3xl font-bold text-black dark:text-white"
                >
                  Dashboard
                </h1>

              </div>
            </div>

            {/* RIGHT */}
            <button
              onClick={() => setTheme(colorTheme)}
              className="flex items-center justify-center gap-2 w-11 h-11 rounded-2xl bg-black text-white dark:bg-white dark:text-black transition-all duration-300 flex-shrink-0"
            >
              {dark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
              {/* {dark ? "Light Mode" : "Dark Mode"} */}
            </button>
          </div>

          {/* CONTENT AREA */}
          <div className="flex-1 bg-white dark:bg-black w-full relative">

            {activeNav === "Partners" && <AdminPartners />}
            {activeNav === "Settings" && <AdminSettings />}
            {activeNav === "Team" && <AdminTeam />}
            {activeNav === "Social Links" && <AdminSocialLinks />}
            {activeNav === "Projects" && <AdminProjects />}
            {activeNav === "News & Blogs" && <AdminNewsBlogs />}
            {activeNav === "Auditions" && <AdminAudition />}
            {activeNav === "Project Categories" && <AdminProjectCategories />}
            {activeNav === "Project Links" && <AdminProjectLinks />}
            {activeNav === "Project Media" && <AdminProjectMedia />}
            {activeNav === "Dashboard" && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Welcome to Admin Dashboard</h2>
              </div>
            )}
          </div>


        </main>
      </div>
    </div>
  );
}