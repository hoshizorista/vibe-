import React from 'react';
import { FunctionData, InputData } from '../../types';
import Input from '../common/Input';
import Button from '../common/Button';
import IconButton, { PlusIcon, TrashIcon } from '../common/IconButton';
import SectionCard from '../common/SectionCard';
import StringListEditor from './StringListEditor'; 

interface SubListEditorProps<T> {
  items: T[];
  onChange: (newItems: T[]) => void;
  renderItem: (item: T, index: number, onChangeItem: <K extends keyof T>(field: K, value: T[K]) => void, onRemoveItem: () => void) => React.ReactNode;
  onAddItem: () => void;
  addItemLabel: string;
  itemBase: T;
  title: string;
  itemTitle: string;
}

const SubListEditor = <T extends object,>(
  { items, onChange, renderItem, onAddItem, addItemLabel, title, itemTitle }: SubListEditorProps<T>
) => {
  
  const handleItemChange = (index: number) => <K extends keyof T,>(field: K, value: T[K]) => {
    const newItems = items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onChange(newItems);
  };

  const handleRemoveItem = (index: number) => () => {
    onChange(items.filter((_, i) => i !== index));
  };
  
  return (
    <div className="space-y-2 mt-2">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
        <Button onClick={onAddItem} variant="ghost" size="sm"><PlusIcon className="w-3 h-3 mr-1" />{addItemLabel}</Button>
      </div>
      {items.length === 0 && <p className="text-xs text-gray-500 pl-2">No {itemTitle.toLowerCase()}s added.</p>}
      {items.map((item, idx) => (
        <div key={idx} className="p-2 border border-gray-200 rounded-md bg-white">
          {renderItem(item, idx, handleItemChange(idx), handleRemoveItem(idx))}
        </div>
      ))}
    </div>
  );
};

interface FunctionsEditorProps {
  items: FunctionData[];
  onChange: (newItems: FunctionData[]) => void;
  isCollapsible?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const FunctionsEditor: React.FC<FunctionsEditorProps> = ({ items, onChange, isCollapsible, isCollapsed, onToggleCollapse }) => {
  const handleAddItem = () => {
    onChange([...items, { name: "", purpose: "", inputs: [], outputs: "", steps: [] }]);
  };

  const handleItemChange = <K extends keyof FunctionData>(index: number, field: K, value: FunctionData[K]) => {
    const newItems = items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onChange(newItems);
  };

  const handleRemoveItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  // Inputs
  const handleAddInput = (funcIndex: number) => {
    const newItems = [...items];
    newItems[funcIndex].inputs.push({ name: "", type: "" });
    onChange(newItems);
  };

  return (
    <SectionCard 
      title="Functions"
      actionButton={
        <Button onClick={handleAddItem} variant="ghost" size="sm">
          <PlusIcon className="w-4 h-4 mr-1" /> Add
        </Button>
      }
      isCollapsible={isCollapsible}
      isCollapsed={isCollapsed}
      onToggleCollapse={onToggleCollapse}
    >
      {items.length === 0 && <p className="text-sm text-gray-500">No functions added yet.</p>}
      {items.map((item, index) => (
        <div key={index} className="p-3 border border-gray-200 rounded-md space-y-3 bg-gray-50/50">
          <div className="flex justify-between items-start">
            <Input
              label="Function Name"
              value={item.name}
              onChange={(e) => handleItemChange(index, 'name', e.target.value)}
              placeholder="Function name (e.g., calculateSum)"
              className="w-full mr-2"
            />
             <IconButton 
                onClick={() => handleRemoveItem(index)} 
                tooltip="Remove Function" 
                className="mt-7"
                icon={<TrashIcon />}
              />
          </div>
          <Input
            label="Purpose"
            value={item.purpose}
            onChange={(e) => handleItemChange(index, 'purpose', e.target.value)}
            placeholder="Purpose of the function"
          />

          <SubListEditor<InputData>
            title="Inputs"
            itemTitle="Input"
            items={item.inputs}
            onChange={(newInputs) => handleItemChange(index, 'inputs', newInputs)}
            onAddItem={() => handleAddInput(index)}
            addItemLabel="Add Input"
            itemBase={{ name: "", type: ""}}
            renderItem={(inputItem, _inputIdx, onChangeInput, onRemoveInput) => (
              <div className="space-y-2">
                 <div className="flex justify-end">
                   <IconButton onClick={onRemoveInput} tooltip="Remove Input" icon={<TrashIcon className="w-4 h-4" />}/>
                </div>
                <Input label="Input Name" value={inputItem.name} onChange={e => onChangeInput('name', e.target.value)} placeholder="e.g., a"/>
                <Input label="Input Type" value={inputItem.type} onChange={e => onChangeInput('type', e.target.value)} placeholder="e.g., number"/>
              </div>
            )}
          />
          
          <Input
            label="Outputs"
            value={item.outputs}
            onChange={(e) => handleItemChange(index, 'outputs', e.target.value)}
            placeholder="Output type (e.g., number)"
          />

          <div className="mt-2">
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Steps</h4>
            <StringListEditor
              title="" 
              items={item.steps}
              onChange={(newSteps) => handleItemChange(index, 'steps', newSteps)}
              placeholder="Enter a step description"
            />
          </div>
        </div>
      ))}
    </SectionCard>
  );
};

export default FunctionsEditor;