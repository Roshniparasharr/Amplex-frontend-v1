import React from "react";
import { ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import QuoteStepper from "../components/quote/QuoteStepper";
import IntakeTabs from "../components/quote/IntakeTabs";
import UploadTab from "../components/quote/UploadTab";
import PasteEmailTab from "../components/quote/PasteEmailTab";
import ManualEntryTab from "../components/quote/ManualEntryTab";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  resetQuote,
  setActiveTab,
  setEmailContent,
  setParseStatus,
  setParsedLineItems,
  setParsedProjectMeta,
  setEngineeringSuggestions,
} from "../app/features/quote/quoteSlice";

export default function NewQuotePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { activeTab, emailContent, currentStep, files } = useAppSelector(
    (state) => state.quote
  );

  const handleParse = () => {
    dispatch(setParseStatus("processing"));

    setTimeout(() => {
      dispatch(
        setParsedProjectMeta({
          customerName: "Consolidated Power Projects Australia Pty Ltd",
          contactName: "Harry Armstrong",
          company: "CPP",
          projectName: "Elaine BESS Project",
          deliveryAddress: "Unnamed Road, Elaine, 3334, VIC",
          gpsCoordinates: "-37.732146, 144.009274",
          warranty: "48 Months",
          specialRequirements: [
            "Non-Propagator of Fire",
            "Low Smoke Emissions",
            "Enhanced Resistance to heat and fire",
          ],
        })
      );

      dispatch(
        setParsedLineItems([
          {
            id: "1",
            item: 1,
            description:
              "Power Cable Cu(Cl2)/V-90/5V-90/CTS/5V-90 (White)/(Black) 0.6/1kV",
            cores: "20C1.5",
            qty: 400,
            confidence: 98,
          },
          {
            id: "2",
            item: 2,
            description:
              "Power Cable Cu(Cl2)/V-90/5V-90/CTS/5V-90 (White)/(Black) 0.6/1kV",
            cores: "12C2.5",
            qty: 550,
            confidence: 97,
          },
          {
            id: "3",
            item: 3,
            description:
              "Power Cable Cu(Cl2)/X-90/5V-90/CTS/5V-90 (Red,White,Blue,Black)/(OrangeUV) 0.6/1kV",
            cores: "4C16",
            qty: 2100,
            confidence: 94,
          },
          {
            id: "4",
            item: 4,
            description:
              "Power Cable Cu(Cl2)/X-90/5V-90/CTS/5V-90 (Red/Black)/(Orange) 0.6/1kV",
            cores: "2C10",
            qty: 2200,
            confidence: 93,
          },
        ])
      );

      dispatch(
        setEngineeringSuggestions([
          {
            id: "eng-1",
            lineItemId: "1",
            originalDescription:
              "Power Cable Cu(Cl2)/V-90/5V-90/CTS/5V-90 (White)/(Black) 0.6/1kV",
            suggestedDescription:
              "Power Cable Cu(Cl2)/V-90/5V-90/CTS/5V-90 (White)/(Black) 0.6/1kV",
            proposedConfiguration: "20C1.5mm² Cu X-90 0.6/1kV CTS",
            standard: "AS/NZS 5000.1",
            clauseReference: "Clause 3.2 / 3.4",
            gaps: [],
            approved: false,
          },
          {
            id: "eng-2",
            lineItemId: "2",
            originalDescription:
              "Power Cable Cu(Cl2)/V-90/5V-90/CTS/5V-90 (White)/(Black) 0.6/1kV",
            suggestedDescription:
              "Power Cable Cu(Cl2)/V-90/5V-90/CTS/5V-90 (White)/(Black) 0.6/1kV",
            proposedConfiguration: "12C2.5mm² Cu X-90 0.6/1kV CTS",
            standard: "AS/NZS 5000.1",
            clauseReference: "Clause 3.2 / 3.4",
            gaps: [],
            approved: false,
          },
          {
            id: "eng-3",
            lineItemId: "3",
            originalDescription:
              "Power Cable Cu(Cl2)/X-90/5V-90/CTS/5V-90 (Red,White,Blue,Black)/(OrangeUV) 0.6/1kV",
            suggestedDescription:
              "Power Cable Cu(Cl2)/X-90/5V-90/CTS/5V-90 (Red,White,Blue,Black)/(OrangeUV) 0.6/1kV",
            proposedConfiguration: "4C16mm² Cu X-90 0.6/1kV CTS Orange UV",
            standard: "AS/NZS 5000.1",
            clauseReference: "Clause 3.5",
            gaps: ["Confirm UV sheath colour coding"],
            approved: false,
          },
          {
            id: "eng-4",
            lineItemId: "4",
            originalDescription:
              "Power Cable Cu(Cl2)/X-90/5V-90/CTS/5V-90 (Red/Black)/(Orange) 0.6/1kV",
            suggestedDescription:
              "Power Cable Cu(Cl2)/X-90/5V-90/CTS/5V-90 (Red/Black)/(Orange) 0.6/1kV",
            proposedConfiguration: "2C10mm² Cu X-90 0.6/1kV CTS Orange",
            standard: "AS/NZS 5000.1",
            clauseReference: "Clause 3.5",
            gaps: [],
            approved: false,
          },
        ])
      );

      dispatch(setParseStatus("success"));
      navigate("/quotes/engineering-review");
    }, 1200);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link to="/dashboard" className="hover:text-slate-700">
            Dashboard
          </Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-medium">New Quote</span>
        </div>

        <button
          onClick={() => dispatch(resetQuote())}
          className="px-4 py-2 rounded-xl border border-slate-300 text-sm text-slate-700 hover:bg-slate-50 transition"
        >
          Reset Draft
        </button>
      </div>

      <QuoteStepper currentStep={currentStep} />

      <div>
        <h3 className="text-2xl font-semibold mb-2">Quote Intake</h3>
        <p className="text-slate-500">
          Upload RFQ files, paste customer email content, or enter details manually.
        </p>
      </div>

      <IntakeTabs
        activeTab={activeTab}
        setActiveTab={(tab) => dispatch(setActiveTab(tab))}
      />

      {activeTab === "upload" && <UploadTab onParse={handleParse} />}

      {activeTab === "email" && (
        <PasteEmailTab
          emailContent={emailContent}
          setEmailContent={(value) => dispatch(setEmailContent(value))}
          onParse={handleParse}
        />
      )}

      {activeTab === "manual" && <ManualEntryTab />}

      {activeTab === "upload" && files.length > 0 && (
        <div className="text-sm text-slate-500">
          {files.length} file{files.length > 1 ? "s" : ""} selected and ready to process
        </div>
      )}
    </div>
  );
}