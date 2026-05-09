import { useState } from "react";

const NAV = [
  {
    grp: "Main",
    items: [
      { icon: "ti-layout-dashboard", label: "Dashboard" },
      { icon: "ti-users", label: "Team" },
      { icon: "ti-briefcase", label: "Works" },
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
  const [dark, setDark] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={dark ? "dark" : ""}
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >

      <div className="flex h-screen overflow-hidden bg-[#f6f6f7] dark:bg-[#111111] transition-all duration-300">

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
            fixed lg:relative z-50 lg:z-0
            top-0 left-0 h-full
            w-[260px] min-w-[260px]
            bg-[#111111] dark:bg-[#0d0d0d]
            border-r border-[#232323]
            flex flex-col
            transition-transform duration-300
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          {/* Logo */}
          <div className="px-6 py-6 border-b border-[#232323]">
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white text-black flex items-center justify-center font-bold text-lg">
                  M
                </div>

                <div>
                  <h1
                    style={{ fontFamily: "'Syne', sans-serif" }}
                    className="text-white text-[18px] font-bold"
                  >
                    MoonLight
                  </h1>

                  <p className="text-xs text-gray-500">
                    Motion Admin
                  </p>
                </div>
              </div>

              {/* Close button mobile */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white text-xl"
              >
                <i className="ti ti-x" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            {NAV.map((section) => (
              <div key={section.grp}>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-4 px-2">
                  {section.grp}
                </p>

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
                        ${
                          isActive
                            ? "bg-white text-black shadow-lg"
                            : "text-gray-400 hover:bg-[#1c1c1c] hover:text-white"
                        }`}
                      >
                        <i className={`ti ${item.icon} text-lg`} />

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
          <div className="p-4 border-t border-[#232323]">
            <div className="flex items-center gap-3 bg-[#181818] rounded-2xl p-3">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-semibold">
                A
              </div>

              <div>
                <p className="text-white text-sm font-medium">
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
        <main className="flex-1 flex flex-col overflow-hidden w-full">

          {/* TOPBAR */}
          <div className="h-auto min-h-[72px] bg-white dark:bg-[#181818] border-b border-[#ececec] dark:border-[#2a2a2a] px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-300">

            {/* LEFT */}
            <div className="flex items-center gap-4">

              {/* Mobile Menu */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-11 h-11 rounded-2xl bg-black text-white flex items-center justify-center"
              >
                <i className="ti ti-menu-2 text-xl" />
              </button>

              <div>
                <h1
                  style={{ fontFamily: "'Syne', sans-serif" }}
                  className="text-2xl sm:text-3xl font-bold text-black dark:text-white"
                >
                  Dashboard
                </h1>

                <p className="text-sm text-gray-500">
                  Welcome back, Admin
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <button
              onClick={() => setDark(!dark)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black transition-all duration-300 w-full sm:w-auto"
            >
              <i className={`ti ${dark ? "ti-sun" : "ti-moon"}`} />

              {dark ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {STATS.map((item) => (
                <Card key={item.label} className="p-5 sm:p-6">

                  <p className="text-sm text-gray-500 mb-2">
                    {item.label}
                  </p>

                  <h2
                    style={{ fontFamily: "'Syne', sans-serif" }}
                    className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-2 break-words"
                  >
                    {item.value}
                  </h2>

                  <div
                    className={`text-sm font-medium ${
                      item.up
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {item.delta} this month
                  </div>
                </Card>
              ))}
            </div>

            {/* TEAM + WORKS */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

              {/* TEAM */}
              <Card>
                <div className="p-5 sm:p-6 border-b border-[#ececec] dark:border-[#2a2a2a]">
                  <h2
                    style={{ fontFamily: "'Syne', sans-serif" }}
                    className="text-xl font-bold text-black dark:text-white"
                  >
                    Team
                  </h2>
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  {TEAM.map((member) => (
                    <div
                      key={member.name}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-[#f8f8f8] dark:bg-[#202020]"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-semibold flex-shrink-0">
                        {member.name.charAt(0)}
                      </div>

                      <div className="min-w-0">
                        <p className="font-medium text-black dark:text-white truncate">
                          {member.name}
                        </p>

                        <p className="text-sm text-gray-500 truncate">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* WORKS */}
              <Card>
                <div className="p-5 sm:p-6 border-b border-[#ececec] dark:border-[#2a2a2a]">
                  <h2
                    style={{ fontFamily: "'Syne', sans-serif" }}
                    className="text-xl font-bold text-black dark:text-white"
                  >
                    Works
                  </h2>
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  {WORKS.map((work) => (
                    <div
                      key={work.title}
                      className="p-4 rounded-2xl bg-[#f8f8f8] dark:bg-[#202020]"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                        <div className="min-w-0">
                          <p className="font-medium text-black dark:text-white truncate">
                            {work.title}
                          </p>

                          <p className="text-sm text-gray-500 truncate">
                            {work.client}
                          </p>
                        </div>

                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium w-fit ${BADGE[work.status]}`}
                        >
                          {work.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}