import React from "react";
import { MoonIcon } from "./icons";

const Sidebar = () => {
  return (
    <div className="fixed z-40 flex pr-4 lg:pr-0 lg:flex-col lg:items-center lg:w-[100px] justify-between left-0 top-0 w-full lg:bottom-0 lg:rounded-tr-[1.2rem] lg:rounded-br-[1.2rem] bg-[#373B53]">
      <img
        src="/assets/logo.png"
        className="w-[70px] h-[70px] lg:w-auto lg:h-auto"
        alt=""
      />
      <div className="flex gap-4 lg:w-full lg:flex-col items-center lg:gap-8 lg:py-6">
        <div className="block  lg:hidden">
          <MoonIcon />
        </div>
        <div className="w-full border-l-2 border-l-[#494E6E] pl-4 lg:pl-0   h-full lg:h-auto items-center  flex lg:pt-5 justify-center lg:border-t-2 lg:border-t-[#494E6E] ">
          <div className="w-9 h-9 lg:w-12 lg:h-12 rounded-full flex items-center justify-center bg-red-500">
            Ik
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
