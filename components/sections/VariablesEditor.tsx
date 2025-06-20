import React from 'react';
import { VariableData } from '../../types';
import Input from '../common/Input';
import Button from '../common/Button';
import IconButton, { PlusIcon, TrashIcon } from '../common/IconButton';
import SectionCard from '../common/SectionCard';

interface VariablesEditorProps {
  items: VariableData[];
  onChange: (newItems: VariableData[]) => void;
  isCollapsible?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const VariablesEditor: React.FC<VariablesEditorProps> = ({ items, onChange, isCollapsible, isCollapsed, onToggleCollapse }) => {
  const handleAddItem = () => {
    onChange([...items, { name: "", type: "", initial_value: "" }]);
  };

  const handleItemChange = <K extends keyof VariableData>(index: number, field: K, value: VariableData[K]) => {
    const newItems = items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onChange(newItems);
  };

  const handleRemoveItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <SectionCard 
      title="Variables"
      actionButton={
        <Button onClick={handleAddItem} variant="ghost" size="sm">
          <PlusIcon className="w-4 h-4 mr-1" /> Add
        </Button>
      }
      isCollapsible={isCollapsible}
      isCollapsed={isCollapsed}
      onToggleCollapse={onToggleCollapse}
    >
      {items.length === 0 && <p className="text-sm text-gray-500">No variables added yet.</p>}
      {items.map((item, index) => (
        <div key={index} className="p-3 border border-gray-200 rounded-md space-y-3 bg-gray-50/50">
          <div className="flex justify-end">
            <IconButton 
              onClick={() => handleRemoveItem(index)} 
              tooltip="Remove Variable"
              icon={<TrashIcon />}
            />
          </div>
          <Input
            label="Name"
            value={item.name}
            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
            placeholder="Variable name (e.g., counter)"
          />
          <Input
            label="Type"
            value={item.type}
            onChange={(e) => handleItemChange(index, 'type', e.target.value)}
            placeholder="Data type (e.g., number, text)"
          />
          <Input
            label="Initial Value"
            value={String(item.initial_value)} // Ensure value is string for input
            onChange={(e) => handleItemChange(index, 'initial_value', e.target.value)} // Store as string, parse on export if needed
            placeholder="Initial value (e.g., 0, '')"
          />
        </div>
      ))}
    </SectionCard>
  );
};

export default VariablesEditor;