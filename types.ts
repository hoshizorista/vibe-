
export enum OriginalLanguage {
  PYTHON = "Python",
  CPP = "C++",
  JAVASCRIPT = "JavaScript",
  RUST = "Rust",
  JAVA = "Java",
  CSHARP = "C#",
  GO = "Go",
  OTHER = "Other"
}

export enum ComplexityLevel {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced"
}

export enum TranslationConfidence {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low"
}

export interface HeaderData {
  Original_Language: OriginalLanguage | string;
  Original_Code_Snippet: string;
  Detected_Complexity_Level: ComplexityLevel;
  Translation_Confidence: TranslationConfidence;
}

export interface VariableData {
  name: string;
  type: string;
  initial_value: string | number | boolean;
}

export interface AttributeData {
  name: string;
  type: string;
}

export interface MethodData {
  name: string;
  purpose: string;
}

export interface ClassData {
  name: string;
  purpose: string;
  attributes: AttributeData[];
  methods: MethodData[];
}

export interface InputData {
  name: string;
  type: string;
}

export interface FunctionData {
  name: string;
  purpose: string;
  inputs: InputData[];
  outputs: string;
  steps: string[];
}

export interface VibePlusPlusData {
  Header: HeaderData;
  Imports: string[];
  Settings: string[];
  Variables: VariableData[];
  Classes: ClassData[];
  Functions: FunctionData[];
  Conditions: string[];
  Loops: string[];
  Errors: string[];
  Flow: string[];
  Comments: string[];
}

// Helper type for generic list editor updates
export type StringListItem = string;
export type VariableListItem = VariableData;
export type ClassListItem = ClassData;
export type FunctionListItem = FunctionData;
export type AttributeListItem = AttributeData;
export type MethodListItem = MethodData;
export type InputListItem = InputData;

export type VibeSectionKey = keyof VibePlusPlusData;

    