import React from "react";
import { IntakeTab } from "../../app/features/quote/types";

type IntakeTabsProps = {
  activeTab: IntakeTab;
  setActiveTab: (tab: IntakeTab) => void;
};

export default function IntakeTabs({
  activeTab,
  setActiveTab,
}: IntakeTabsProps) {
  const tabs: IntakeTab[] = ["upload", "email", "manual"];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-2 inline-flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition ${
            activeTab === tab
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {tab === "upload"
            ? "Upload File"
            : tab === "email"
            ? "Paste Email"
            : "Manual Entry"}
        </button>
      ))}
    </div>
  );
}