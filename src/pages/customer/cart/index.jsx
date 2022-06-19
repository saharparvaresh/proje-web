import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { FiTrash2 } from "react-icons/fi";
import { cartRemoveAction } from "./../../../redux/action/cartOperationAction"
import { connect } from 'react-redux'

function Index(props) {


    const { cartDetail } = props.cartDetailState;
    const { cartRemoveAction } = props;
    const navigate = useNavigate("")

    const deleteCartHandler = (cartProductId) => {
        if (cartDetail !== null) {
            cartRemoveAction(cartDetail.filter(cartVal => cartVal.id !== cartProductId));
        }
    }
    localStorage.setItem("cart", JSON.stringify(cartDetail));


    const navigateToProductHandler = (cartDetailId) => {
        navigate(`/Customer/Product/ProductDetail/${cartDetailId}`)
    }

    let totalPrice = [];

    if (cartDetail !== null) {
        totalPrice = cartDetail.map(cartVal => cartVal.price.split(",").join("") * cartVal.count).reduce((a, b) => a + b, 0);
    }


    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if (e.shiftKey && e.ctrlKey) {
                localStorage.removeItem("cart")
            }
        })
    }, [cartDetail])


    return (
        <>
            <Container>
                <Row className="pb-4 border-bottom justify-content-center">
                    <h2>سبد خرید</h2>
                </Row>
                <Row className="py-4 justify-content-center">
                    <Stack style={{ boxShadow: "0px 8px 50px -9px #8989893d" }} className="my-4 p-2 rounded-3">
                        {
                            cartDetail !== null && cartDetail.length > 0
                                ? (
                                    <>
                                        <div style={{ backgroundColor: "#e5f4f5" }} className="d-flex p-3 text-info rounded-3">
                                            <Col lg={5} as="h6" className="mb-0"> نام کالا </Col>
                                            <Col as="h6" className="mb-0">قیمت تکی (تومان)</Col>
                                            <Col as="h6" className="mb-0">تعداد</Col>
                                            <Col lg={1} as="h6" className="mb-0">عملیات</Col>
                                        </div>
                                        {
                                            cartDetail.map(cartVal =>
                                            (
                                                <div key={cartVal.id} className="d-flex align-items-center p-3 text-dark rounded-3">
                                                    <Col lg={5} className="cursor-pointer" onClick={() => navigateToProductHandler(cartVal.id)}> {cartVal.name} </Col>
                                                    <Col> {cartVal.price} </Col>
                                                    <Col> {cartVal.count} </Col>
                                                    <Col lg={1}>
                                                        <FiTrash2 onClick={() => deleteCartHandler(cartVal.id)} className="text-danger cursor-pointer mx-2" size={20} />
                                                    </Col>
                                                </div>
                                            ))
                                        }
                                    </>
                                )
                                : <h4 className="text-center my-3">سبد خرید شما خالی است</h4>

                        }
                    </Stack>
                    <Stack direction="horizontal" className="my-4 justify-content-between align-items-center bg-white shadow-lg p-3 rounded-3">
                        {
                            cartDetail !== null
                            && (
                                <div>
                                    <span className="fs-6 fw-bold">مجموع قیمت : </span>
                                    <span className="fs-5 fw-bold text-primary">{totalPrice.toLocaleString("en-us")} تومان</span>
                                </div>
                            )
                        }
                        <Link to={"/Customer/Checkout"}>
                            <Button disabled={totalPrice > 0 ? false : true}>ادامه خرید</Button>
                        </Link>
                    </Stack>
                </Row>
            </Container>
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        cartDetailState: state.cartOperationState
    }
}


export default connect(mapStateToProps, { cartRemoveAction })(Index)