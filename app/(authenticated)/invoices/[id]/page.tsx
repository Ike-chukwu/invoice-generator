"use client";
import { ArrowLeftIcon } from "@/components/icons";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useInvoiceStore, useNavStore } from "@/app/store";
import Form from "@/components/Form";
import { addDays } from "@/helper";
import { invoicePayload } from "@/types/schema";
import Modal from "@/components/UI/Modal";
import WithAuth from "@/components/ProtectedRoute";

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
  countryOfBusinessOwner: string;
  clientName: string;
  clientEmail: string;
  streetAddressOfClient: string;
  cityOfClient: string;
  postCodeOfOfClient: string;
  countryOfClient: string;
  invoiceDate: string;
  paymentTerms: string;
  projectDescription: string;
  dueDate: string;
  status: string;
};

const ReceiptPage = () => {
  const { id } = useParams();
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

  const changeStatusHandler = () => {
    let selectedInvoiceCopy;
    if (selectedInvoice) {
      selectedInvoiceCopy = { ...selectedInvoice };
      selectedInvoiceCopy.status = "paid";
    }
    const selectedId = selectedInvoice?.id;
    setSelectedInvoice(selectedInvoiceCopy);
    if (selectedId) changeInvoiceStatusHandler(selectedId);
  };

  const isNavActive = useNavStore((state) => state.isNavActive);
  const toggleNav = useNavStore((state) => state.toggleNav);
  const editInvoiceHandler = useInvoiceStore((state) => state.editInvoice);

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
    editInvoiceHandler({
      id: selectedInvoice?.id,
      code: selectedInvoice?.code,
      ...values,
      dueDate,
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

  useEffect(() => {
    const foundInvoice = listOfInvoicesFromStore.find(
      (invoice) => invoice.id == id
    );
    if (foundInvoice) {
      setSelectedInvoice(foundInvoice);
    }
  }, [id]);

  if (!selectedInvoice) return <div>Loading</div>;

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
                {selectedInvoice.status == "paid" && (
                  <div className="text-green-400 justify-center w-[5rem] py-2 text-[12px] bg-[#F5FDFA] flex gap-2 items-center text-bold rounded-md capitalize">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span>{selectedInvoice.status}</span>
                  </div>
                )}
                {selectedInvoice.status == "pending" && (
                  <div className="text-[#FF8F00] justify-center w-[5rem] py-2 text-[12px] bg-[#FFF9F2] flex gap-2 items-center text-bold rounded-md capitalize">
                    <div className="w-2 h-2 rounded-full bg-[#FF8F00]"></div>
                    <span>{selectedInvoice.status}</span>
                  </div>
                )}
                {selectedInvoice.status == "draft" && (
                  <div className="text-[#373B53] justify-center w-[5rem] py-2 text-[12px] bg-[#F5F5F6] flex gap-2 items-center text-bold rounded-md capitalize">
                    <div className="w-2 h-2 rounded-full bg-[#373B53]"></div>
                    <span>{selectedInvoice.status}</span>
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
                  className="text-xs p-4 md:px-6 py-4 rounded-3xl font-bold bg-[#7c5dfa] opacity-50 text-white"
                  onClick={changeStatusHandler}
                >
                  Mark as Paid
                </button>
              </div>
            </div>
            <div className="bg-white h-[500px] overflow-y-scroll md:h-auto md:overflow-y-hidden rounded-lg py-3 px-4 md:px-6 w-full flex flex-col gap-6 md:gap-10">
              <div className="flex flex-col md:flex-row justify-between md:items-center w-full">
                <div className="">
                  <p className="uppercase text-[14px] md:text-[16px] mb-2 text-[#0C0E16] font-bold">
                    {selectedInvoice.code}
                  </p>
                  <span className="text-[12px] md:text-[14px] capitalize text-[#888EAF]">
                    {selectedInvoice.projectDescription}
                  </span>
                </div>
                <div className="mt-6 md:mt-auto">
                  <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
                    {selectedInvoice.streetAddressOfBusinessOwner},
                  </p>
                  <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
                    {selectedInvoice.cityOfBusinessOwner},
                  </p>
                  <p className="text-[12px] md:text-[14px] capitalize text-[#888EAF]">
                    {selectedInvoice.postCodeOfBusinessOwner}
                  </p>
                  <p className="text-[12px] md:text-[14px] capitalize text-[#888EAF]">
                    {selectedInvoice.countryOfBusinessOwner}
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
                      {selectedInvoice.invoiceDate}
                    </p>
                  </div>
                  <div className="">
                    <p className="text-[12px] md:text-[14px] mb-2 capitalize text-[#888EAF]">
                      Payment Due
                    </p>
                    <p className="text-[14px] md:text-lg font-bold">
                      {selectedInvoice.dueDate}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3">
                  <div className="">
                    <p className="text-[14px] mb-2 capitalize text-[#888EAF]">
                      bill to
                    </p>
                    <p className="text-[14px] md:text-lg font-bold">
                      {selectedInvoice.clientName}
                    </p>
                  </div>
                  <div className="flex flex-col items-start ">
                    <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
                      {selectedInvoice.streetAddressOfClient}
                    </p>
                    <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
                      {selectedInvoice.cityOfClient}
                    </p>
                    <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
                      {selectedInvoice.postCodeOfOfClient}
                    </p>
                    <p className="text-[12px] md:text-[14px] capitalize text-[#888EAF]">
                      {selectedInvoice.countryOfClient}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block">
                  <p className="text-[14px] mb-2 capitalize text-[#888EAF]">
                    sent to
                  </p>
                  <p className="text-[14px] md:text-lg font-bold">
                    {selectedInvoice.clientEmail}
                  </p>
                </div>
              </div>
              <div className="block md:hidden">
                <p className="text-[14px] mb-2 capitalize text-[#888EAF]">
                  sent to
                </p>
                <p className="text-[14px] md:text-lg font-bold">
                  {selectedInvoice.clientEmail}
                </p>
              </div>
              <div className="">
                {/* <div className="flex justify-between items-center w-full px-8 py-10 bg-[#F9FAFE] rounded-tl-md rounded-tr-md">
                <p className="text-[14px] font-bold">Website Redesign</p>
                <p className="text-[14px] font-bold">1x £14002.33</p>
              </div> */}
                {/* <div className="grid grid-cols-4 w-full gap-6 px-8 py-10 bg-[#F9FAFE] rounded-tl-md rounded-tr-md">
                <p className="text-[13px] text-[#888EAF]">Item Name</p>
                <p className="text-[13px]  text-[#888EAF]">QTY.</p>
                <p className="text-[13px] text-[#888EAF]">Price</p>
                <p className="text-[13px] text-[#888EAF]">Total</p>
                <p className="text-[14px] font-bold">Brand Guidelines</p>
                <p className="text-[14px] font-bold">1</p>
                <p className="text-[14px] font-bold">$1800.9</p>
                <p className="text-[14px] font-bold">$1800.9</p>
              </div> */}
                <div className="hidden md:grid grid-cols-4 w-full gap-6 px-4 md:px-8 py-10 bg-[#F9FAFE] rounded-tl-md rounded-tr-md">
                  {/* <div className="w-full hidden  md:flex justify-between"> */}
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
                  {/* </div> */}
                  {selectedInvoice?.itemsList?.map((item) => (
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
                        ${item.total}.00
                      </p>
                    </>
                  ))}
                </div>
                <div className="md:hidden flex flex-col gap-6 px-4 md:px-8 py-10 bg-[#F9FAFE] w-full ">
                  {selectedInvoice.itemsList?.map((item) => (
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
                        ${item.total}.00
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-white items-center w-full px-4 py-6 bg-[#373B53] rounded-bl-md rounded-br-md">
                  <p className="text-[14px]">Amount Due</p>
                  <p className="text-2xl font-bold">
                    $
                    {selectedInvoice.itemsList?.reduce((acc, item) => {
                      return item.total + acc;
                    }, 0)}
                    .00
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute  md:hidden bottom-0 bg-white rounded-lg py-6 px-4 md:px-6 w-full flex justify-between items-center">
            {/* <div className="hidden md:flex gap-4 items-center">
              <span className="text-xs capitalize text-[#888EAF]">status</span>
              {selectedInvoice.status == "paid" && (
                <div className="text-green-400 px-7 py-2 text-[12px] bg-[#F5FDFA] flex gap-2 items-center text-bold rounded-md capitalize">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span>Paid</span>
                </div>
              )}
              {selectedInvoice.status == "pending" && (
                <div className="text-[#FF8F00] px-7 py-2 text-[12px] bg-[#FFF9F2] flex gap-2 items-center text-bold rounded-md capitalize">
                  <div className="w-2 h-2 rounded-full bg-[#FF8F00]"></div>
                  <span>Pending</span>
                </div>
              )}
              {selectedInvoice.status == "draft" && (
                <div className="text-[#373B53] px-7 py-2 text-[12px] bg-[#F5F5F6] flex gap-2 items-center text-bold rounded-md capitalize">
                  <div className="w-2 h-2 rounded-full bg-[#373B53]"></div>
                  <span>Draft</span>
                </div>
              )}
            </div> */}
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
                className="text-xs p-4 md:px-6 py-4 rounded-3xl font-bold bg-[#E5DFFE] text-white"
              >
                Mark as Paid
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
            {`Are you sure you want to delete invoice ${selectedInvoice.code}? This action cannot
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
                deleteInvoiceHandler(selectedInvoice.id);
                router.push("/");
              }}
              className="text-xs p-4 md:px-6 py-4 capitalize rounded-3xl bg-red-500 font-bold text-white"
            >
              delete
            </button>
          </div>
        </div>
      </Modal>
      {/* <div
        className={
          "transition-colors duration-300 fixed inset-0  w-full z-20  flex items-center justify-center " +
          (isDeleteModalActive ? "visible bg-overlay-color" : "invisible")
        }
      >
        <div
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
            {`Are you sure you want to delete invoice ${selectedInvoice.code}? This action cannot
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
                deleteInvoiceHandler(selectedInvoice.id);
                router.push("/");
              }}
              className="text-xs p-4 md:px-6 py-4 capitalize rounded-3xl bg-red-500 font-bold text-white"
            >
              delete
            </button>
          </div>
        </div>
      </div> */}
      <Form invoice={selectedInvoice} submitFormHandler={onSubmit} />
    </>
  );
};

export default WithAuth(ReceiptPage);
