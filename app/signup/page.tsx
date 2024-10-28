"use client";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import Modal from "@/components/UI/Modal";
import React, { useState } from "react";

const Signup = () => {
  const [isAuthModalForSignupFormActive, setisAuthModalForSignupFormActive] =
    useState(true);

  return (
    <div
      className={
        "transition-colors duration-300 bg-overlay-color fixed inset-0 min-h-[100vh] w-full z-20  flex items-center justify-center"
      }
    >
      <RegisterForm />
    </div>
  );
};

export default Signup;
