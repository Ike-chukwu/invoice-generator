import { cn } from "@/app/utils";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  inputClassName?: string;
  type?: string;
  label: string;
  labelClassName?: string;
  error?: string;
  name: string;
};

const InputField = ({
  error,
  inputClassName,
  label,
  labelClassName,
  type,
  name,
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods
  // console.log(errors[name]?.message);

  return (
    <>
      <label htmlFor="" className={labelClassName}>
        {label}
      </label>
      <Controller
        name={name}
        render={({ field: { onChange, value } }) => (
          <input
            type={type}
            className={cn(
              inputClassName,
              error ? "border border-red-500" : null
            )}
            onChange={onChange}
            value={value}
            aria-invalid={error ? "true" : "false"}
          />
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

export default InputField;
