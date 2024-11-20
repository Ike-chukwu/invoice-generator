import { InvoiceResponse } from "@/services/invoice/types";
import React from "react";
import Link from "next/link";
import { addDays } from "@/helper";

type Prop = {
  invoice: InvoiceResponse;
};

const SmallInvoiceCard = ({ invoice }: Prop) => {
  return (
    <Link href={`/invoices/${invoice?._id}`} key={invoice?._id}>
      <div className=" py-6 rounded-md bg-white px-6 flex md:hidden flex-col gap-8 justify-between items-center w-full">
        <div className="flex justify-between w-full">
          <span className="text-[#0C0E16] text-[14px] font-bold">
            <span className="text-[#7E88C3] font-normal">
              {invoice?.code?.slice(0, 1)}
            </span>
            {invoice?.code?.slice(1, 7)}
          </span>
          <span className="text-[#7E88C3] font-bold text-[13px] capitalize">
            {invoice?.clientName}
          </span>
        </div>
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col gap-1 items-start">
            <span className="text-[#7E88C3] text-[13px]  capitalize">
              due{" "}
              {new Date(
                addDays(invoice?.invoiceDate, parseInt(invoice?.paymentTerms))
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </span>
            <span className="text-[#0C0E16] text-[14px] font-bold  capitalize">
              $
              {invoice?.itemsList?.reduce((acc, item) => {
                return (item?.itemQuantity ?? 0) * (item?.itemPrice ?? 0) + acc;
              }, 0)}
              .00
            </span>
          </div>
          {invoice?.status == "paid" && (
            <div className="text-green-400 w-[5rem] py-3 text-[12px] bg-[#F5FDFA] flex gap-2 items-center text-bold rounded-md justify-center capitalize">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span>Paid</span>
            </div>
          )}
          {invoice?.status == "pending" && (
            <div className="text-[#FF8F00] w-[5rem] py-3 text-[12px] bg-[#FFF9F2] flex gap-2 items-center text-bold rounded-md justify-center capitalize">
              <div className="w-2 h-2 rounded-full bg-[#FF8F00]"></div>
              <span>Pending</span>
            </div>
          )}
          {invoice?.status == "draft" && (
            <div className="text-[#373B53] w-[5rem] py-3 text-[12px] bg-[#F5F5F6] flex gap-2 items-center text-bold rounded-md justify-center capitalize">
              <div className="w-2 h-2 rounded-full bg-[#373B53]"></div>
              <span>Draft</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SmallInvoiceCard;
