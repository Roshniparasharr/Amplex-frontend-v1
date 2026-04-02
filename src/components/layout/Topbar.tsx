import React from "react";
import { Search, Bell, UserCircle2 } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Topbar() {
  const location = useLocation();

  let title = "Quotation Dashboard";
  let subtitle = "Monitor RFQs, indicative pricing, and engineer approvals.";

  if (location.pathname === "/quotes/new") {
    title = "Create New Quote";
    subtitle = "Upload customer RFQs or enter quote details manually.";
  } else if (location.pathname === "/quotes/engineering-review") {
    title = "AI Engineering Assistant";
    subtitle =
      "Review AI standards-aligned configurations and approve specifications.";
  } else if (location.pathname === "/quotes/supplier-connect") {
    title = "Supplier Connect";
    subtitle =
      "Review the standardized supplier RFQ and dispatch to selected suppliers.";
  } else if (location.pathname.startsWith("/quotes/")) {
    title = "Quote Details";
    subtitle = "Review quote details and progress through approval gates.";
  }

  return (
    <header className="h-[76px] bg-white border-b border-slate-200 px-8 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 w-[280px]">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search RFQs, customers..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        <button className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition">
          <Bell size={18} className="text-slate-600" />
        </button>

        <div className="flex items-center gap-3 pl-2">
          <UserCircle2 size={34} className="text-slate-500" />
          <div className="hidden md:block">
            <p className="text-sm font-medium">Roshni</p>
            <p className="text-xs text-slate-500">Engineering / Commercial</p>
          </div>
        </div>
      </div>
    </header>
  );
}