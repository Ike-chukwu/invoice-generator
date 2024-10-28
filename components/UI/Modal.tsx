import React, { useState } from "react";
import { ReactNode } from "react";

type Props = {
  isModalActive: boolean;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

const Modal = ({ isModalActive, setIsModalActive, children }: Props) => {
  return (
    <div
      onClick={() => setIsModalActive(false)}
      className={
        "transition-colors duration-300 fixed inset-0 min-h-[100vh] w-full z-20  flex items-center justify-center " +
        (isModalActive ? "visible bg-overlay-color" : "invisible")
      }
    >
      {children}
    </div>
  );
};

export default Modal;
