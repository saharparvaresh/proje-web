import React from "react";
import ReactDOM from 'react-dom'
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import { Col } from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi";
import { cartRemoveAction } from "./../redux/action/cartOperationAction"
import { connect } from "react-redux";

function TooltipCart(props) {

    const { cartDetail, cartRemoveAction } = props;

    const showTooltipCart = (e) => {
        e.stopPropagation()
        props.setTooltipCart(true)
    }

    const hideTooltipCart = (e) => {
        e.stopPropagation()
        props.setTooltipCart(false)
    }


    const deleteCartHandler = (cartProductId) => {
        if (cartDetail !== null) {
            cartRemoveAction(cartDetail.filter(cartVal => cartVal.id !== cartProductId));
        }
    }


    return ReactDOM.createPortal((
        <div onMouseEnter={showTooltipCart} onMouseLeave={hideTooltipCart} className="shadow-lg bg-white p-4 rounded-3">
            {
                cartDetail !== null && cartDetail.length > 0
                    ? (
                        <>
                            <div className="d-flex">
                                <Col lg={"5"} as={"h6"} className={"px-2"}> نام کالا </Col>
                                <Col lg={"4"} as={"h6"} className={"px-2"}> قیمت تکی </Col>
                                <Col lg={"2"} as={"h6"} className={"px-2"}> تعداد </Col>
                            </div>
                            {
                                cartDetail.map(cartVal => (
                                    <div key={cartVal.id} className="d-flex">
                                        <Col lg={"5"} as={"h6"} className="text-info my-2 px-2"> {cartVal.name} </Col>
                                        <Col lg={"4"} as={"span"} className="text-info my-2 px-2"> {cartVal.price} تومان </Col>
                                        <Col lg={"2"} as={"span"} className="text-info my-2 px-2"> {cartVal.count} عدد </Col>
                                        <Col lg={"1"} className="my-2 ms-2">
                                            <FiTrash2 onClick={() => deleteCartHandler(cartVal.id)} size={"20"} className="cursor-pointer text-danger" />
                                        </Col>
                                    </div>
                                ))
                            }
                        </>
                    )
                    : (
                        <h6 className="m-0"> سبد خرید شما خالی است </h6>
                    )
            }
        </div>
    ), document.getElementById("tooltip-cart"))
}


const mapStateToProps = (state) => {
    return {
        cartDetail: state.cartOperationState.cartDetail
    }
}


const mapDispatchToProps = {
    cartRemoveAction
}


export default connect(mapStateToProps, mapDispatchToProps)(TooltipCart);