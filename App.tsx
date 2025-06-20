
import React, { useState, useCallback } from 'react';
import JsonEditor from './components/JsonEditor';
import VibeStructureEditor from './components/VibeStructureEditor';
import { VibePlusPlusData } from './types';
import { INITIAL_VIBE_JSON_DATA, EMPTY_VIBE_JSON_DATA } from './constants';
import Button from './components/common/Button';

// Helper to validate the basic structure. A more robust validation (e.g., with Zod) would be better for production.
const isValidVibeJson = (obj: any): obj is VibePlusPlusData => {
  return obj && typeof obj === 'object' && 'Header' in obj && 'Imports' in obj && 'Variables' in obj; // Add more checks as needed
};

const App: React.FC = () => {
  const [rawJsonInput, setRawJsonInput] = useState<string>(JSON.stringify(INITIAL_VIBE_JSON_DATA, null, 2));
  const [vibeJsonData, setVibeJsonData] = useState<VibePlusPlusData>(INITIAL_VIBE_JSON_DATA);
  const [parseError, setParseError] = useState<string | null>(null);
  const [allSectionsCollapsed, setAllSectionsCollapsed] = useState(false);

  const handleParseJson = useCallback(() => {
    try {
      const parsed = JSON.parse(rawJsonInput);
      if (isValidVibeJson(parsed)) {
        // Ensure all keys are present, defaulting to empty arrays/objects if missing from input
        const completeData: VibePlusPlusData = {
          ...EMPTY_VIBE_JSON_DATA, // Start with a complete empty structure
          ...parsed, // Override with parsed data
          Header: { ...EMPTY_VIBE_JSON_DATA.Header, ...(parsed.Header || {}) },
          // Ensure arrays are arrays
          Imports: Array.isArray(parsed.Imports) ? parsed.Imports : [],
          Settings: Array.isArray(parsed.Settings) ? parsed.Settings : [],
          Variables: Array.isArray(parsed.Variables) ? parsed.Variables : [],
          Classes: Array.isArray(parsed.Classes) ? parsed.Classes : [],
          Functions: Array.isArray(parsed.Functions) ? parsed.Functions : [],
          Conditions: Array.isArray(parsed.Conditions) ? parsed.Conditions : [],
          Loops: Array.isArray(parsed.Loops) ? parsed.Loops : [],
          Errors: Array.isArray(parsed.Errors) ? parsed.Errors : [],
          Flow: Array.isArray(parsed.Flow) ? parsed.Flow : [],
          Comments: Array.isArray(parsed.Comments) ? parsed.Comments : [],
        };
        setVibeJsonData(completeData);
        setParseError(null);
      } else {
        setParseError("Invalid Vibe++ JSON structure. Please check the format.");
      }
    } catch (error) {
      setParseError(`Error parsing JSON: ${error instanceof Error ? error.message : String(error)}`);
    }
  }, [rawJsonInput]);

  const handleVibeDataChange = useCallback((newData: VibePlusPlusData) => {
    setVibeJsonData(newData);
    setRawJsonInput(JSON.stringify(newData, null, 2)); // Keep raw input in sync
  }, []);

  const handleExportJson = useCallback(() => {
    const jsonString = JSON.stringify(vibeJsonData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vibe_plus_plus_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [vibeJsonData]);

  const handleLoadEmpty = () => {
    const emptyJsonString = JSON.stringify(EMPTY_VIBE_JSON_DATA, null, 2);
    setRawJsonInput(emptyJsonString);
    setVibeJsonData(EMPTY_VIBE_JSON_DATA);
    setParseError(null);
  };
  
  const handleLoadSample = () => {
    const sampleJsonString = JSON.stringify(INITIAL_VIBE_JSON_DATA, null, 2);
    setRawJsonInput(sampleJsonString);
    setVibeJsonData(INITIAL_VIBE_JSON_DATA);
    setParseError(null);
  };

  const handleToggleAllSections = () => {
    setAllSectionsCollapsed(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-800">Vibe++ JSON Editor</h1>
            <div className="space-x-3 flex items-center">
              <Button onClick={handleLoadSample} variant="secondary" size="sm">Load Sample</Button>
              <Button onClick={handleLoadEmpty} variant="secondary" size="sm">Load Empty</Button>
              <Button onClick={handleToggleAllSections} variant="secondary" size="sm">
                {allSectionsCollapsed ? 'Expand All Sections' : 'Collapse All Sections'}
              </Button>
              <Button onClick={handleParseJson} variant="primary" size="sm">Parse JSON</Button>
              <Button onClick={handleExportJson} variant="primary" size="sm">Export JSON</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 md:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full"> {/* Changed height to h-full */}
          <JsonEditor value={rawJsonInput} onChange={setRawJsonInput} error={parseError} />
        </div>
        <div className="bg-transparent rounded-lg h-full overflow-y-auto pr-2"> {/* Changed height to h-full */}
          {vibeJsonData ? (
            <VibeStructureEditor 
              data={vibeJsonData} 
              onDataChange={handleVibeDataChange}
              masterCollapseState={allSectionsCollapsed} 
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Parse valid JSON to see the structure editor.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
