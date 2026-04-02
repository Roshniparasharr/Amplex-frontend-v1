import React from "react";
import { ChevronRight, CheckCircle2, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import QuoteStepper from "../components/quote/QuoteStepper";
import EngineeringReviewPanel from "../components/quote/EngineeringReviewPanel";
import ParsedRFQTable from "../components/quote/ParsedRFQTable";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSupplierRFQItems } from "../app/features/quote/quoteSlice";

export default function EngineeringReviewPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { engineeringSuggestions, parsedProjectMeta, parsedLineItems } =
    useAppSelector((state) => state.quote);

  const approvedCount = engineeringSuggestions.filter((s) => s.approved).length;
  const totalQty = parsedLineItems.reduce((sum, item) => sum + item.qty, 0);

  const handleProceed = () => {
    dispatch(
      setSupplierRFQItems(
        engineeringSuggestions.map((s, index) => {
          const matchingLine = parsedLineItems.find((line) => line.id === s.lineItemId);

          return {
            id: `sup-${s.id}`,
            item: index + 1,
            supplierDescription: s.proposedConfiguration,
            qty: matchingLine?.qty || 0,
            standard: s.standard,
          };
        })
      )
    );

    navigate("/quotes/supplier-connect");
  };

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
          <span className="text-slate-900 font-medium">Engineering Review</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
            <Save size={16} />
            Save Changes
          </button>

          <button
            onClick={handleProceed}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <CheckCircle2 size={16} />
            Proceed to Supplier Connect
          </button>
        </div>
      </div>

      <QuoteStepper currentStep={3} />

      <div>
        <p className="text-sm text-slate-500">STEP 2 · KEY INNOVATION</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          AI Engineering Assistant
        </h1>
        <p className="text-slate-500 mt-2">
          Review extracted RFQ data, mapped standards, and AI-generated compliant configuration suggestions before Gate 1 approval.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SummaryCard label="Project" value={parsedProjectMeta?.projectName || "-"} />
        <SummaryCard label="Parsed Items" value={parsedLineItems.length.toString()} />
        <SummaryCard label="Total Quantity" value={totalQty.toLocaleString()} />
        <SummaryCard label="Approved Specs" value={approvedCount.toString()} />
      </div>

      <ParsedRFQTable />

      <EngineeringReviewPanel />
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <p className="text-sm text-slate-500 mb-2">{label}</p>
      <h3 className="text-2xl font-semibold">{value}</h3>
    </div>
  );
}