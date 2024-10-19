import React from "react";
import Header from "@/components/Header";
import Footer from "./components/Footer";

// Layout component for the app, includes Header, Footer, and main content area
const AppLayout = ({ children }) => {
  return (
    <>
      <div className="px-4 sm:px-20">
        <Header />
        {/* Main content section */}
        <main className="min-h-screen container">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
