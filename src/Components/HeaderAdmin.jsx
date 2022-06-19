import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isLogout } from "../config/serv";
import { submitAction } from "./../redux/action/formAction"

const HeaderAdmin = (props) => {

  const { validateUser } = props.adminState;
  const { submitAction } = props;

  const logOutHandler = () => {
    submitAction({ ...props.formState, validateUser: false })
    isLogout()
  }


  return (
    validateUser
    && (
      <>
        <Link to="/Admin" style={{ color: props.style.linkPrimary }} className="link-hover text-decoration-none me-3">مدیریت</Link>
        <Link to="/Home" onClick={logOutHandler} style={{ color: props.style.linkPrimary }} className="link-hover text-decoration-none">خروج</Link>
      </>
    )
  );

};


const mapStateToProps = (state) => {
  return {
    adminState: state.fromState
  }
}

const mapDispatchToProps = {
  submitAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAdmin);
