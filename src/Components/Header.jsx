import React, { useEffect, useState } from "react";
import logo from "./../assets/images/logo.png";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import { Container, Row, Stack, Form, FormControl, Nav, Col, Badge } from "react-bootstrap";
import { FiSearch, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { NavLink, Link } from "react-router-dom";
import TooltipCart from "./TooltipCart";
import { connect } from "react-redux";

const Header = (props) => {

    const [tooltipCart, setTooltipCart] = useState(false);

    const { validateUser } = props.headerState;
    const { cartDetail } = props.cartDetailState;

    return (
        <>

            <Container fluid style={{ backgroundColor: props.style.bgColor }} className="px-5 py-3 mb-5">
                <Row>
                    <Stack direction="horizontal" gap={2} className="justify-content-between" >
                        <div className="d-flex align-items-center">
                            {
                                validateUser === false
                                    ? (
                                        <Link to="/Account/Register-Login" className="button-colors me-4 text-decoration-none px-3 py-2 rounded-3"> ورود/ثبت نام </Link>
                                    )
                                    : null
                            }

                            <div>
                                <Link
                                    to="/Customer/Cart"
                                    style={{ color: props.style.linkPrimary }}
                                    className="link-hover position-relative text-decoration-none me-3 bg-light p-2 rounded-3 text-dark"
                                    onMouseOver={() => setTooltipCart(true)}
                                    onMouseOut={() => setTooltipCart(false)}
                                >
                                    <FiShoppingBag size={"20"} />
                                    <Badge className="position-absolute top-0 start-0 w-25 d-flex align-items-center justify-content-center">
                                        {
                                            cartDetail !== null && cartDetail.map(cartVal => cartVal.count).reduce((a, b) => a + b)
                                        }
                                    </Badge>
                                </Link>

                                {
                                    tooltipCart
                                    && <TooltipCart tooltipCart={tooltipCart} setTooltipCart={setTooltipCart} />
                                }
                            </div>

                            {props.children}
                        </div>
                        <div className="d-flex align-items-center">
                            <img width={"100"} src={logo} alt="logo" />
                        </div>
                        <div>
                            <Form className="d-flex align-items-center">
                                <FiSearch />
                                <FormControl
                                    className="border-top-0 border-start-0 border-end-0 border-bottom-2 bg-transparent rounded-0 shadow-none"
                                    type="search"
                                    placeholder="دنبال چه چیزی میگردید؟" />
                            </Form>
                        </div>
                    </Stack>

                    <Nav as="ul" className="d-flex justify-content-center align-items-center mt-4">
                        <Nav.Item as="li">
                            <NavLink className={({ isActive }) => isActive ? "link-active link-primary text-decoration-none px-2 mx-1" : "link-primary link-hover text-decoration-none px-2 mx-1"} to={"/"}>خانه</NavLink>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <NavLink className={({ isActive }) => isActive ? "link-active link-primary text-decoration-none px-2 mx-1" : "link-primary link-hover text-decoration-none px-2 mx-1"} to={"/Customer/Product"}>محصولات</NavLink>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <NavLink className={({ isActive }) => isActive ? "link-active link-primary text-decoration-none px-2 mx-1" : "link-primary link-hover text-decoration-none px-2 mx-1"} to={"/About"}>ارتباط با ما</NavLink>
                        </Nav.Item>
                    </Nav>
                </Row>
            </Container>

        </>
    );
};


const mapStateToProps = (state) => {
    return {
        headerState: state.fromState,
        cartDetailState: state.cartOperationState
    }
}

export default connect(mapStateToProps, null)(Header);
