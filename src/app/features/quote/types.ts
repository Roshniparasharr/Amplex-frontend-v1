export type IntakeTab = "upload" | "email" | "manual";

export type ParseStatus = "idle" | "processing" | "success" | "error";

export interface QuoteFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

export interface ParsedLineItem {
  id: string;
  item: number;
  description: string;
  cores: string;
  qty: number;
  confidence?: number;
}

export interface ParsedProjectMeta {
  customerName: string;
  contactName: string;
  company: string;
  projectName: string;
  deliveryAddress: string;
  gpsCoordinates: string;
  warranty: string;
  specialRequirements: string[];
}

export interface EngineeringSuggestion {
  id: string;
  lineItemId: string;
  originalDescription: string;
  suggestedDescription: string;
  proposedConfiguration: string;
  standard: string;
  clauseReference: string;
  gaps: string[];
  approved: boolean;
}

export interface SupplierRFQItem {
  id: string;
  item: number;
  supplierDescription: string;
  qty: number;
  standard: string;
}

export interface QuoteState {
  currentStep: number;
  activeTab: IntakeTab;

  files: QuoteFile[];
  emailContent: string;

  parseStatus: ParseStatus;
  parsedProjectMeta: ParsedProjectMeta | null;
  parsedLineItems: ParsedLineItem[];

  engineeringSuggestions: EngineeringSuggestion[];
  supplierRFQItems: SupplierRFQItem[];
}