import React from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function QuoteDetailPage() {
  const { id } = useParams();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/dashboard" className="hover:text-slate-700">
          Dashboard
        </Link>
        <ChevronRight size={14} />
        <span>Quotes</span>
        <ChevronRight size={14} />
        <span className="text-slate-900 font-medium">{id}</span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        <h1 className="text-2xl font-semibold mb-2">Quote {id}</h1>
        <p className="text-slate-500">
          This is a placeholder detail page. Next we can build:
        </p>

        <ul className="list-disc ml-6 mt-4 text-slate-700 space-y-2">
          <li>engineering review summary</li>
          <li>supplier comparison table</li>
          <li>indicative vs final pricing</li>
          <li>approval gates</li>
          <li>audit trail and document timeline</li>
        </ul>
      </div>
    </div>
  );
}