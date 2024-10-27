import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
          <p className="w-full md:w-2/3 text-gray-600">
          our mission is to redefine fashion with premium quality and
            cutting-edge designs that speak to individuality and style. We
            believe in creating clothing that empowers people to express their
            unique personalities
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91-3456789012</li>
            <li>piiwear@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="py-5 text-sm text-center">
        Copyright 2024@ piiWEAR.com - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
