import React from "react";
import useTeamMembers from "../hooks/useTeamMembers";
import useProjects from "../hooks/useProjects";
import usePartners from "../hooks/usePartners";
import useProjectCategories from "../hooks/useProjectCategories";
import { Users, FolderGit2, Handshake, Tags } from "lucide-react";

export default function AdminDashboard() {
  const { members } = useTeamMembers();
  const { projects } = useProjects();
  const { partners } = usePartners();
  const { categories } = useProjectCategories();

  const stats = [
    {
      label: "Total Team Members",
      value: members?.length || 0,
      icon: Users,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      label: "Total Projects",
      value: projects?.length || 0,
      icon: FolderGit2,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      label: "Total Partners",
      value: partners?.length || 0,
      icon: Handshake,
      color: "bg-green-500/10 text-green-500",
    },
    {
      label: "Total Project Categories",
      value: categories?.length || 0,
      icon: Tags,
      color: "bg-orange-500/10 text-orange-500",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white dark:bg-black transition-all duration-300">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-black dark:text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
          Dashboard Overview
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-[#f7f7f7] dark:bg-[#111111] border border-[#e5e5e5] dark:border-[#222222] rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-gray-600 dark:text-gray-400 font-medium text-sm md:text-base leading-tight">
                  {stat.label}
                </h3>
              </div>
              <div>
                <span className="text-4xl md:text-5xl font-bold text-black dark:text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {stat.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}