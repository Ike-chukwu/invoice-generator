"use client";
import { ArrowDownIcon, ArrowRightIcon, PlusIcon } from "@/components/icons";
import ItemDetail from "@/components/ItemDetail";
import InputField from "@/components/UI/Input";
import SelectField from "@/components/UI/Select";
import { listOfCountries, paymentMethods } from "@/constants";
import { invoicePayload, invoiceSchema } from "@/types/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useInvoiceStore, useNavStore } from "../store";
import Link from "next/link";
import Form from "@/components/Form";
import { addDays, generateCode } from "@/helper";
import Auth from "@/components/LoginForm";
import Modal from "@/components/UI/Modal";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import Image from "next/image";
import WithAuth from "@/components/ProtectedRoute";

const Home = () => {
  const listOfInvoicesFromStore = useInvoiceStore(
    (state) => state.listOfInvoices
  );

  const isNavActive = useNavStore((state) => state.isNavActive);
  const toggleNav = useNavStore((state) => state.toggleNav);
  const addInvoiceHandlerFromStore = useInvoiceStore(
    (state) => state.addInvoice
  );
  const [isAuthModalActive, setisAuthModalActive] = useState(true);
  const [currentForm, setCurrentForm] = useState("register");
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
    if (parseInt(selectedPaymentTerm) === 1) {
      dueDate = addDays(values.invoiceDate, 1);
    } else if (parseInt(selectedPaymentTerm) === 2) {
      dueDate = addDays(values.invoiceDate, 7);
    } else if (parseInt(selectedPaymentTerm) === 3) {
      dueDate = addDays(values.invoiceDate, 14);
    } else if (parseInt(selectedPaymentTerm) === 4) {
      dueDate = addDays(values.invoiceDate, 21);
    }
    if (dueDate) {
      const date = new Date(dueDate);

      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "2-digit",
      };
      dueDate = date.toLocaleDateString("en-US", options);
    }
    addInvoiceHandlerFromStore({
      id: uuidv4(),
      code: randomCode,
      ...values,
      dueDate,
      itemsList: formatedItemsList,
      status: "pending",
    });
    // toggleNav();
    // setListOfFormData([
    //   ...listOfFormData,

    //   {
    //     id: uuidv4(),
    //     code: randomCode,
    //     ...values,
    //     dueDate,
    //     itemsList: formatedItemsList,
    //     status: "Pending",
    //   },
    // ]);

    // reset();
  };
  // const [listOfFormData, setListOfFormData] = useState<
  //   Array<{
  //     id: string;
  //     code: string;
  //     itemsList?:
  //       | {
  //           itemQuantity?: number | undefined;
  //           itemPrice?: number | undefined;
  //           itemName: string;
  //           total: number;
  //         }[]
  //       | undefined;
  //     streetAddressOfBusinessOwner: string;
  //     cityOfBusinessOwner: string;
  //     postCodeOfBusinessOwner: string;
  //     countryOfBusinessOwner: string;
  //     clientName: string;
  //     clientEmail: string;
  //     streetAddressOfClient: string;
  //     cityOfClient: string;
  //     postCodeOfOfClient: string;
  //     countryOfClient: string;
  //     invoiceDate: string;
  //     paymentTerms: string;
  //     projectDescription: string;
  //     dueDate: string;
  //     status: string;
  //   }>
  // >(listOfInvoicesFromStore);

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
          {listOfInvoicesFromStore.length == 0 ? (
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
            listOfInvoicesFromStore.map((invoice) => (
              <Link href={`/invoices/${invoice.id}`}>
                <div className="hidden py-6 rounded-md bg-white px-6 md:flex justify-between items-center w-full">
                  <span className="text-[#0C0E16] text-[14px] font-bold">
                    <span className="text-[#7E88C3] font-normal">
                      {invoice.code.slice(0, 1)}
                    </span>
                    {invoice.code.slice(1, 7)}
                  </span>
                  <span className="text-[#7E88C3] text-[13px]  capitalize">
                    due {invoice.dueDate}
                  </span>
                  <span className="text-[#7E88C3] text-[13px] capitalize">
                    {invoice.clientName}
                  </span>
                  <div className="flex gap-7 items-center">
                    <span className="text-[#0C0E16] text-[14px] font-bold  capitalize">
                      $
                      {invoice.itemsList?.reduce((acc, item) => {
                        return item.total + acc;
                      }, 0)}
                      .00
                    </span>
                    {invoice.status == "pending" && (
                      <div className="text-[#FF8F00] w-[5rem] py-3 text-[12px] bg-[#FFF9F2] flex gap-2 items-center justify-center text-bold rounded-md capitalize">
                        <div className="w-2 h-2 rounded-full bg-[#FF8F00]"></div>
                        <span>{invoice.status}</span>
                      </div>
                    )}
                    {invoice.status == "draft" && (
                      <div className="text-[#373B53] w-[5rem] py-3 text-[12px] bg-[#F5F5F6] flex gap-2 items-center justify-center text-bold rounded-md capitalize">
                        <div className="w-2 h-2 rounded-full bg-[#373B53]"></div>
                        <span>{invoice.status}</span>
                      </div>
                    )}
                    {invoice.status == "paid" && (
                      <div className="text-[#33D69F] w-[5rem] py-3 text-[12px] bg-[#F5FDFA] flex gap-2 items-center justify-center text-bold rounded-md capitalize">
                        <div className="w-2 h-2 rounded-full bg-[#33D69F]"></div>
                        <span>{invoice.status}</span>
                      </div>
                    )}

                    <ArrowRightIcon />
                  </div>
                </div>
              </Link>
            ))
          )}

          {listOfInvoicesFromStore.map((invoice) => (
            <div className=" py-6 rounded-md bg-white px-6 flex md:hidden flex-col gap-8 justify-between items-center w-full">
              <div className="flex justify-between w-full">
                <span className="text-[#0C0E16] text-[14px] font-bold">
                  <span className="text-[#7E88C3] font-normal">
                    {invoice.code.slice(0, 1)}
                  </span>
                  {invoice.code.slice(1, 7)}
                </span>
                <span className="text-[#7E88C3] text-[13px] capitalize">
                  {invoice.clientName}
                </span>
              </div>
              <div className="flex w-full justify-between items-center">
                <div className="flex flex-col gap-1 items-start">
                  <span className="text-[#7E88C3] text-[13px]  capitalize">
                    due {invoice.dueDate}
                  </span>
                  <span className="text-[#0C0E16] text-[14px] font-bold  capitalize">
                    $
                    {invoice.itemsList?.reduce((acc, item) => {
                      return item.total + acc;
                    }, 0)}
                    .00
                  </span>
                </div>
                {invoice.status == "paid" && (
                  <div className="text-green-400 w-[5rem] py-3 text-[12px] bg-[#F5FDFA] flex gap-2 items-center text-bold rounded-md capitalize">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span>Paid</span>
                  </div>
                )}
                {invoice.status == "pending" && (
                  <div className="text-[#FF8F00] w-[5rem] py-3 text-[12px] bg-[#FFF9F2] flex gap-2 items-center text-bold rounded-md capitalize">
                    <div className="w-2 h-2 rounded-full bg-[#FF8F00]"></div>
                    <span>Pending</span>
                  </div>
                )}
                {invoice.status == "draft" && (
                  <div className="text-[#373B53] w-[5rem] py-3 text-[12px] bg-[#F5F5F6] flex gap-2 items-center text-bold rounded-md capitalize">
                    <div className="w-2 h-2 rounded-full bg-[#373B53]"></div>
                    <span>Draft</span>
                  </div>
                )}
              </div>
            </div>
          ))}
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
