"use client";
import { ArrowDownIcon, ArrowRightIcon, PlusIcon } from "@/components/icons";
import ItemDetail from "@/components/ItemDetail";
import InputField from "@/components/UI/Input";
import SelectField from "@/components/UI/Select";
import { listOfCountries, paymentMethods } from "@/constants";
import { invoicePayload, invoiceSchema } from "@/types/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

export default function Home() {
  const [isNavActive, toggleNav] = useState(false);
  const methods = useForm({
    resolver: yupResolver(invoiceSchema),
    mode: "all",
  });

  const { control, register, watch } = methods;
  const {
    fields: listOfItems,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "itemsList", // unique name for your Field Array
  });

  const onSubmit = (values: invoicePayload) => {
    console.log(values);
  };

  return (
    <div className="bg-[#F8F8FB] w-full min-h-[100vh] flex justify-center ">
      <div className="pt-[7.5rem] pb-[4rem] px-4 lg:px-10 lg:py-20 w-full lg:w-[800px] mx-auto flex gap-10 flex-col items-start">
        <div className="flex justify-between items-center w-full">
          <div className="">
            <h1 className="text-[#0C0E16] text-[16px] font-bold md:mb-2 lg:text-3xl capitalize">
              invoices
            </h1>
            <span className="text-xs text-[#8F95B2]">3 total invoices</span>
          </div>

          <div className="flex gap-10 md:gap-16 items-center">
            <div className="relative">
              <div className="flex gap-2 items-center">
                <span className="text-xs font-bold text-[#0C0E16]">
                  Filter <span className="hidden md:inline">by status</span>
                </span>
                <ArrowDownIcon />
              </div>
              <div className="hidden absolute top-[150%] left-[-20px] right-0 w-[150px] p-4 bg-white rounded-sm">
                <div className="flex items-center gap-3 mb-3">
                  <input type="checkbox" />
                  <span className="capitalize text-xs">draft</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <input type="checkbox" />
                  <span className="capitalize text-xs">pending</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" />
                  <span className="capitalize text-xs">paid</span>
                </div>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleNav(true);
              }}
              className="py-2 cursor-pointer px-2 bg-[#9277FF] rounded-[3rem] flex gap-3 items-center"
            >
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <PlusIcon />
              </div>
              <span className="text-white text-[14px]">
                New <span className="hidden md:inline">invoice</span>
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="hidden py-6 rounded-md bg-white px-6 md:flex justify-between items-center w-full">
            <span className="text-[#0C0E16] text-[14px] font-bold">
              <span className="text-[#7E88C3] font-normal">#</span>RT3080
            </span>
            <span className="text-[#7E88C3] text-[13px]  capitalize">
              due 19 aug 2021
            </span>
            <span className="text-[#7E88C3] text-[13px] capitalize">
              jensen huang
            </span>
            <div className="flex gap-7 items-center">
              <span className="text-[#0C0E16] text-[14px] font-bold  capitalize">
                $1,800.90
              </span>
              <div className="text-green-400 px-7 py-3 text-[12px] bg-[#F5FDFA] flex gap-2 items-center text-bold rounded-md capitalize">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span>Paid</span>
              </div>
              <ArrowRightIcon />
            </div>
          </div>

          <div className=" py-6 rounded-md bg-white px-6 flex md:hidden flex-col gap-8 justify-between items-center w-full">
            <div className="flex justify-between w-full">
              <span className="text-[#0C0E16] text-[14px] font-bold">
                <span className="text-[#7E88C3] font-normal">#</span>RT3080
              </span>
              <span className="text-[#7E88C3] text-[13px] capitalize">
                jensen huang
              </span>
            </div>
            <div className="flex w-full justify-between items-center">
              <div className="flex flex-col gap-1 items-start">
                <span className="text-[#7E88C3] text-[13px]  capitalize">
                  due 19 aug 2021
                </span>
                <span className="text-[#0C0E16] text-[14px] font-bold  capitalize">
                  $1,800.90
                </span>
              </div>
              <div className="text-green-400 px-10 py-3 text-[12px] bg-[#F5FDFA] flex gap-2 items-center text-bold rounded-md capitalize">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span>Paid</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          "bg-[#7C7C7D]  transition-all duration-300 fixed inset-0 min-h-[100vh] w-full z-20 " +
          (isNavActive ? "opacity-100 block" : "opacity-0 hidden")
        }
        onClick={() => {
          toggleNav(false);
        }}
      ></div>
      <div
        className={
          `fixed transition-all ease-in-out z-20  duration-500 e-in-out pl-[1.5rem] pr-[0.5rem] flex flex-col gap-8 md:gap-12 items-start w-full md:w-[720px] top-0 bottom-0 bg-[#FFFFFF] pt-[6rem] md:pt-[7.5rem] lg:pt-14 pb-6 md:pl-[3.3rem] lg:pl-[8.5rem] md:pr-[2rem] rounded-tr-[1.3rem] rounded-br-[1.3rem] ` +
          (isNavActive ? "left-0" : "left-[-100%]")
        }
      >
        <h1 className="text-[22px] font-bold capitalize">new invoice</h1>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="h-full w-full flex flex-col  gap-[3rem] overflow-y-auto pr-[1rem]  md:pr-[2rem]"
          >
            <div className="flex flex-col gap-[1.6rem] w-full items-start">
              <p className="text-[11px] text-[#7C5DFA] font-bold capitalize ">
                bill from
              </p>
              <div className=" flex flex-col w-full ">
                <InputField
                  name="streetAddressOfBusinessOwner"
                  label="street address"
                  labelClassName="text-[11px] font-bold capitalize text-[#8A91C5] mb-2"
                  error={
                    methods.formState.errors.streetAddressOfBusinessOwner
                      ?.message
                  }
                  type="text"
                  inputClassName="px-4 py-4 border-[0.1px] text-[10px] border-[#DFE3FA] "
                />
              </div>

              <div className="flex w-full gap-2 justify-between ">
                <div className="flex flex-col gap-2 w-[25%]">
                  <InputField
                    label="city"
                    name="cityOfBusinessOwner"
                    error={
                      methods.formState.errors.cityOfBusinessOwner?.message
                    }
                    inputClassName="px-4 py-4 border-[0.1px] text-[10px] border-[#DFE3FA] w-full"
                    type="text"
                    labelClassName="text-[11px] font-bold capitalize text-[#8A91C5]"
                  />
                </div>
                <div className="flex flex-col gap-2 w-[25%]">
                  <InputField
                    label="post code"
                    name="postCodeOfBusinessOwner"
                    error={
                      methods.formState.errors.postCodeOfBusinessOwner?.message
                    }
                    inputClassName="px-4 py-4 border-[0.1px] text-[10px] border-[#DFE3FA] w-full"
                    labelClassName="text-[11px] font-bold capitalize text-[#8A91C5]"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2 w-[45%]">
                  <SelectField
                    error={
                      methods.formState.errors.countryOfBusinessOwner?.message
                    }
                    options={listOfCountries}
                    name="countryOfBusinessOwner"
                    label="country"
                    labelClassName="text-[11px]  font-bold capitalize text-[#8A91C5]"
                    selectClassName="px-4 text-[10px] outline-none py-4 border-[0.1px] border-[#DFE3FA] w-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[1.6rem] w-full items-start">
              <p className="text-[11px] text-[#7C5DFA] font-bold capitalize ">
                bill To
              </p>

              <div className=" flex flex-col w-full ">
                <InputField
                  label="client's name"
                  name="clientName"
                  error={methods.formState.errors.clientName?.message}
                  inputClassName="px-4 py-4 border-[0.1px] text-[10px]  border-[#DFE3FA] "
                  labelClassName="text-[11px] font-bold capitalize text-[#8A91C5] mb-2"
                  type="text"
                />
              </div>
              <div className=" flex flex-col w-full ">
                <InputField
                  label=" client's email"
                  name="clientEmail"
                  error={methods.formState.errors.clientEmail?.message}
                  labelClassName="text-[11px] font-bold capitalize text-[#8A91C5] mb-2"
                  type="email"
                  inputClassName="px-4 py-4 border-[0.1px] text-[10px]  border-[#DFE3FA]"
                />
              </div>
              <div className=" flex flex-col w-full ">
                <InputField
                  label="street address"
                  name="streetAddressOfClient"
                  error={
                    methods.formState.errors.streetAddressOfClient?.message
                  }
                  type="text"
                  labelClassName="text-[11px] font-bold capitalize text-[#8A91C5] mb-2"
                  inputClassName="px-4 py-4 border-[0.1px] text-[10px]  border-[#DFE3FA]"
                />
              </div>

              <div className="flex w-full gap-2 justify-between ">
                <div className="flex flex-col gap-2 w-[25%]">
                  <InputField
                    label="city"
                    name="cityOfClient"
                    error={methods.formState.errors.cityOfClient?.message}
                    inputClassName="px-4 py-4 border-[0.1px] text-[10px] border-[#DFE3FA] w-full"
                    labelClassName="text-[11px] font-bold capitalize text-[#8A91C5]"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2 w-[25%]">
                  <InputField
                    label="post code"
                    name="postCodeOfOfClient"
                    error={methods.formState.errors.postCodeOfOfClient?.message}
                    inputClassName="px-4 py-4 border-[0.1px] text-[10px] border-[#DFE3FA] w-full"
                    labelClassName="text-[11px] font-bold capitalize text-[#8A91C5]"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2 w-[45%]">
                  <SelectField
                    error={methods.formState.errors.countryOfClient?.message}
                    options={listOfCountries}
                    name="countryOfClient"
                    label="country"
                    labelClassName="text-[11px] font-bold capitalize text-[#8A91C5]"
                    selectClassName="px-4 text-[10px] py-4 border-[0.1px] border-[#DFE3FA] w-full"
                  />
                </div>
              </div>

              <div className="flex w-full gap-2 justify-between ">
                <div className="flex flex-col gap-2 w-[48%]">
                  <InputField
                    label="Invoice Date"
                    name="invoiceDate"
                    error={methods.formState.errors.invoiceDate?.message}
                    inputClassName="px-4 text-[10px] py-4 border-[0.1px] border-[#DFE3FA] w-full"
                    labelClassName="text-[11px] font-bold capitalize text-[#8A91C5]"
                    type="date"
                  />
                </div>
                <div className="flex flex-col gap-2 w-[48%]">
                  <SelectField
                    error={methods.formState.errors.paymentTerms?.message}
                    label="payment terms"
                    name="paymentTerms"
                    options={paymentMethods}
                    selectClassName="px-4 text-[10px] py-4 border-[0.1px] border-[#DFE3FA] w-full"
                    labelClassName="text-[11px] font-bold capitalize text-[#8A91C5]"
                  />
                </div>
              </div>

              <div className=" flex flex-col w-full ">
                <InputField
                  label="project description"
                  name="projectDescription"
                  error={methods.formState.errors.projectDescription?.message}
                  inputClassName="px-4 py-4 border-[0.1px] text-[10px]  border-[#DFE3FA]"
                  labelClassName="text-[11px] font-bold capitalize text-[#8A91C5] mb-2"
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col gap-[1.6rem] w-full items-start">
              <p className="text-lg text-[#8A91C5] font-bold capitalize ">
                Item List
              </p>
              <div className=" flex flex-col items-start w-full gap-6">
                {listOfItems.map((item, index) => (
                  <ItemDetail
                    key={item.id}
                    index={index}
                    removeItem={removeItem}
                    listOfItems={listOfItems}
                    register={register}
                    watch={watch}
                  />
                ))}
                <button
                  onClick={() => {
                    appendItem({
                      itemName: "",
                      itemPrice: 0,
                      itemQuantity: 0,
                    });
                  }}
                  className="w-full py-3 font-bold rounded-3xl bg-[#DFE3FA] text-[#7E88C3] text-[12px]"
                >
                  + Add new item
                </button>
              </div>
            </div>
            <div className="flex justify-between w-full items-center">
              <button className="text-[11px]  p-4  capitalize rounded-3xl text-[#7E88C3] bg-[#DFE3FA]">
                discard
              </button>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="text-[11px] p-4 capitalize rounded-3xl bg-[#0C0E16] font-bold text-white"
                >
                  save as draft
                </button>
                <button
                  type="submit"
                  className="text-[11px] capitalize  p-4 rounded-3xl font-bold bg-[#9277FF] text-white"
                >
                  save and send
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
