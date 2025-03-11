import React from 'react';

interface SelectFilterProps {
  label: string;
  options: { id: number | string; name: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  id: string;
  value?: string | number;
}

const SelectFilter = ({
  label,
  options,
  onChange,
  id,
  value,
}: SelectFilterProps) => {
  return (
    <div className="flex items-center gap-2 w-full md:w-auto min-w-0">
      <label htmlFor={id} className="font-semibold whitespace-nowrap">
        {label}:
      </label>
      <select
        id={id}
        onChange={onChange}
        className="p-2 border rounded-md w-full md:w-48 flex-grow"
        value={value}
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;
