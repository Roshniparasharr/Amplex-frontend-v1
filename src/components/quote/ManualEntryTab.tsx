import React from "react";

export default function ManualEntryTab() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">
      <h3 className="text-xl font-semibold mb-2">Manual Quote Entry</h3>
      <p className="text-sm text-slate-500 mb-6">
        Enter known RFQ details directly when structured information is already available.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input label="Customer Name" placeholder="e.g. Origin Energy" />
        <Input label="RFQ Reference" placeholder="e.g. RFQ-2026-019" />
        <Input label="Voltage Rating" placeholder="e.g. 0.6/1kV" />
        <Input label="Number of Cores" placeholder="e.g. 4 Core" />
        <Input label="Conductor Size" placeholder="e.g. 10 mm²" />
        <Input label="Insulation Type" placeholder="e.g. XLPE" />
        <Input label="Sheath Type" placeholder="e.g. PVC" />
        <Input label="Quantity" placeholder="e.g. 500m" />
      </div>

      <div className="mt-5">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Notes / Special Requirements
        </label>
        <textarea
          rows={5}
          placeholder="Add project details, standards requirements, delivery notes, or customer requests..."
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 resize-none"
        />
      </div>

      <div className="mt-5 flex justify-end">
        <button className="bg-blue-600 text-white px-5 py-3 rounded-2xl hover:bg-blue-700 transition">
          Save Manual Draft
        </button>
      </div>
    </div>
  );
}

function Input({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
      />
    </div>
  );
}