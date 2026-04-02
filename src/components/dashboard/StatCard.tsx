import React from "react";

type StatCardProps = {
  title: string;
  value: string;
  change: string;
};

export default function StatCard({ title, value, change }: StatCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="text-3xl font-semibold tracking-tight mt-3">{value}</h3>
      <p className="text-sm text-emerald-600 mt-2">{change}</p>
    </div>
  );
}