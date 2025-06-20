
import { OriginalLanguage, ComplexityLevel, TranslationConfidence } from './types';

export const ORIGINAL_LANGUAGE_OPTIONS = Object.values(OriginalLanguage);
export const COMPLEXITY_LEVEL_OPTIONS = Object.values(ComplexityLevel);
export const TRANSLATION_CONFIDENCE_OPTIONS = Object.values(TranslationConfidence);

export const INITIAL_VIBE_JSON_DATA = {
  Header: {
    Original_Language: OriginalLanguage.PYTHON,
    Original_Code_Snippet: "<Your code snippet here>",
    Detected_Complexity_Level: ComplexityLevel.BEGINNER,
    Translation_Confidence: TranslationConfidence.MEDIUM
  },
  Imports: ["import os", "import sys"],
  Settings: ["MAX_RETRIES = 3", "TIMEOUT = 10.0"],
  Variables: [
    { name: "counter", type: "number", initial_value: 0 },
    { name: "userName", type: "text", initial_value: "guest" }
  ],
  Classes: [
    {
      name: "Car",
      purpose: "Represents a vehicle",
      attributes: [
        { name: "speed", type: "number" },
        { name: "color", type: "text" }
      ],
      methods: [
        { name: "accelerate", purpose: "Increase speed" },
        { name: "brake", purpose: "Decrease speed" }
      ]
    }
  ],
  Functions: [
    {
      name: "calculateSum",
      purpose: "Add two numbers",
      inputs: [
        { name: "a", type: "number" },
        { name: "b", type: "number" }
      ],
      outputs: "number",
      steps: [
        "Take input a",
        "Take input b",
        "Add a and b",
        "Return result"
      ]
    }
  ],
  Conditions: ["If input is empty, show an error message."],
  Loops: ["Repeat 5 times: ask user for a value."],
  Errors: ["On division by zero: show error and cancel operation."],
  Flow: [
    "Start program",
    "Ask user for two numbers",
    "Call calculateSum",
    "Display result",
    "End program"
  ],
  Comments: ["This is an example structure."]
};

export const EMPTY_VIBE_JSON_DATA = {
  Header: {
    Original_Language: OriginalLanguage.PYTHON,
    Original_Code_Snippet: "",
    Detected_Complexity_Level: ComplexityLevel.BEGINNER,
    Translation_Confidence: TranslationConfidence.MEDIUM
  },
  Imports: [],
  Settings: [],
  Variables: [],
  Classes: [],
  Functions: [],
  Conditions: [],
  Loops: [],
  Errors: [],
  Flow: [],
  Comments: []
};
    