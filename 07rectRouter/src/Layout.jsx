import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom"; // use for dynamillay change the items

function Layout() {
  return (
    <>
      <Header />
      {/* now we will pass the all pages dynamically */}
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
