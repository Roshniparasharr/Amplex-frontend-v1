import React from "react";
import { useNavigate } from "react-router-dom";

type StageColor = "amber" | "green" | "blue" | "purple";

function TableRow({
  id,
  customer,
  stage,
  owner,
  date,
  stageColor,
  onClick,
}: {
  id: string;
  customer: string;
  stage: string;
  owner: string;
  date: string;
  stageColor: StageColor;
  onClick: () => void;
}) {
  const colorMap = {
    amber: "bg-amber-100 text-amber-700",
    green: "bg-emerald-100 text-emerald-700",
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-violet-100 text-violet-700",
  };

  return (
    <tr
      onClick={onClick}
      className="border-t border-slate-200 hover:bg-slate-50 transition cursor-pointer"
    >
      <td className="px-6 py-4 font-medium">{id}</td>
      <td className="px-6 py-4">{customer}</td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorMap[stageColor]}`}>
          {stage}
        </span>
      </td>
      <td className="px-6 py-4">{owner}</td>
      <td className="px-6 py-4 text-slate-500">{date}</td>
    </tr>
  );
}

export default function RecentQuotesTable() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm">
      <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Recent Quotes</h3>
          <p className="text-sm text-slate-500">
            Latest RFQs across engineering and commercial workflows
          </p>
        </div>
        <button
          onClick={() => navigate("/quotes/new")}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          New Quote
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500 bg-slate-50">
            <tr>
              <th className="px-6 py-4 font-medium">RFQ ID</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Stage</th>
              <th className="px-6 py-4 font-medium">Owner</th>
              <th className="px-6 py-4 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            <TableRow
              id="RFQ-1024"
              customer="BHP Electrical"
              stage="Awaiting Supplier"
              owner="A. Smith"
              date="30 Mar 2026"
              stageColor="amber"
              onClick={() => navigate("/quotes/RFQ-1024")}
            />
            <TableRow
              id="RFQ-1023"
              customer="Origin Energy"
              stage="Indicative Sent"
              owner="Roshni"
              date="30 Mar 2026"
              stageColor="green"
              onClick={() => navigate("/quotes/RFQ-1023")}
            />
            <TableRow
              id="RFQ-1022"
              customer="AusGrid Projects"
              stage="Draft Review"
              owner="K. Patel"
              date="29 Mar 2026"
              stageColor="blue"
              onClick={() => navigate("/quotes/RFQ-1022")}
            />
            <TableRow
              id="RFQ-1021"
              customer="APA Infrastructure"
              stage="Parsed"
              owner="Roshni"
              date="29 Mar 2026"
              stageColor="purple"
              onClick={() => navigate("/quotes/RFQ-1021")}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}