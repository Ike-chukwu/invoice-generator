"use client";
import { ArrowLeftIcon } from "@/components/icons";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import Form from "@/components/Form";
import { addDays } from "@/helper";
import { invoicePayload } from "@/types/schema";
import Modal from "@/components/UI/Modal";
import WithAuth from "@/components/ProtectedRoute";
import { useInvoiceStore } from "@/stores/invoice-store";
import { useNavStore } from "@/stores/nav-store";
import {
  useChangeInvoiceStatus,
  useDeleteInvoice,
  useEditInvoice,
  useGetInvoiceById,
} from "@/hooks/useInvoice";
import { toast } from "sonner";

type InvoiceType = {
  id: string;
  code: string;
  itemsList?:
    | {
        itemQuantity?: number | undefined;
        itemPrice?: number | undefined;
        itemName: string;
        total: number;
      }[]
    | undefined;
  streetAddressOfBusinessOwner: string;
  cityOfBusinessOwner: string;
  postCodeOfBusinessOwner: string;
  countryOfBusinessOwner: number;
  clientName: string;
  clientEmail: string;
  streetAddressOfClient: string;
  cityOfClient: string;
  postCodeOfOfClient: string;
  countryOfClient: number;
  invoiceDate: string;
  paymentTerms: number;
  projectDescription: string;
  dueDate: string;
  status: string;
};

const ReceiptPage = () => {
  const { id } = useParams();
  const {
    invoice,
    isLoading: isInvoiceLoading,
    isSuccess,
    isError,
  } = useGetInvoiceById(id.toString() || "");
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceType>();
  const listOfInvoicesFromStore = useInvoiceStore(
    (state) => state.listOfInvoices
  );
  const router = useRouter();
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const changeInvoiceStatusHandler = useInvoiceStore(
    (state) => state.changeInvoiceStatus
  );
  const deleteInvoiceHandler = useInvoiceStore((state) => state.deleteInvoice);

  const isNavActive = useNavStore((state) => state.isNavActive);
  const toggleNav = useNavStore((state) => state.toggleNav);
  const editInvoiceHandler = useInvoiceStore((state) => state.editInvoice);
  const {
    editInvoice,
    isError: isEditError,
    isPending,
    isSuccess: isEditSuccess,
  } = useEditInvoice({
    onSuccess: () => toast.success("Invoice has been edited successfully"),
    onError: () => toast.error("Invoice could not be edited"),
    id: id.toString(),
  });
  const {
    changeInvoiceStatus,
    isError: isInvoiceStatusError,
    isPending: isInvoiceStatusLoading,
    isSuccess: isInvoiceStatusChangeSuccess,
  } = useChangeInvoiceStatus({
    onSuccess: () => toast.success("Invoice status successfully updated"),
    onError: () => toast.error("Invoice status update failed"),
    id: id.toString(),
  });
  const {
    deleteInvoice,
    isError: isDeleteInvoiceError,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
  } = useDeleteInvoice({
    onSuccess: () => toast.success("Invoice successfully deleted"),
    onError: () => toast.error("Invoice failed to delete"),
  });

  const changeStatusHandler = () => {
    // let selectedInvoiceCopy;
    // if (selectedInvoice) {
    //   selectedInvoiceCopy = { ...selectedInvoice };
    //   selectedInvoiceCopy.status = "paid";
    // }
    // const selectedId = selectedInvoice?.id;
    // setSelectedInvoice(selectedInvoiceCopy);
    // if (selectedId) changeInvoiceStatusHandler(selectedId);
    changeInvoiceStatus({
      ...invoice,
      status: "paid",
    });
  };
  const onSubmit = (values: invoicePayload) => {
    // const randomCode = generateCode();
    const formatedItemsList = values.itemsList?.map((item) => {
      return {
        ...item,
        total: (item.itemPrice ?? 0) * (item.itemQuantity ?? 0),
      };
    });
    let dueDate;
    const selectedPaymentTerm = values.paymentTerms;
    dueDate = addDays(values.invoiceDate, selectedPaymentTerm);
    // if (selectedPaymentTerm === 1) {
    //   dueDate = addDays(values.invoiceDate, 1);
    // } else if (selectedPaymentTerm === 2) {
    //   dueDate = addDays(values.invoiceDate, 7);
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
    editInvoiceHandler({
      id: selectedInvoice?.id,
      code: selectedInvoice?.code,
      ...values,
      invoiceDate: values.invoiceDate,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      itemsList: formatedItemsList,
      status: selectedInvoice?.status,
    });
    setSelectedInvoice({
      id: selectedInvoice?.id ?? "",
      code: selectedInvoice?.code ?? "",
      ...values,
      dueDate: dueDate ?? "",
      itemsList: formatedItemsList,
      status: selectedInvoice?.status ?? "",
    });
    editInvoice({
      _id: id.toString(),
      code: invoice?.code,
      ...values,
      invoiceDate: values.invoiceDate,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      itemsList: formatedItemsList,
      status: invoice?.status,
    });
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

  // useEffect(() => {
  //   const foundInvoice = listOfInvoicesFromStore.find(
  //     (invoice) => invoice.id == id
  //   );
  //   if (invoice) {
  //     setSelectedInvoice(foundInvoice);
  //   }
  // }, [invoice, id]);
  useEffect(() => {
    console.log(invoice);
  }, [invoice]);

  if (isInvoiceLoading) return <div>Loading</div>;

  return (
    <>
      <div className="bg-[#F8F8FB] px-4 md:px-10 w-full min-h-[100vh] flex justify-center ">
        <div className="py-[7.5rem] relative lg:py-20 w-[800px] mx-auto flex gap-10 flex-col items-start">
          <Link href="/" className="flex items-center gap-2 md:gap-4">
            <ArrowLeftIcon />
            <span className="text-[14px] font-bold">Go back</span>
          </Link>

          <div className="flex flex-col items-start gap-7 w-full">
            <div className="bg-white rounded-lg py-6 px-4 md:px-6 w-full flex justify-between items-center">
              <div className="flex w-full justify-between md:justify-normal md:w-auto gap-4 items-center">
                <span className="text-xs capitalize text-[#888EAF]">
                  status
                </span>
                {invoice?.status == "paid" && (
                  <div className="text-green-400 justify-center w-[5rem] py-2 text-[12px] bg-[#F5FDFA] flex gap-2 items-center text-bold rounded-md capitalize">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span>{invoice?.status}</span>
                  </div>
                )}
                {invoice?.status == "pending" && (
                  <div className="text-[#FF8F00] justify-center w-[5rem] py-2 text-[12px] bg-[#FFF9F2] flex gap-2 items-center text-bold rounded-md capitalize">
                    <div className="w-2 h-2 rounded-full bg-[#FF8F00]"></div>
                    <span>{invoice?.status}</span>
                  </div>
                )}
                {invoice?.status == "draft" && (
                  <div className="text-[#373B53] justify-center w-[5rem] py-2 text-[12px] bg-[#F5F5F6] flex gap-2 items-center text-bold rounded-md capitalize">
                    <div className="w-2 h-2 rounded-full bg-[#373B53]"></div>
                    <span>{invoice?.status}</span>
                  </div>
                )}
              </div>
              <div className="hidden md:flex gap-2 items-center">
                <button
                  onClick={toggleNav}
                  className="text-xs p-4 md:px-6 py-4  capitalize rounded-3xl text-[#7E88C3] bg-[#DFE3FA]"
                >
                  edit
                </button>
                <button
                  onClick={() => {
                    // console.log("yes");
                    setIsDeleteModalActive(true);
                  }}
                  className="text-xs p-4 md:px-6 py-4 capitalize rounded-3xl bg-red-500 font-bold text-white"
                >
                  delete
                </button>
                <button
                  className={
                    "text-xs p-4 md:px-6 py-4 bg-[#7c5dfa] rounded-3xl font-bold text-white " +
                    (invoice?.status == "paid" ? "opacity-45" : "opacity-100")
                  }
                  onClick={changeStatusHandler}
                  disabled={
                    invoice?.status == "paid" || isInvoiceStatusChangeSuccess
                  }
                >
                  {isInvoiceStatusLoading ? "Please wait..." : " Mark as Paid"}
                </button>
              </div>
            </div>
            <div className="bg-white h-[500px] overflow-y-scroll md:h-auto md:overflow-y-hidden rounded-lg py-3 px-4 md:px-6 w-full flex flex-col gap-6 md:gap-10">
              <div className="flex flex-col md:flex-row justify-between md:items-center w-full">
                <div className="">
                  <p className="uppercase text-[14px] md:text-[16px] mb-2 text-[#0C0E16] font-bold">
                    {invoice?.code}
                  </p>
                  <span className="text-[12px] md:text-[14px] capitalize text-[#888EAF]">
                    {invoice?.projectDescription}
                  </span>
                </div>
                <div className="mt-6 md:mt-auto">
                  <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
                    {invoice?.streetAddressOfBusinessOwner},
                  </p>
                  <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
                    {invoice?.cityOfBusinessOwner},
                  </p>
                  <p className="text-[12px] md:text-[14px] capitalize text-[#888EAF]">
                    {invoice?.postCodeOfBusinessOwner}
                  </p>
                  <p className="text-[12px] md:text-[14px] capitalize text-[#888EAF]">
                    {invoice?.countryOfBusinessOwner}
                  </p>
                </div>
              </div>
              <div className="flex w-full justify-between md:justify-normal md:w-auto md:gap-[8rem]">
                <div className="flex flex-col items-start gap-9">
                  <div className="">
                    <p className="text-[12px] md:text-[14px] mb-2 capitalize text-[#888EAF]">
                      Invoice Date
                    </p>
                    <p className="text-[14px] md:text-lg font-bold">
                      {invoice?.invoiceDate &&
                        new Date(invoice.invoiceDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          }
                        )}
                    </p>
                  </div>
                  <div className="">
                    <p className="text-[12px] md:text-[14px] mb-2 capitalize text-[#888EAF]">
                      Payment Due
                    </p>
                    <p className="text-[14px] md:text-lg font-bold">
                      {invoice?.invoiceDate &&
                        new Date(
                          addDays(
                            invoice.invoiceDate,
                            parseInt(invoice.paymentTerms)
                          )
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3">
                  <div className="">
                    <p className="text-[14px] mb-2 capitalize text-[#888EAF]">
                      bill to
                    </p>
                    <p className="text-[14px] md:text-lg font-bold">
                      {invoice?.clientName}
                    </p>
                  </div>
                  <div className="flex flex-col items-start ">
                    <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
                      {invoice?.streetAddressOfClient}
                    </p>
                    <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
                      {invoice?.cityOfClient}
                    </p>
                    <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
                      {invoice?.postCodeOfOfClient}
                    </p>
                    <p className="text-[12px] md:text-[14px] capitalize text-[#888EAF]">
                      {invoice?.countryOfClient}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block">
                  <p className="text-[14px] mb-2 capitalize text-[#888EAF]">
                    sent to
                  </p>
                  <p className="text-[14px] md:text-lg font-bold">
                    {invoice?.clientEmail}
                  </p>
                </div>
              </div>
              <div className="block md:hidden">
                <p className="text-[14px] mb-2 capitalize text-[#888EAF]">
                  sent to
                </p>
                <p className="text-[14px] md:text-lg font-bold">
                  {invoice?.clientEmail}
                </p>
              </div>
              <div className="">
                <div className="hidden md:grid grid-cols-4 w-full gap-6 px-4 md:px-8 py-10 bg-[#F9FAFE] rounded-tl-md rounded-tr-md">
                  <p className="text-[13px] hidden md:block text-[#888EAF]">
                    Item Name
                  </p>
                  <p className="text-[13px] text-center hidden md:block  text-[#888EAF]">
                    QTY.
                  </p>
                  <p className="text-[13px] hidden md:block text-center text-[#888EAF]">
                    Price
                  </p>
                  <p className="text-[13px] text-right hidden md:block text-[#888EAF]">
                    Total
                  </p>
                  {invoice?.itemsList?.map((item) => (
                    <>
                      {/* <div className="w-full item flex-col md:flex-row gap-2 flex  md: justify-between"> */}
                      <p className="text-[13px] hidden md:block md:text-[14px] font-bold">
                        {item.itemName}
                      </p>
                      <p className="text-[13px] text-center hidden md:block md:text-[14px] text-black font-bold">
                        {item.itemQuantity}
                        <span className="mr-1 text-[#888EAF] md:hidden inline">
                          x
                        </span>
                      </p>
                      <p className="text-[13px] hidden text-center md:block md:text-[14px] text-black font-bold">
                        ${item.itemPrice}.00
                      </p>

                      <p className="text-[13px] hidden md:block md:text-[14px] text-right font-bold">
                        $
                        {`${
                          (item.itemQuantity ?? 0) * (item.itemPrice ?? 0)
                        }.00`}
                      </p>
                    </>
                  ))}
                </div>
                <div className="md:hidden flex flex-col gap-6 px-4 md:px-8 py-10 bg-[#F9FAFE] w-full ">
                  {invoice?.itemsList?.map((item) => (
                    <div className="flex justify-between items-center ">
                      <div className="flex flex-col  items-start md:hidden  ">
                        <p className="text-[13px] md:text-[14px] font-bold">
                          {item.itemName}
                        </p>
                        <div>
                          <span className="text-[13px] text-[] md:text-[14px] text-[#888EAF] md:text-black font-bold">
                            {item.itemQuantity}
                            <span className="mr-1 text-[#888EAF] md:hidden inline">
                              x
                            </span>
                          </span>
                          <span className="text-[13px]  md:text-[14px] text-[#888EAF] md:text-black font-bold">
                            ${item.itemPrice}.00
                          </span>
                        </div>
                      </div>
                      <p className="text-[13px] block md:hidden md:text-[14px] text-right font-bold">
                        $
                        {`${
                          (item.itemQuantity ?? 0) * (item.itemPrice ?? 0)
                        }.00`}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-white items-center w-full px-4 py-6 bg-[#373B53] rounded-bl-md rounded-br-md">
                  <p className="text-[14px]">Amount Due</p>
                  <p className="text-2xl font-bold">
                    $
                    {invoice?.itemsList?.reduce((acc, item) => {
                      return (
                        (item?.itemQuantity ?? 0) * (item?.itemPrice ?? 0) + acc
                      );
                    }, 0)}
                    .00
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute  md:hidden bottom-0 bg-white rounded-lg py-6 px-4 md:px-6 w-full flex justify-between items-center">
            <div className="w-full md:w-auto justify-between md:justify-normal flex gap-2 items-center">
              <button
                onClick={toggleNav}
                className="text-xs p-4 md:px-6 py-4  capitalize rounded-3xl text-[#7E88C3] bg-[#DFE3FA]"
              >
                edit
              </button>
              <button
                onClick={() => {
                  setIsDeleteModalActive(true);
                }}
                className="text-xs p-4 md:px-6 py-4 capitalize rounded-3xl bg-red-500 font-bold text-white"
              >
                delete
              </button>
              <button
                onClick={changeStatusHandler}
                disabled={
                  invoice?.status == "paid" || isInvoiceStatusChangeSuccess
                }
                className={
                  "text-xs p-4 md:px-6 py-4 rounded-3xl font-bold bg-[#7c5dfa] text-white " +
                  (invoice?.status == "paid" ? "opacity-50" : "opacity-100")
                }
              >
                {isInvoiceStatusLoading ? "Please wait..." : " Mark as Paid"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          "bg-overlay-color  transition-all duration-300 fixed inset-0 min-h-[100vh] w-full z-20 " +
          (isNavActive ? "opacity-100 block" : "opacity-0 hidden")
        }
        onClick={toggleNav}
      ></div>
      <Modal
        isModalActive={isDeleteModalActive}
        setIsModalActive={setIsDeleteModalActive}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={
            "bg-white rounded-lg transition-all duration-800 ease-in flex-col z-50 w-[280px]  md:w-[400px] p-7 lg:p-10 flex gap-4 items-start " +
            (isDeleteModalActive
              ? "translate-y-0 opacity-100 "
              : "translate-y-[200px] opacity-0")
          }
        >
          <h2 className="text-[14px] md:text-[20px] font-bold">
            Confirm Deletion
          </h2>
          <p className="text-[12px] md:text-[14px] text-[#000000]">
            {`Are you sure you want to delete invoice ${invoice?.code}? This action cannot
            be undone.`}
          </p>
          <div className="self-end flex gap-2">
            <button
              onClick={() => {
                setIsDeleteModalActive(false);
              }}
              className="text-xs p-4 md:px-6 py-4  capitalize rounded-3xl text-[#7E88C3] bg-[#f9fafe] hover:bg-[#DFE3FA]"
            >
              cancel
            </button>
            <button
              onClick={() => {
                // deleteInvoiceHandler(selectedInvoice.id);
                deleteInvoice(id.toString());
                router.push("/");
              }}
              className="text-xs p-4 md:px-6 py-4 capitalize rounded-3xl bg-red-500 font-bold text-white"
            >
              delete
            </button>
          </div>
        </div>
      </Modal>
      <Form invoice={invoice} submitFormHandler={onSubmit} />
    </>
  );
};

export default WithAuth(ReceiptPage);
