import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  approveEngineeringSuggestion,
  updateEngineeringSuggestion,
} from "../../app/features/quote/quoteSlice";

export default function EngineeringReviewPanel() {
  const dispatch = useAppDispatch();
  const suggestions = useAppSelector((state) => state.quote.engineeringSuggestions);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold">AI Engineering Assistant</h3>
        <p className="text-sm text-slate-500 mt-1">
          Standards-aligned cable configuration suggestions generated from parsed RFQ data.
          Engineers can review, edit, and approve each proposed specification.
        </p>
      </div>

      <div className="space-y-6">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-sm text-slate-500">RFQ Line {suggestion.lineItemId}</p>
                <h4 className="text-lg font-semibold text-slate-900 mt-1">
                  Proposed Standards-Aligned Configuration
                </h4>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  suggestion.approved
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {suggestion.approved ? "Approved" : "Pending Engineer Review"}
              </span>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <ReadBlock
                label="Original Parsed Description"
                value={suggestion.originalDescription}
              />

              <EditBlock
                label="AI Suggested Description"
                value={suggestion.suggestedDescription}
                onChange={(value) =>
                  dispatch(
                    updateEngineeringSuggestion({
                      id: suggestion.id,
                      field: "suggestedDescription",
                      value,
                    })
                  )
                }
              />

              <EditBlock
                label="Proposed Configuration"
                value={suggestion.proposedConfiguration}
                onChange={(value) =>
                  dispatch(
                    updateEngineeringSuggestion({
                      id: suggestion.id,
                      field: "proposedConfiguration",
                      value,
                    })
                  )
                }
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EditBlock
                  label="Mapped Standard"
                  value={suggestion.standard}
                  onChange={(value) =>
                    dispatch(
                      updateEngineeringSuggestion({
                        id: suggestion.id,
                        field: "standard",
                        value,
                      })
                    )
                  }
                />

                <EditBlock
                  label="Clause Reference"
                  value={suggestion.clauseReference}
                  onChange={(value) =>
                    dispatch(
                      updateEngineeringSuggestion({
                        id: suggestion.id,
                        field: "clauseReference",
                        value,
                      })
                    )
                  }
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-medium text-slate-700 mb-3">Detected Gaps / Ambiguities</p>
              {suggestion.gaps.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2 text-sm text-amber-700">
                  {suggestion.gaps.map((gap) => (
                    <li key={gap}>{gap}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-green-700">No gaps detected for this line item.</p>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => dispatch(approveEngineeringSuggestion(suggestion.id))}
                className="px-5 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Approve Spec
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReadBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 min-h-[88px]">
        {value}
      </div>
    </div>
  );
}

function EditBlock({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 resize-none"
      />
    </div>
  );
}