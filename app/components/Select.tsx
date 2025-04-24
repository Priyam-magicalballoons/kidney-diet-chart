import React from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';

const options = [
  { value: 'Diabetes', label: 'Diabetes' },
  { value: 'Hypertension', label: 'Hypertension' },
  { value: 'Heart Disease', label: 'Heart Disease' },
  { value: 'Thyroid Disorder', label: 'Thyroid Disorder' },
  { value: 'GOUT', label: 'GOUT' }
];

const types = [
  { value: 'CKD', label: 'CKD' },
  { value: 'Acute Kidney Disease', label: 'Acute Kidney Disease' },
  { value: 'Transplant', label: 'Transplant' }
];

interface OptionType {
  value: string;
  label: string;
}

interface SelectProps {
  value: MultiValue<OptionType> | SingleValue<OptionType>;
  onchange: (
    data: MultiValue<OptionType> | SingleValue<OptionType>
  ) => void;
  type: 'history' | 'types';
  isMulti?: boolean;
  placeholder?: string;
}

const SelectInput = ({
  onchange,
  value,
  type,
  isMulti = false,
  placeholder
}: SelectProps) => {
  return (
    <div className='w-full flex items-center justify-center'>
      <Select
        options={type === 'history' ? options : types}
        isMulti={isMulti}
        className='w-[80%] focus-within:ring-0 focus-within:border-none border-white py-1'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onchange(e)}
      />
    </div>
  );
};

export default SelectInput;
