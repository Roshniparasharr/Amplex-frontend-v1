import React from "react";
import { ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import QuoteStepper from "../components/quote/QuoteStepper";
import IntakeTabs from "../components/quote/IntakeTabs";
import UploadTab from "../components/quote/UploadTab";
import PasteEmailTab from "../components/quote/PasteEmailTab";
import ManualEntryTab from "../components/quote/ManualEntryTab";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { uploadRfqFile, validateStandards } from "../app/services/quoteApi";
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

  const handleParse = async () => {
    if (files.length === 0) return;

    dispatch(setParseStatus("processing"));

    try {
      const uploadResult = await uploadRfqFile(files[0].file);

      dispatch(
        setParsedProjectMeta({
          customerName: uploadResult.spec?.customer?.name || "",
          contactName: "",
          company: "",
          projectName: uploadResult.spec?.project_ref || "",
          deliveryAddress: uploadResult.spec?.customer?.site_address || "",
          gpsCoordinates: "",
          warranty: "",
          specialRequirements: uploadResult.spec?.special_requirements || [],
        })
      );

      dispatch(
        setParsedLineItems(
          (uploadResult.spec?.line_items || []).map((item: any, index: number) => ({
            id: item.line_ref || `${index + 1}`,
            item: index + 1,
            description: item.raw_description || "",
            cores:
              item.cores && item.csa_mm2
                ? `${item.cores}C${item.csa_mm2}`
                : item.cores
                ? String(item.cores)
                : "",
            qty: item.quantity_m || 0,
            confidence: item.confidence ? Math.round(item.confidence * 100) : 0,
          }))
        )
      );

      const validateResult = await validateStandards(
        uploadResult.quote_id,
        uploadResult.spec
      );

      dispatch(
        setEngineeringSuggestions(
          (validateResult.validation?.line_items || []).map(
            (item: any, index: number) => ({
              id: `eng-${index + 1}`,
              lineItemId: item.line_ref || "",
              originalDescription:
                uploadResult.spec?.line_items?.find(
                  (line: any) => line.line_ref === item.line_ref
                )?.raw_description || "",
              suggestedDescription: item.standardised_description || "",
              proposedConfiguration: item.standardised_description || "",
              standard: "AS/NZS 5000.1",
              clauseReference:
                item.warnings && item.warnings.length > 0
                  ? "Review warnings"
                  : "Standard validation passed",
              gaps: [...(item.issues || []), ...(item.warnings || [])],
              approved: false,
            })
          )
        )
      );

      dispatch(setParseStatus("success"));
      navigate("/quotes/engineering-review");
    } catch (error) {
      console.error("API Error:", error);
      dispatch(setParseStatus("error"));
    }
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