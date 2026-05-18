import { useState } from "react";
import useSettings from "../hooks/useSettings";
import useDarkMode from "../hooks/useDarkMode";
import { BASE_URL } from "../utils/api";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";

import {
  LayoutDashboard,
  Settings as SettingsIcon,
  Users,
  Link as LinkIcon,
  Handshake,
  Briefcase,
  Newspaper,
  Mic,
  Tag,
  Link2,
  UserCog,
  Image as ImageIcon
} from "lucide-react";

const NAV = [
  {
    grp: "Main",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
      { icon: SettingsIcon, label: "Settings", path: "/admin/settings" },
      { icon: LinkIcon, label: "Social Links", path: "/admin/social-links" },
      { icon: Users, label: "Team", path: "/admin/team" },
      { icon: Handshake, label: "Partners", path: "/admin/partners" },
      { icon: Tag, label: "Project Categories", path: "/admin/project-categories" },
      { icon: Briefcase, label: "Projects", path: "/admin/projects" },
      { icon: Link2, label: "Project Links", path: "/admin/project-links" },
      { icon: ImageIcon, label: "Project Media", path: "/admin/project-media" },
      { icon: Newspaper, label: "News & Blogs", path: "/admin/news-blogs" },
      { icon: Mic, label: "Auditions", path: "/admin/auditions" },
      { icon: UserCog, label: "Profile", path: "/admin/profile" },
    ],
  },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [token, location.pathname, navigate]);

  const [colorTheme, setTheme] = useDarkMode();
  const dark = colorTheme === "light";

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { settings } = useSettings();

  const activeNavItem = NAV[0].items.find(item => item.path === location.pathname);
  const pageTitle = activeNavItem ? activeNavItem.label : "Dashboard";

  if (!token) {
    return null; // Prevent flash of content before redirect
  }

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif" }}>
      <div className="flex h-screen overflow-hidden bg-[#f6f6f7] dark:bg-[#111111] transition-all duration-300">        {/* MOBILE OVERLAY */}
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
                    const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);

                    return (
                      <button
                        key={item.label}
                        onClick={() => {
                          navigate(item.path);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200
                        ${isActive
                            ? "bg-black text-white dark:bg-white dark:text-black shadow-lg"
                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1c1c1c] hover:text-black dark:hover:text-white"
                          }`}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
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
              <button
                onClick={() => {
                  localStorage.removeItem("token");
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
                  {pageTitle}
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
            </button>
          </div>

          {/* CONTENT AREA */}
          <div className="flex-1 overflow-y-auto bg-[#f6f6f7] dark:bg-[#111111] w-full relative">            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
