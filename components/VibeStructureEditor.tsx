
import React, { useState, useEffect, useRef } from 'react';
import { VibePlusPlusData, HeaderData, VariableData, ClassData, FunctionData, VibeSectionKey } from '../types';
import HeaderEditor from './sections/HeaderEditor';
import StringListEditor from './sections/StringListEditor';
import VariablesEditor from './sections/VariablesEditor';
import ClassesEditor from './sections/ClassesEditor';
import FunctionsEditor from './sections/FunctionsEditor';

interface VibeStructureEditorProps {
  data: VibePlusPlusData;
  onDataChange: (newData: VibePlusPlusData) => void;
  masterCollapseState?: boolean; // True to collapse all, false to expand all
}

const VibeStructureEditor: React.FC<VibeStructureEditorProps> = ({ data, onDataChange, masterCollapseState }) => {
  
  const sectionOrderRef = useRef<VibeSectionKey[]>([
    "Header", "Imports", "Settings", "Variables", "Classes", 
    "Functions", "Conditions", "Loops", "Errors", "Flow", "Comments"
  ]);

  const [collapsedSections, setCollapsedSections] = useState<Record<VibeSectionKey, boolean>>(() => {
    const initialStates: Partial<Record<VibeSectionKey, boolean>> = {};
    const initialValueForAll = masterCollapseState === undefined ? false : masterCollapseState;
    for (const key of sectionOrderRef.current) {
      initialStates[key as VibeSectionKey] = initialValueForAll;
    }
    return initialStates as Record<VibeSectionKey, boolean>;
  });

  useEffect(() => {
    // This effect should only trigger when the masterCollapseState prop changes.
    // When it does, it iterates over all sections and applies the master state.
    if (masterCollapseState !== undefined) {
      setCollapsedSections(prevStates => {
        const newStates = {} as Record<VibeSectionKey, boolean>;
        let needsUpdate = false;
        for (const key of sectionOrderRef.current) {
          const sectionK = key as VibeSectionKey;
          newStates[sectionK] = masterCollapseState;
          // Check if this specific section's state actually needs to change
          if (prevStates[sectionK] !== masterCollapseState) {
            needsUpdate = true;
          }
        }
        // Only update the state if at least one section's collapse state changed
        return needsUpdate ? newStates : prevStates;
      });
    }
  }, [masterCollapseState]); // Only depends on masterCollapseState

  const toggleSectionCollapse = (sectionKey: VibeSectionKey) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const handleSectionChange = <K extends VibeSectionKey>(section: K, value: VibePlusPlusData[K]) => {
    onDataChange({ ...data, [section]: value });
  };

  const handleHeaderChange = <HK extends keyof HeaderData>(key: HK, value: HeaderData[HK]) => {
    handleSectionChange('Header', { ...data.Header, [key]: value });
  };
  
  const renderBlock = (sectionKey: VibeSectionKey) => {
    const isCollapsible = true; // All top-level sections are collapsible
    const isCollapsed = collapsedSections[sectionKey];
    const onToggleCollapse = () => toggleSectionCollapse(sectionKey);

    const commonProps = {
      key: sectionKey,
      isCollapsible,
      isCollapsed,
      onToggleCollapse,
    } as const;

    if (sectionKey === 'Header') {
      return (
        <HeaderEditor
          {...commonProps}
          data={data.Header}
          onChange={handleHeaderChange}
        />
      );
    }

    if (
      [
        'Imports',
        'Settings',
        'Conditions',
        'Loops',
        'Errors',
        'Flow',
        'Comments',
      ].includes(sectionKey)
    ) {
      return (
        <StringListEditor
          {...commonProps}
          title={sectionKey}
          items={data[sectionKey] as string[]}
          onChange={(newItems) => handleSectionChange(sectionKey, newItems)}
          placeholder={`Enter ${sectionKey.slice(0, -1).toLowerCase()}`}
        />
      );
    }

    if (sectionKey === 'Variables') {
      return (
        <VariablesEditor
          {...commonProps}
          items={data.Variables}
          onChange={(newItems) => handleSectionChange('Variables', newItems as VariableData[])}
        />
      );
    }

    if (sectionKey === 'Classes') {
      return (
        <ClassesEditor
          {...commonProps}
          items={data.Classes}
          onChange={(newItems) => handleSectionChange('Classes', newItems as ClassData[])}
        />
      );
    }

    if (sectionKey === 'Functions') {
      return (
        <FunctionsEditor
          {...commonProps}
          items={data.Functions}
          onChange={(newItems) => handleSectionChange('Functions', newItems as FunctionData[])}
        />
      );
    }

    return null;
  };

  return (
    // Removed space-y-0. SectionCard's own margin-bottom will handle spacing.
    <div className="">
      {sectionOrderRef.current.map((key) => renderBlock(key as VibeSectionKey))}
    </div>
  );
};

export default VibeStructureEditor;
