import React from 'react';

interface SearchInputProps {
  id: string;
  label: string;
  type?: 'text' | 'number';
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const SearchInput = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
}: SearchInputProps) => {
  return (
    <div className="flex items-center gap-2 w-full md:w-auto min-w-0">
      <label htmlFor={id} className="font-semibold whitespace-nowrap">
        {label}:
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-2 border rounded-md w-full md:w-48 flex-grow"
      />
    </div>
  );
};

export default SearchInput;
