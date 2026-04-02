import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  EngineeringSuggestion,
  IntakeTab,
  ParseStatus,
  ParsedLineItem,
  ParsedProjectMeta,
  QuoteFile,
  QuoteState,
  SupplierRFQItem,
} from "./types";

const initialState: QuoteState = {
  currentStep: 1,
  activeTab: "upload",

  files: [],
  emailContent: "",

  parseStatus: "idle",
  parsedProjectMeta: null,
  parsedLineItems: [],

  engineeringSuggestions: [],
  supplierRFQItems: [],
};

const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    // -----------------------------
    // Intake
    // -----------------------------
    setActiveTab: (state, action: PayloadAction<IntakeTab>) => {
      state.activeTab = action.payload;
      state.currentStep = 2;
    },

    addFiles: (state, action: PayloadAction<QuoteFile[]>) => {
      state.files.push(...action.payload);
    },

    removeFile: (state, action: PayloadAction<string>) => {
      state.files = state.files.filter((file) => file.id !== action.payload);
    },

    clearFiles: (state) => {
      state.files = [];
    },

    setEmailContent: (state, action: PayloadAction<string>) => {
      state.emailContent = action.payload;
    },

    // -----------------------------
    // Parse
    // -----------------------------
    setParseStatus: (state, action: PayloadAction<ParseStatus>) => {
      state.parseStatus = action.payload;
    },

    setParsedProjectMeta: (
      state,
      action: PayloadAction<ParsedProjectMeta>
    ) => {
      state.parsedProjectMeta = action.payload;
    },

    setParsedLineItems: (state, action: PayloadAction<ParsedLineItem[]>) => {
      state.parsedLineItems = action.payload;
    },

    updateParsedLineItem: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof ParsedLineItem;
        value: string | number;
      }>
    ) => {
      const { id, field, value } = action.payload;

      const item = state.parsedLineItems.find((lineItem) => lineItem.id === id);

      if (!item) return;

      (item[field] as ParsedLineItem[keyof ParsedLineItem]) = value as never;
    },

    // -----------------------------
    // Engineering Review
    // -----------------------------
    setEngineeringSuggestions: (
      state,
      action: PayloadAction<EngineeringSuggestion[]>
    ) => {
      state.engineeringSuggestions = action.payload;
      state.currentStep = 3;
    },

    updateEngineeringSuggestion: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof EngineeringSuggestion;
        value: string | boolean | string[];
      }>
    ) => {
      const { id, field, value } = action.payload;

      const suggestion = state.engineeringSuggestions.find(
        (item) => item.id === id
      );

      if (!suggestion) return;

      (
        suggestion[field] as EngineeringSuggestion[keyof EngineeringSuggestion]
      ) = value as never;
    },

    approveEngineeringSuggestion: (
      state,
      action: PayloadAction<string>
    ) => {
      const suggestion = state.engineeringSuggestions.find(
        (item) => item.id === action.payload
      );

      if (!suggestion) return;

      suggestion.approved = true;
    },

    // -----------------------------
    // Supplier Connect
    // -----------------------------
    setSupplierRFQItems: (
      state,
      action: PayloadAction<SupplierRFQItem[]>
    ) => {
      state.supplierRFQItems = action.payload;
      state.currentStep = 4;
    },

    // -----------------------------
    // Reset
    // -----------------------------
    resetQuote: () => initialState,
  },
});

export const {
  setActiveTab,
  addFiles,
  removeFile,
  clearFiles,
  setEmailContent,
  setParseStatus,
  setParsedProjectMeta,
  setParsedLineItems,
  updateParsedLineItem,
  setEngineeringSuggestions,
  updateEngineeringSuggestion,
  approveEngineeringSuggestion,
  setSupplierRFQItems,
  resetQuote,
} = quoteSlice.actions;

export default quoteSlice.reducer;