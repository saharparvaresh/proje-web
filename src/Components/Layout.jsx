import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import HeaderAdmin from "./HeaderAdmin";
import HeaderCustomer from "./HeaderCustomer";
import { saveTokenAction } from "./../redux/action/formAction";


const Layout = (props) => {

    const { validateUser, formValues, token } = props.layoutState;
    const { saveTokenAction } = props;

    const navigate = useNavigate("");


    // const redirectUser = () => {
    //     if (token !== null) {
    //         saveTokenAction(localStorage.getItem("token"))
    //         if (formValues.roleUser === "admin") {
    //             navigate("/Admin")
    //         } else {
    //             navigate("/Customer")
    //         }
    //     }
    // }

    // useEffect(() => {
    //     redirectUser()
    // }, [validateUser])


    const styles = {
        bgColor: "#f5f5f5",
    }

    return (
        <>
            <Header style={styles}>
                {
                    validateUser || token !== null
                        ? formValues.roleUser === "admin"
                            ? <HeaderAdmin style={styles} />
                            : <HeaderCustomer style={styles} />
                        : null
                }
            </Header>

            {props.children}

            <Footer />
        </>
    );
};



const mapStateToProps = (state) => {
    return {
        layoutState: state.fromState
    }
}



export default connect(mapStateToProps, { saveTokenAction })(Layout);
