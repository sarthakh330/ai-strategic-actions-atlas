import { useState, useRef, useEffect } from 'react';

/**
 * Multi-select filter dropdown component with checkboxes
 *
 * @param {string} label - Button label (e.g., "Entity Class")
 * @param {Array} options - Array of {id, name} objects
 * @param {Array} selected - Array of selected IDs
 * @param {Function} onChange - Callback when selection changes (receives array of IDs)
 * @param {boolean} isActive - Whether any filters are active (changes visual indicator)
 */
export default function FilterDropdown({ label, options, selected, onChange, isActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const toggleOption = (optionId) => {
    if (selected.includes(optionId)) {
      onChange(selected.filter(id => id !== optionId));
    } else {
      onChange([...selected, optionId]);
    }
  };

  const allSelected = selected.length === options.length;
  const noneSelected = selected.length === 0;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 border rounded-sm transition-all bg-white text-text-muted ${
          isActive && !allSelected
            ? 'border-startup bg-startup/5 shadow-sm'
            : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
        }`}
      >
        <span className="font-medium text-text-main">{label}</span>

        {/* Visual indicator */}
        {isActive && !allSelected && (
          <div className="w-2 h-2 rounded-full bg-startup"></div>
        )}

        {/* Dropdown icon */}
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-sm shadow-lg z-50 min-w-[200px] py-1">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer text-xs"
            >
              <input
                type="checkbox"
                checked={selected.includes(option.id)}
                onChange={() => toggleOption(option.id)}
                className="w-3.5 h-3.5 rounded border-gray-300 text-startup focus:ring-startup focus:ring-offset-0"
              />
              <span className="text-text-main">{option.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
