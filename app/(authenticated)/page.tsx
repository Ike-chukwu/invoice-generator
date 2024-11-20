"use client";
import { ArrowDownIcon, ArrowRightIcon, PlusIcon } from "@/components/icons";
import { invoicePayload, invoiceSchema } from "@/types/schema";
import { v4 as uuidv4 } from "uuid";
import { useInvoiceStore } from "../../stores/invoice-store";
import Link from "next/link";
import Form from "@/components/Form";
import { addDays, generateCode } from "@/helper";
import Image from "next/image";
import WithAuth from "@/components/ProtectedRoute";
import { useCreateInvoice, useGetListOfInvoices } from "@/hooks/useInvoice";
import { toast } from "sonner";
import { useNavStore } from "../../stores/nav-store";
import { useEffect } from "react";
import LargeInvoiceCard from "@/components/InvoiceCards/LargeInvoiceCard";
import SmallInvoiceCard from "@/components/InvoiceCards/SmallInvoiceCard";

const Home = () => {
  const listOfInvoicesFromStore = useInvoiceStore(
    (state) => state.listOfInvoices
  );
  const isNavActive = useNavStore((state) => state.isNavActive);
  const toggleNav = useNavStore((state) => state.toggleNav);
  const addInvoiceHandlerFromStore = useInvoiceStore(
    (state) => state.addInvoice
  );
  const {
    invoices,
    isError: isInvoiceError,
    isPending: isIvoiceLoading,
    isSuccess: isInvoiceSuccessful,
  } = useGetListOfInvoices();

  const { createInvoice, isError, isPending, isSuccess } = useCreateInvoice({
    onSuccess: () => toast.success("Invoice successfully created"),
    onError: () => toast.error("Invoice cannot be created"),
  });

  const onSubmit = (values: invoicePayload) => {
    const randomCode = generateCode();
    const formatedItemsList = values.itemsList?.map((item) => {
      return {
        ...item,
        total: (item.itemPrice ?? 0) * (item.itemQuantity ?? 0),
      };
    });
    let dueDate;
    const selectedPaymentTerm = values.paymentTerms;
    dueDate = addDays(values.invoiceDate, selectedPaymentTerm);
    // if (selectedPaymentTerm == 1) {
    // } else if (selectedPaymentTerm === 2) {
    //   dueDate = addDays(values.invoiceDate, 2);
    // } else if (selectedPaymentTerm === 3) {
    //   dueDate = addDays(values.invoiceDate, 14);
    // } else if (selectedPaymentTerm === 4) {
    //   dueDate = addDays(values.invoiceDate, 21);
    // }
    if (dueDate) {
      const date = new Date(dueDate);

      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "2-digit",
      };
      dueDate = date.toLocaleDateString("en-US", options);
    }
    // console.log(new Date(dueDate).toISOString());

    addInvoiceHandlerFromStore({
      id: uuidv4(),
      code: randomCode,
      ...values,
      invoiceDate: values.invoiceDate,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      itemsList: formatedItemsList,
      status: "pending",
    });
    createInvoice({
      id: uuidv4(),
      code: randomCode,
      ...values,
      invoiceDate: values.invoiceDate,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      itemsList: formatedItemsList,
      status: "pending",
    });
  };

  return (
    <div className="bg-[#F8F8FB] w-full min-h-[100vh] flex justify-center ">
      <div className="pt-[7.5rem] pb-[4rem] px-4 lg:px-10 lg:py-20 w-full lg:w-[800px] mx-auto flex md:gap-10 flex-col items-start">
        <div className="flex justify-between items-center w-full">
          <div className="">
            <h1 className="text-[#0C0E16] text-[16px] font-bold md:mb-2 lg:text-3xl capitalize">
              invoices
            </h1>
            <span className="text-xs text-[#8F95B2]">
              {listOfInvoicesFromStore.length} total invoices
            </span>
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
              onClick={toggleNav}
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
          {invoices?.length == 0 ? (
            <>
              <Image
                src="/assets/illustration-empty.svg"
                height={300}
                alt="empty state of invoices"
                width={400}
                className="w-[270px] pt-10 mx-auto"
              />

              <div className="flex flex-col py-5 text-center items-center gap-4">
                <p className="text-[18px] font-bold">There is nothing here</p>
                <p className="text-[13px] text-[#888eb0]">
                  Create a new invoice by clicking the New <br /> Invoice button
                  and get started
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="hidden md:flex flex-col gap-4 w-full">
                {invoices?.map((invoice) => (
                  <LargeInvoiceCard invoice={invoice} />
                ))}
              </div>
              <div className="flex pt-[2.5rem] md:hidden flex-col gap-4 w-full">
                {invoices?.map((invoice) => (
                  <SmallInvoiceCard invoice={invoice} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className={
          "bg-[#7C7C7D]  transition-all duration-300 fixed inset-0 min-h-[100vh] w-full z-20 " +
          (isNavActive ? "opacity-100 block" : "opacity-0 hidden")
        }
        onClick={toggleNav}
      ></div>

      <Form
        submitFormHandler={onSubmit}
        // isNavActive={isNavActive}
        // toggleNav={toggleNav}
        // listOfFormData={listOfFormData}
        // setListOfFormData={setListOfFormData}
      />
    </div>
  );
};

export default WithAuth(Home);
