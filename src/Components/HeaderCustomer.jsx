import React from "react";
import { Link } from "react-router-dom";

const HeaderCustomer = ({ style }) => {

  return (
    <>

      <Link to="p" style={{ color: style.linkPrimary }} className="link-hover text-decoration-none">سبد خرید</Link>

    </>
  );

};

export default HeaderCustomer;
