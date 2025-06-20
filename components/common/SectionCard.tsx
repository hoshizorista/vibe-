
import React from 'react';
import IconButton, { ChevronDownIcon, ChevronUpIcon } from './IconButton';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
  isCollapsible?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const SectionCard: React.FC<SectionCardProps> = ({ 
  title, 
  children, 
  actionButton, 
  isCollapsible = false, 
  isCollapsed = false, 
  onToggleCollapse 
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg mb-16"> {/* Changed mb-12 to mb-16 */}
      <div className={`px-4 py-3 sm:px-6 flex justify-between items-center ${isCollapsible && !isCollapsed ? 'border-b border-gray-200' : ''}`}>
        <div className="flex items-center">
          {isCollapsible && onToggleCollapse && (
            <IconButton
              onClick={onToggleCollapse}
              icon={isCollapsed ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronUpIcon className="w-4 h-4" />}
              tooltip={isCollapsed ? `Expand ${title}` : `Collapse ${title}`}
              className="mr-2 p-1 text-gray-500 hover:text-blue-600"
            />
          )}
          <h3 className="text-lg leading-6 font-semibold text-gray-800">{title}</h3>
        </div>
        {actionButton}
      </div>
      {!isCollapsed && (
        <div className="p-4 sm:p-6 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default SectionCard;