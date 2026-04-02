import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/dashboard/StatCard";
import RecentQuotesTable from "../components/dashboard/RecentQuotesTable";
// import WorkflowSummary from "../components/dashboard/WorkflowSummary";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-[#0f172a] via-[#16213e] to-[#1d4ed8] text-white p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-blue-200 text-sm mb-2">AI-Assisted Quotation</p>
            <h3 className="text-3xl font-semibold tracking-tight mb-3">
              Turn unstructured RFQs into quote-ready data in minutes
            </h3>
            <p className="text-slate-200 text-sm leading-6">
              Upload customer emails, PDFs, images, or spreadsheets and convert
              them into structured cable specifications for engineering review.
            </p>
          </div>

          <button
            onClick={() => navigate("/quotes/new")}
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-3 rounded-2xl font-medium hover:bg-slate-100 transition shadow-lg"
          >
            <Plus size={18} />
            Start New Quote
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Open RFQs" value="18" change="+4 today" />
        <StatCard title="Indicative Quotes Sent" value="12" change="+7 this week" />
        <StatCard title="Awaiting Supplier Replies" value="7" change="2 overdue" />
        <StatCard title="Avg. Draft Time" value="18 min" change="-35% vs manual" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentQuotesTable />
        </div>
        {/* <WorkflowSummary /> */}
      </div>
    </div>
  );
}