import React from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import IconButton, { PlusIcon, TrashIcon } from '../common/IconButton';
import SectionCard from '../common/SectionCard';

interface StringListEditorProps {
  title: string;
  items: string[];
  onChange: (newItems: string[]) => void;
  placeholder?: string;
  isCollapsible?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const StringListEditor: React.FC<StringListEditorProps> = ({ 
  title, 
  items, 
  onChange, 
  placeholder = "Enter value",
  isCollapsible,
  isCollapsed,
  onToggleCollapse
}) => {
  const handleAddItem = () => {
    onChange([...items, ""]);
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  const handleRemoveItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <SectionCard 
      title={title}
      actionButton={
        title ? 
        <Button onClick={handleAddItem} variant="ghost" size="sm">
          <PlusIcon className="w-4 h-4 mr-1" /> Add
        </Button>
        : null
      }
      isCollapsible={isCollapsible && !!title} // Only collapsible if it's a top-level section with a title
      isCollapsed={isCollapsed}
      onToggleCollapse={onToggleCollapse}
    >
      {items.length === 0 && title && <p className="text-sm text-gray-500">No {title.toLowerCase()} added yet.</p>}
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Input
            value={item}
            onChange={(e) => handleItemChange(index, e.target.value)}
            placeholder={placeholder}
            className="flex-grow"
          />
          <IconButton 
            onClick={() => handleRemoveItem(index)} 
            tooltip={`Remove ${title ? title.slice(0,-1) : 'item'}`}
            icon={<TrashIcon />}
          />
        </div>
      ))}
       {/* Add button for "Steps" in FunctionsEditor which has no title for SectionCard */}
      {!title && items.length > 0 && (
         <Button onClick={handleAddItem} variant="ghost" size="sm" className="mt-2">
            <PlusIcon className="w-4 h-4 mr-1" /> Add Step
        </Button>
      )}
      {!title && items.length === 0 && (
        <div className="flex justify-start">
            <Button onClick={handleAddItem} variant="ghost" size="sm" className="mt-0">
                <PlusIcon className="w-4 h-4 mr-1" /> Add Step
            </Button>
        </div>
      )}
    </SectionCard>
  );
};

export default StringListEditor;