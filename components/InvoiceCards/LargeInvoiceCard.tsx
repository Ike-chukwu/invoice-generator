import { InvoiceResponse } from "@/services/invoice/types";
import React from "react";
import Link from "next/link";
import { addDays } from "@/helper";
import { ArrowRightIcon } from "../icons";

type Prop = {
  invoice: InvoiceResponse;
};

const LargeInvoiceCard = ({ invoice }: Prop) => {
  return (
    <Link href={`/invoices/${invoice?._id}`} key={invoice?._id}>
      <div className="hidden py-6 rounded-md bg-white px-6 md:flex justify-between items-center w-full">
        <div className="flex gap-7 items-center">
          <span className="text-[#0C0E16] text-[14px] font-bold">
            <span className="text-[#7E88C3] font-normal">
              {invoice?.code?.slice(0, 1)}
            </span>
            {invoice?.code?.slice(1, 7)}
          </span>
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
          <span className="text-[#7E88C3] text-[13px] capitalize">
            {invoice?.clientName}
          </span>
        </div>
        <div className="flex gap-7 items-center">
          <span className="text-[#0C0E16] text-[14px] font-bold  capitalize">
            $
            {invoice?.itemsList?.reduce(
              (
                acc: number,
                item: { itemQuantity: number; itemPrice: number }
              ) => {
                return (item?.itemQuantity ?? 0) * (item?.itemPrice ?? 0) + acc;
              },
              0
            )}
            .00
          </span>
          {invoice?.status == "pending" && (
            <div className="text-[#FF8F00] w-[5rem] py-3 text-[12px] bg-[#FFF9F2] flex gap-2 items-center justify-center text-bold rounded-md capitalize">
              <div className="w-2 h-2 rounded-full bg-[#FF8F00]"></div>
              <span>{invoice?.status}</span>
            </div>
          )}
          {invoice?.status == "draft" && (
            <div className="text-[#373B53] w-[5rem] py-3 text-[12px] bg-[#F5F5F6] flex gap-2 items-center justify-center text-bold rounded-md capitalize">
              <div className="w-2 h-2 rounded-full bg-[#373B53]"></div>
              <span>{invoice?.status}</span>
            </div>
          )}
          {invoice?.status == "paid" && (
            <div className="text-[#33D69F] w-[5rem] py-3 text-[12px] bg-[#F5FDFA] flex gap-2 items-center justify-center text-bold rounded-md capitalize">
              <div className="w-2 h-2 rounded-full bg-[#33D69F]"></div>
              <span>{invoice?.status}</span>
            </div>
          )}

          <ArrowRightIcon />
        </div>
      </div>
    </Link>
  );
};

export default LargeInvoiceCard;
