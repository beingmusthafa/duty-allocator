import React from "react";
import { NavbarHod } from "./NavbarHod";

function HodLayout({ children }) {
  return (
    <div className="background-image-normal w-full h-screen absolute">
      <NavbarHod />
      <div className="container mx-auto px-4">{children}</div>
    </div>
  );
}

export default HodLayout;
