import { ArrowLeftIcon } from "@/components/icons";
import React from "react";
import Link from "next/link";

const ReceiptPage = () => {
  return (
    <div className="bg-[#F8F8FB] px-4 md:px-10 w-full min-h-[100vh] flex justify-center ">
      <div className="py-[7.5rem] relative lg:py-20 w-[800px] mx-auto flex gap-10 flex-col items-start">
        <Link href="/" className="flex items-center gap-2 md:gap-4">
          <ArrowLeftIcon />
          <span className="text-[14px] font-bold">Go back</span>
        </Link>

        <div className="flex flex-col items-start gap-7 w-full">
          <div className="bg-white rounded-lg py-6 px-4 md:px-6 w-full flex justify-between items-center">
            <div className="flex w-full justify-between md:justify-normal md:w-auto gap-4 items-center">
              <span className="text-xs capitalize text-[#888EAF]">status</span>
              <div className="text-green-400 px-7 py-2 text-[12px] bg-[#F5FDFA] flex gap-2 items-center text-bold rounded-md capitalize">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span>Paid</span>
              </div>
            </div>
            <div className="hidden md:flex gap-2 items-center">
              <button className="text-xs p-4 md:px-6 py-4  capitalize rounded-3xl text-[#7E88C3] bg-[#DFE3FA]">
                edit
              </button>
              <button className="text-xs p-4 md:px-6 py-4 capitalize rounded-3xl bg-red-500 font-bold text-white">
                delete
              </button>
              <button className="text-xs p-4 md:px-6 py-4 rounded-3xl font-bold bg-[#E5DFFE] text-white">
                Mark as Paid
              </button>
            </div>
          </div>
          <div className="bg-white h-[500px] overflow-y-scroll md:h-auto md:overflow-y-hidden rounded-lg py-3 px-4 md:px-6 w-full flex flex-col gap-6 md:gap-10">
            <div className="flex flex-col md:flex-row justify-between md:items-center w-full">
              <div className="">
                <p className="uppercase text-[14px] md:text-[16px] mb-2 text-[#0C0E16] font-bold">
                  RG0314
                </p>
                <span className="text-[12px] md:text-[14px] capitalize text-[#888EAF]">
                  Website Redesign
                </span>
              </div>
              <div className="mt-6 md:mt-auto">
                <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
                  79 Dover Road,
                </p>
                <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
                  Westhall,
                </p>
                <p className="text-[12px] md:text-[14px] capitalize text-[#888EAF]">
                  IP19 3PF,
                </p>
              </div>
            </div>
            <div className="flex w-full justify-between md:justify-normal md:w-auto md:gap-[8rem]">
              <div className="flex flex-col items-start gap-9">
                <div className="">
                  <p className="text-[12px] md:text-[14px] mb-2 capitalize text-[#888EAF]">
                    Invoice Date
                  </p>
                  <p className="text-[14px] md:text-lg font-bold">2021-9-24</p>
                </div>
                <div className="">
                  <p className="text-[12px] md:text-[14px] mb-2 capitalize text-[#888EAF]">
                    Payment Due
                  </p>
                  <p className="text-[14px] md:text-lg font-bold">2021-9-24</p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-3">
                <div className="">
                  <p className="text-[14px] mb-2 capitalize text-[#888EAF]">
                    bill to
                  </p>
                  <p className="text-[14px] md:text-lg font-bold">
                    John Morrison
                  </p>
                </div>
                <div className="flex flex-col items-start ">
                  <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
                    19 Union Terrace,
                  </p>
                  <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
                    London,
                  </p>
                  <p className="text-[12px] md:text-[14px] mb-1 capitalize text-[#888EAF]">
                    E1 3EZ,
                  </p>
                  <p className="text-[12px] md:text-[14px] capitalize text-[#888EAF]">
                    United Kingdom
                  </p>
                </div>
              </div>
              <div className="hidden md:block">
                <p className="text-[14px] mb-2 capitalize text-[#888EAF]">
                  sent to
                </p>
                <p className="text-[14px] md:text-lg font-bold">jm@myco.com</p>
              </div>
            </div>
            <div className="block md:hidden">
              <p className="text-[14px] mb-2 capitalize text-[#888EAF]">
                sent to
              </p>
              <p className="text-[14px] md:text-lg font-bold">jm@myco.com</p>
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
              <div className="flex flex-row items-center md:items-start md:flex-col w-full gap-6 px-4 md:px-8 py-10 bg-[#F9FAFE] rounded-tl-md rounded-tr-md">
                <div className="w-full hidden  md:flex justify-between">
                  <p className="text-[13px] hidden md:block text-[#888EAF]">
                    Item Name
                  </p>
                  <p className="text-[13px] hidden md:block  text-[#888EAF]">
                    QTY.
                  </p>
                  <p className="text-[13px] hidden md:block text-[#888EAF]">
                    Price
                  </p>
                  <p className="text-[13px] hidden md:block text-[#888EAF]">
                    Total
                  </p>
                </div>
                <div className="w-full item flex-col md:flex-row gap-2 flex  md: justify-between">
                  <p className="text-[13px] md:text-[14px] font-bold">
                    Brand Guidelines
                  </p>
                  <p className="text-[13px] hidden md:block md:text-[14px] text-black font-bold">
                    1{" "}
                    <span className="mr-1 text-[#888EAF] md:hidden inline">
                      x
                    </span>
                  </p>
                  <p className="text-[13px] hidden md:block md:text-[14px] text-black font-bold">
                    $1800.9
                  </p>
                  <div className="flex md:hidden  ">
                    <p className="text-[13px] text-[] md:text-[14px] text-[#888EAF] md:text-black font-bold">
                      1{" "}
                      <span className="mr-1 text-[#888EAF] md:hidden inline">
                        x
                      </span>
                    </p>
                    <p className="text-[13px] text-[] md:text-[14px] text-[#888EAF] md:text-black font-bold">
                      $1800.9
                    </p>
                  </div>
                  <p className="text-[13px] hidden md:block md:text-[14px] font-bold">
                    $1800.9
                  </p>
                </div>
                <p className="text-[13px] block md:hidden font-bold">$1800.9</p>
              </div>
              <div className="flex justify-between text-white items-center w-full px-4 py-6 bg-[#373B53] rounded-bl-md rounded-br-md">
                <p className="text-[14px]">Amount Due</p>
                <p className="text-2xl font-bold">£14002.33</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute  md:hidden bottom-0 bg-white rounded-lg py-6 px-4 md:px-6 w-full flex justify-between items-center">
          <div className="hidden md:flex gap-4 items-center">
            <span className="text-xs capitalize text-[#888EAF]">status</span>
            <div className="text-green-400 px-7 py-2 text-[12px] bg-[#F5FDFA] flex gap-2 items-center text-bold rounded-md capitalize">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span>Paid</span>
            </div>
          </div>
          <div className="w-full md:w-auto justify-between md:justify-normal flex gap-2 items-center">
            <button className="text-xs p-4 md:px-6 py-4  capitalize rounded-3xl text-[#7E88C3] bg-[#DFE3FA]">
              edit
            </button>
            <button className="text-xs p-4 md:px-6 py-4 capitalize rounded-3xl bg-red-500 font-bold text-white">
              delete
            </button>
            <button className="text-xs p-4 md:px-6 py-4 rounded-3xl font-bold bg-[#E5DFFE] text-white">
              Mark as Paid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
