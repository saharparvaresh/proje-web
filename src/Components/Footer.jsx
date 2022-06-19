import React from "react";
import ReactDOM from "react-dom";

const Footer = ({ loaded }) => {

  return <div className="main-footer">
    <div className="container">
      <div className="row">
        {/*column1*/}
        <div className="col">
          <h4>ارتباط با ما</h4>
          <ul className="list-unstyle">
            <li>087-38-22222</li>
            <li>iran-sanandaj</li>
            <li>abidar</li>
          </ul>
        </div>
        {/*column2*/}
        <div className="col">
          <h4>شبکه های اجتماعی</h4>
          <ul className="list-unstyle">
            <li>اینستاگرام</li>
            <li>تلگرام</li>
            <li>توییتر</li>
          </ul>
        </div>

        {/*column3*/}
      </div>
      <hr />
      <div className="row">
        <p className="col-sm">
          تمامی حق و حقوق این وب سایت محفوظ میباشد و کپی برداری برهر نحوه پیگرد قانونی دارد
        </p>

      </div>
    </div>
  </div>;
};

export default Footer;
