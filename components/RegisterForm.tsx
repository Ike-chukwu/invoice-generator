"use client";
import React, { useState } from "react";
import InputField from "./UI/Input";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterPayload, registerSchema } from "@/services/register/schema";
import { useRegister } from "@/hooks/useRegister";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

const RegisterForm = () => {
  const methods = useForm({
    resolver: yupResolver(registerSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const { push } = useRouter();
  const { control, register, watch, reset } = methods;
  const { signup, isSuccess, isError, isLoading } = useRegister({
    onError: () => toast.error("Registration process failed"),
    onSuccess: () => {
      toast.success("User successfuly created!");
      // push()
    },
  });
  const submitFormHandler = async (values: RegisterPayload) => {
    signup(values);
    // await fetch("http://localhost:3500/registerUser", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(values),
    // });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitFormHandler)}
        className="bg-white  rounded-lg transition-all duration-800 ease-in flex-col z-50 w-[280px] gap-3  md:w-[400px] py-3 px-5 lg:p-10 flex lg:gap-8 items-start"
      >
        <h2 className="text-[14px] md:text-[20px] font-bold">Register</h2>
        <div className="flex flex-col w-full">
          <InputField
            label="Email"
            name="email"
            type="email"
            labelClassName="text-[11px] font-bold capitalize text-[#8A91C5] pb-1 lg:pb-2"
            error={methods.formState.errors.email?.message}
            inputClassName="px-4 py-4 border-[0.1px] w-full text-[10px] border-[#DFE3FA] "
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            labelClassName="text-[11px] font-bold capitalize text-[#8A91C5] pt-3 lg:pt-6 pb-1 lg:pb-2"
            error={methods.formState.errors.password?.message}
            inputClassName="px-4 py-4 border-[0.1px] w-full text-[10px] border-[#DFE3FA] "
          />
          <InputField
            label="Name"
            name="name"
            type="text"
            labelClassName="text-[11px] font-bold capitalize text-[#8A91C5] pt-3 lg:pt-6 pb-2"
            error={methods.formState.errors.name?.message}
            inputClassName="px-4 py-4 border-[0.1px] w-full text-[10px] border-[#DFE3FA] "
          />
        </div>
        <div className="self-end flex gap-2">
          <button
            // onClick={() => {
            //   setIsModalActive(false);
            // }}
            className="text-xs p-4 md:px-6 py-4  capitalize rounded-3xl text-[#7E88C3] bg-[#f9fafe] hover:bg-[#DFE3FA]"
          >
            Back
          </button>
          <button
            type="submit"
            // onClick={() => {
            //   setIsModalActive(false);
            // }}
            disabled={isLoading}
            className="text-xs p-4 md:px-6 py-4 capitalize rounded-3xl bg-[#9277FF] font-bold text-white"
          >
            Continue
            {isLoading && (
              <ClipLoader className="ml-1" size={10} color="white" />
            )}
          </button>
        </div>
        <p
          onClick={() => push("login")}
          className="text-[10px] cursor-pointer md:text-[11px] text-[#8A91C5] text-center self-center"
        >
          Already have an account?
          <span className="text-bold  text-black">Log in</span>
        </p>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
