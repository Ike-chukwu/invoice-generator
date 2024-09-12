import { cn } from "@/app/utils";
import React from "react";
import { Controller } from "react-hook-form";

type Props = {
  name: string;
  labelClassName?: string;
  selectClassName: string;
  options: any;
  label: string;
  error: string;
};

const SelectField = ({
  name,
  options,
  labelClassName,
  selectClassName,
  label,
  error,
}: Props) => {

  


  return (
    <>
      <label className={labelClassName}>{label}</label>
      <Controller
        name={name}
        render={({ field: { value, onChange } }) => (
          <select
            value={value}
            onChange={onChange}
            className={cn(selectClassName, error ? "border-red-500" : null)}
          >
            <option value="">Select {label}</option>
            {options.map((option, index) => (
              <option key={index} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        )}
      ></Controller>
      {error && (
        <span className="text-red-500 text-[12px]" role="alert">
          {error}
        </span>
      )}
    </>
  );
};

export default SelectField;
