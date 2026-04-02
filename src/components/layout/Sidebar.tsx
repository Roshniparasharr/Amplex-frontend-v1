import React from "react";
import { LayoutDashboard, FolderKanban, FileText, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const baseClass =
    "w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition";
  const activeClass = "bg-white/10 text-white";
  const inactiveClass = "text-slate-300 hover:bg-white/5 hover:text-white";

  return (
    <aside className="w-[260px] bg-[#0f172a] text-white flex flex-col border-r border-slate-800">
      <div className="px-6 py-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            A
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Amplex</h1>
            <p className="text-xs text-slate-400">AI Quotation Platform</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/quotes/new"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <FolderKanban size={18} />
          New Quote
        </NavLink>

        <button className={`${baseClass} ${inactiveClass}`}>
          <FileText size={18} />
          Templates
        </button>

        <button className={`${baseClass} ${inactiveClass}`}>
          <Settings size={18} />
          Settings
        </button>
      </nav>

      {/* <div className="mt-auto p-4">
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <p className="text-xs text-slate-400 mb-1">Environment</p>
          <p className="font-medium text-sm">Internal Demo</p>
          <p className="text-xs text-slate-500 mt-1">March 2026</p>
        </div>
      </div> */}
    </aside>
  );
}