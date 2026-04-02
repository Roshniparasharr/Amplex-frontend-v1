import React from "react";

type PasteEmailTabProps = {
  emailContent: string;
  setEmailContent: (value: string) => void;
  onParse: () => void;
};

export default function PasteEmailTab({
  emailContent,
  setEmailContent,
  onParse,
}: PasteEmailTabProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">
      <h3 className="text-xl font-semibold mb-2">Paste Customer Email</h3>
      <p className="text-sm text-slate-500 mb-6">
        Paste raw customer email content here and extract cable requirements automatically.
      </p>

      <textarea
        rows={12}
        value={emailContent}
        onChange={(e) => setEmailContent(e.target.value)}
        placeholder="Paste customer RFQ email here..."
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 resize-none"
      />

      <div className="mt-5 flex justify-end">
        <button
          onClick={onParse}
          disabled={!emailContent.trim()}
          className="bg-blue-600 text-white px-5 py-3 rounded-2xl hover:bg-blue-700 transition disabled:opacity-50"
        >
          Parse Email Content
        </button>
      </div>
    </div>
  );
}