"use client";
import LoginForm from "@/components/LoginForm";
import Modal from "@/components/UI/Modal";
import React, { useState } from "react";

const Login = () => {
  const [isAuthModalForLoginFormActive, setisAuthModalForLoginFormActive] =
    useState(true);

  return (
    <div
      className={
        "transition-colors duration-300 bg-overlay-color fixed inset-0 min-h-[100vh] w-full z-20  flex items-center justify-center"
      }
    >
      <LoginForm
        isModalActive={isAuthModalForLoginFormActive}
        setIsModalActive={setisAuthModalForLoginFormActive}
      />
    </div>
  );
};

export default Login;
