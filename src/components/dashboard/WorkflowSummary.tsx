import React from "react";

function WorkflowStep({
  title,
  subtitle,
  active = false,
}: {
  title: string;
  subtitle: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        active
          ? "border-blue-200 bg-blue-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <p className="font-medium text-slate-900">{title}</p>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>
  );
}

export default function WorkflowSummary() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-1">Workflow Summary</h3>
      <p className="text-sm text-slate-500 mb-6">
        Typical quote progression through the AI-assisted flow
      </p>

      <div className="space-y-4">
        <WorkflowStep title="RFQ Intake" subtitle="Email, PDF, image, Excel" active />
        <WorkflowStep title="RFQ Parsing" subtitle="Structured extraction" />
        <WorkflowStep title="Engineering Review" subtitle="Standards & spec alignment" />
        <WorkflowStep title="Indicative Pricing" subtitle="Live pricing engine" />
        <WorkflowStep title="Supplier Confirmation" subtitle="Final price and spec validation" />
      </div>
    </div>
  );
}