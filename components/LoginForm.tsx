"use client";
import React, { useState } from "react";
import InputField from "./UI/Input";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginPayload, loginSchema } from "@/services/login/schema";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { useLogin } from "../hooks/useLogin";
import { toast } from "sonner";

type Props = {
  isModalActive: boolean;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginForm = ({ isModalActive, setIsModalActive }: Props) => {
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { control, register, watch, reset } = methods;
  const router = useRouter();
  const { login, isError, isLoading, isSuccess } = useLogin({
    onSuccess: () => toast.success("User successfully logged in"),
    onError: () => toast.error("Login failed"),
  });
  const submitFormHandler = (values: LoginPayload) => {
    login(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitFormHandler)}
        className="bg-white  rounded-lg transition-all duration-800 ease-in flex-col z-50 w-[280px] gap-4  md:w-[400px] py-3 px-5 lg:p-10 flex lg:gap-8 items-start"
      >
        <h2 className="text-[14px] md:text-[20px] font-bold">Login</h2>
        <div className="flex flex-col w-full">
          <InputField
            label="Email"
            name="email"
            type="email"
            labelClassName="text-[11px] font-bold capitalize text-[#8A91C5] pb-2"
            error={methods.formState.errors.email?.message}
            inputClassName="px-4 py-4 border-[0.1px] w-full text-[10px] border-[#DFE3FA] "
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            labelClassName="text-[11px] font-bold capitalize text-[#8A91C5] pt-6 pb-2"
            error={methods.formState.errors.password?.message}
            inputClassName="px-4 py-4 border-[0.1px] w-full text-[10px] border-[#DFE3FA] "
          />
        </div>
        <div className="self-end flex gap-2">
          <button
            onClick={() => {
              setIsModalActive(false);
            }}
            className="text-xs p-4 md:px-6 py-4  capitalize rounded-3xl text-[#7E88C3] bg-[#f9fafe] hover:bg-[#DFE3FA]"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isLoading}
            //   onClick={() => {
            //     deleteInvoiceHandler(selectedInvoice.id);
            //     router.push("/");
            //   }}
            className="text-xs p-4 md:px-6 py-4 capitalize rounded-3xl bg-[#9277FF] font-bold text-white"
          >
            Continue
            {isLoading && (
              <ClipLoader className="ml-1" size={10} color="white" />
            )}
          </button>
        </div>
        <p
          onClick={() => router.push("/signup")}
          className="text-[9px] cursor-pointer md:text-[11px] text-[#8A91C5] text-center self-center"
        >
          First time using our app?{" "}
          <span className="text-bold   text-black">Create an account</span>{" "}
        </p>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
