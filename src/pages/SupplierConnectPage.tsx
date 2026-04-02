import React from "react";
import { ChevronRight, Send, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import QuoteStepper from "../components/quote/QuoteStepper";
import SupplierRFQPreview from "../components/quote/SupplierRFQPreview";
import { useAppSelector } from "../app/hooks";

export default function SupplierConnectPage() {
  const { parsedProjectMeta, supplierRFQItems } = useAppSelector(
    (state) => state.quote
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link to="/dashboard" className="hover:text-slate-700">
            Dashboard
          </Link>
          <ChevronRight size={14} />
          <Link to="/quotes/new" className="hover:text-slate-700">
            New Quote
          </Link>
          <ChevronRight size={14} />
          <Link to="/quotes/engineering-review" className="hover:text-slate-700">
            Engineering Review
          </Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-medium">Supplier Connect</span>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
          <Send size={16} />
          Dispatch to Supplier
        </button>
      </div>

      <QuoteStepper currentStep={4} />

      <div>
        <p className="text-sm text-slate-500">Supplier Connect</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Standardised Supplier RFQ
        </h1>
        <p className="text-slate-500 mt-2">
          Auto-generated RFQ package ready for supplier dispatch.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card label="Project" value={parsedProjectMeta?.projectName || "-"} />
        <Card label="Customer" value={parsedProjectMeta?.customerName || "-"} />
        <Card label="RFQ Items" value={supplierRFQItems.length.toString()} />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xl font-semibold">Supplier Dispatch</h3>
            <p className="text-sm text-slate-500 mt-1">
              Standardized RFQ email draft prepared for supplier issue.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
            <Mail size={16} />
            Preview Email
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 whitespace-pre-line">
{`Subject: RFQ – ${parsedProjectMeta?.projectName || "Project"} – Secondary Cable Supply

Dear Supplier,

Please provide your quotation for the attached approved cable specifications for the below project.

Project: ${parsedProjectMeta?.projectName || "-"}
Customer: ${parsedProjectMeta?.customerName || "-"}
Delivery Address: ${parsedProjectMeta?.deliveryAddress || "-"}

Please review the attached specification lines and return:
- unit pricing
- metal weight
- drum schedule
- BOM terms
- delivery terms

Regards,
Amplex Engineering`}
        </div>
      </div>

      <SupplierRFQPreview />
    </div>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <p className="text-sm text-slate-500 mb-2">{label}</p>
      <h3 className="text-xl font-semibold">{value}</h3>
    </div>
  );
}