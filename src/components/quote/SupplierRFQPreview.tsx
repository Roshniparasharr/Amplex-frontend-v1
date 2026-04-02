import React from "react";
import { useAppSelector } from "../../app/hooks";

export default function SupplierRFQPreview() {
  const supplierRFQItems = useAppSelector((state) => state.quote.supplierRFQItems);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-semibold">Supplier RFQ Preview</h3>
          <p className="text-sm text-slate-500 mt-1">
            Approved specifications transformed into standardized supplier RFQ lines.
          </p>
        </div>

        <div className="text-sm text-slate-500">
          {supplierRFQItems.length} supplier line{supplierRFQItems.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Item</th>
              <th className="px-4 py-3 font-medium">Supplier Description</th>
              <th className="px-4 py-3 font-medium">Qty</th>
              <th className="px-4 py-3 font-medium">Standard</th>
            </tr>
          </thead>
          <tbody>
            {supplierRFQItems.map((item) => (
              <tr key={item.id} className="border-t border-slate-200">
                <td className="px-4 py-4 font-medium text-slate-900">{item.item}</td>
                <td className="px-4 py-4 text-slate-700">{item.supplierDescription}</td>
                <td className="px-4 py-4 text-slate-700">{item.qty}</td>
                <td className="px-4 py-4 text-slate-700">{item.standard}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}