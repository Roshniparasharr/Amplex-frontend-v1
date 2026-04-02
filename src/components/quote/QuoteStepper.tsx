import React from "react";
import { CheckCircle2 } from "lucide-react";

type QuoteStepperProps = {
  currentStep: number;
};

const steps = [
  "Intake",
  "Parse",
  "Engineering Review",
  "Supplier Connect",
];

export default function QuoteStepper({ currentStep }: QuoteStepperProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <div className="flex flex-wrap gap-6 items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isComplete = stepNumber < currentStep;

          return (
            <div key={step} className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  isComplete
                    ? "bg-green-100 text-green-700"
                    : isActive
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {isComplete ? <CheckCircle2 size={18} /> : stepNumber}
              </div>
              <span
                className={`text-sm font-medium ${
                  isActive ? "text-slate-900" : "text-slate-500"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}