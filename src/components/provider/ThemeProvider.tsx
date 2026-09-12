'use client'
import React from "react";
import UseThemeCheck from "@/hooks/UseThemeCheck";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  UseThemeCheck();
  return (
    <>
      {children}
    </>
  );
};

export default ThemeProvider;
