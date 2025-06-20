
import React from 'react';
import TextArea from './common/TextArea';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange, error }) => {
  return (
    <div className="h-full flex flex-col bg-gray-50 p-4 rounded-lg shadow-inner">
      <label htmlFor="json-input" className="block text-sm font-medium text-gray-700 mb-2">
        Vibe++ JSON Input
      </label>
      <TextArea
        id="json-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste or type your Vibe++ JSON here..."
        className="flex-grow font-mono text-sm !bg-white border-gray-300 rounded-md resize-none"
        rows={10}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default JsonEditor;
    