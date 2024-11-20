import { cn } from "@/app/utils";
import React from "react";
import { Controller } from "react-hook-form";

type Props = {
  name: string;
  labelClassName?: string;
  selectClassName: string;
  options: any;
  label: string;
  error: string | undefined;
  valueKey?: string;
  displayKey?: string;
};

const SelectField = ({
  name,
  options,
  labelClassName,
  selectClassName,
  label,
  error,
  valueKey = "id",
  displayKey = "name",
}: Props) => {
  //return id as value of the select field
  const getItemKey = (item: any) => {
    if (typeof item == "string") {
      return item;
    }
    return item[valueKey];
  };

  // return name as the value of the select field
  const getValueKey = (item: any) => {
    if (typeof item == "string") {
      return item;
    }
    return item[displayKey];
  };

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
            {options.map((item: any) => (
              <option key={getItemKey(item)} value={getItemKey(item)}>
                {getValueKey(item)}
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
