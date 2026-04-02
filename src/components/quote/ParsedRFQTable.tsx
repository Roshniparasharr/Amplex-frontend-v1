import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateParsedLineItem } from "../../app/features/quote/quoteSlice";

export default function ParsedRFQTable() {
  const dispatch = useAppDispatch();
  const parsedLineItems = useAppSelector((state) => state.quote.parsedLineItems);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-semibold">Parsed RFQ Line Items</h3>
          <p className="text-sm text-slate-500 mt-1">
            Review and edit the structured items extracted from the customer RFQ before engineering approval.
          </p>
        </div>

        <div className="text-sm text-slate-500">
          {parsedLineItems.length} item{parsedLineItems.length !== 1 ? "s" : ""} parsed
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Item</th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">Cores</th>
              <th className="px-4 py-3 font-medium">Qty</th>
              <th className="px-4 py-3 font-medium">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {parsedLineItems.map((item) => (
              <tr key={item.id} className="border-t border-slate-200 align-top">
                <td className="px-4 py-4 font-medium text-slate-900">{item.item}</td>

                <td className="px-4 py-4">
                  <textarea
                    value={item.description}
                    onChange={(e) =>
                      dispatch(
                        updateParsedLineItem({
                          id: item.id,
                          field: "description",
                          value: e.target.value,
                        })
                      )
                    }
                    rows={3}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 resize-none"
                  />
                </td>

                <td className="px-4 py-4">
                  <input
                    type="text"
                    value={item.cores}
                    onChange={(e) =>
                      dispatch(
                        updateParsedLineItem({
                          id: item.id,
                          field: "cores",
                          value: e.target.value,
                        })
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                  />
                </td>

                <td className="px-4 py-4">
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(
                        updateParsedLineItem({
                          id: item.id,
                          field: "qty",
                          value: Number(e.target.value),
                        })
                      )
                    }
                    className="w-28 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                  />
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      (item.confidence || 0) >= 95
                        ? "bg-green-100 text-green-700"
                        : (item.confidence || 0) >= 85
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.confidence || 0}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}