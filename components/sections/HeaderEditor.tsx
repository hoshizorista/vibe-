import React from 'react';
import { HeaderData, ComplexityLevel, TranslationConfidence } from '../../types';
import { COMPLEXITY_LEVEL_OPTIONS, TRANSLATION_CONFIDENCE_OPTIONS } from '../../constants';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import Select from '../common/Select';
import SectionCard from '../common/SectionCard';

interface HeaderEditorProps {
  data: HeaderData;
  onChange: <K extends keyof HeaderData>(key: K, value: HeaderData[K]) => void;
  isCollapsible?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const HeaderEditor: React.FC<HeaderEditorProps> = ({ data, onChange, isCollapsible, isCollapsed, onToggleCollapse }) => {
  return (
    <SectionCard 
      title="Header"
      isCollapsible={isCollapsible}
      isCollapsed={isCollapsed}
      onToggleCollapse={onToggleCollapse}
    >
      <Input
        label="Original Language"
        value={data.Original_Language}
        onChange={(e) => onChange('Original_Language', e.target.value)}
        placeholder="e.g., Python"
      />
      <TextArea
        label="Original Code Snippet"
        value={data.Original_Code_Snippet}
        onChange={(e) => onChange('Original_Code_Snippet', e.target.value)}
        rows={4}
        placeholder="< 10 lines of original code>"
      />
      <Select
        label="Detected Complexity Level"
        value={data.Detected_Complexity_Level}
        onChange={(e) => onChange('Detected_Complexity_Level', e.target.value as ComplexityLevel)}
        options={COMPLEXITY_LEVEL_OPTIONS.map(level => ({ value: level, label: level }))}
      />
      <Select
        label="Translation Confidence"
        value={data.Translation_Confidence}
        onChange={(e) => onChange('Translation_Confidence', e.target.value as TranslationConfidence)}
        options={TRANSLATION_CONFIDENCE_OPTIONS.map(conf => ({ value: conf, label: conf }))}
      />
    </SectionCard>
  );
};

export default HeaderEditor;