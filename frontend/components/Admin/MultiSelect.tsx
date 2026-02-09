'use client';

interface Option {
  id: string;
  name?: string;
  title?: string;
}

interface MultiSelectProps {
  label: string;
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function MultiSelect({ label, options, selected, onChange }: MultiSelectProps) {
  const handleToggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter(item => item !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="border rounded-lg p-4 max-h-60 overflow-y-auto bg-white">
        {options.length === 0 ? (
          <p className="text-gray-400 text-sm">No options available</p>
        ) : (
          <div className="space-y-2">
            {options.map((option) => (
              <label key={option.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="checkbox"
                  checked={selected.includes(option.id)}
                  onChange={() => handleToggle(option.id)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm">{option.name || option.title}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      {selected.length > 0 && (
        <p className="text-xs text-gray-500 mt-1">{selected.length} selected</p>
      )}
    </div>
  );
}
