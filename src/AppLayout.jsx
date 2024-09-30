import React from "react";
import Header from "@/components/header";
import Footer from "./components/Footer";

const AppLayout = ({ children }) => {
  return (
    <>
      <div className="px-20">
        <Header />
        <main className="min-h-screen container">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
