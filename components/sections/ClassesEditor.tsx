import React from 'react';
import { ClassData, AttributeData, MethodData } from '../../types';
import Input from '../common/Input';
import Button from '../common/Button';
import IconButton, { PlusIcon, TrashIcon } from '../common/IconButton';
import SectionCard from '../common/SectionCard';

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


interface ClassesEditorProps {
  items: ClassData[];
  onChange: (newItems: ClassData[]) => void;
  isCollapsible?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const ClassesEditor: React.FC<ClassesEditorProps> = ({ items, onChange, isCollapsible, isCollapsed, onToggleCollapse }) => {
  const handleAddItem = () => {
    onChange([...items, { name: "", purpose: "", attributes: [], methods: [] }]);
  };

  const handleItemChange = <K extends keyof ClassData>(index: number, field: K, value: ClassData[K]) => {
    const newItems = items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onChange(newItems);
  };

  const handleRemoveItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  // Attributes
  const handleAddAttribute = (classIndex: number) => {
    const newItems = [...items];
    newItems[classIndex].attributes.push({ name: "", type: "" });
    onChange(newItems);
  };

  // Methods
  const handleAddMethod = (classIndex: number) => {
    const newItems = [...items];
    newItems[classIndex].methods.push({ name: "", purpose: "" });
    onChange(newItems);
  };


  return (
    <SectionCard 
      title="Classes"
      actionButton={
        <Button onClick={handleAddItem} variant="ghost" size="sm">
          <PlusIcon className="w-4 h-4 mr-1" /> Add
        </Button>
      }
      isCollapsible={isCollapsible}
      isCollapsed={isCollapsed}
      onToggleCollapse={onToggleCollapse}
    >
      {items.length === 0 && <p className="text-sm text-gray-500">No classes added yet.</p>}
      {items.map((item, index) => (
        <div key={index} className="p-3 border border-gray-200 rounded-md space-y-3 bg-gray-50/50">
          <div className="flex justify-between items-start">
            <Input
              label="Class Name"
              value={item.name}
              onChange={(e) => handleItemChange(index, 'name', e.target.value)}
              placeholder="Class name (e.g., Car)"
              className="w-full mr-2"
            />
            <IconButton 
              onClick={() => handleRemoveItem(index)} 
              tooltip="Remove Class" 
              className="mt-7"
              icon={<TrashIcon />}
            />
          </div>
          <Input
            label="Purpose"
            value={item.purpose}
            onChange={(e) => handleItemChange(index, 'purpose', e.target.value)}
            placeholder="Purpose of the class"
          />
          
          <SubListEditor<AttributeData>
            title="Attributes"
            itemTitle="Attribute"
            items={item.attributes}
            onChange={(newAttrs) => handleItemChange(index, 'attributes', newAttrs)}
            onAddItem={() => handleAddAttribute(index)}
            addItemLabel="Add Attribute"
            itemBase={{ name: "", type: ""}}
            renderItem={(attr, _attrIdx, onChangeAttr, onRemoveAttr) => (
              <div className="space-y-2">
                <div className="flex justify-end">
                   <IconButton onClick={onRemoveAttr} tooltip="Remove Attribute" icon={<TrashIcon className="w-4 h-4" />}/>
                </div>
                <Input label="Attribute Name" value={attr.name} onChange={e => onChangeAttr('name', e.target.value)} placeholder="e.g., speed"/>
                <Input label="Attribute Type" value={attr.type} onChange={e => onChangeAttr('type', e.target.value)} placeholder="e.g., number"/>
              </div>
            )}
          />

          <SubListEditor<MethodData>
            title="Methods"
            itemTitle="Method"
            items={item.methods}
            onChange={(newMethods) => handleItemChange(index, 'methods', newMethods)}
            onAddItem={() => handleAddMethod(index)}
            addItemLabel="Add Method"
            itemBase={{ name: "", purpose: ""}}
            renderItem={(method, _methodIdx, onChangeMethod, onRemoveMethod) => (
              <div className="space-y-2">
                <div className="flex justify-end">
                   <IconButton onClick={onRemoveMethod} tooltip="Remove Method" icon={<TrashIcon className="w-4 h-4" />}/>
                </div>
                <Input label="Method Name" value={method.name} onChange={e => onChangeMethod('name', e.target.value)} placeholder="e.g., accelerate"/>
                <Input label="Method Purpose" value={method.purpose} onChange={e => onChangeMethod('purpose', e.target.value)} placeholder="e.g., Increase speed"/>
              </div>
            )}
          />

        </div>
      ))}
    </SectionCard>
  );
};

export default ClassesEditor;