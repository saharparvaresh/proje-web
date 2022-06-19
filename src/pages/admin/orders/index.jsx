import React, { useEffect, useState } from 'react'
import { Col, Stack } from 'react-bootstrap';
import { FiToggleRight, FiToggleLeft } from "react-icons/fi";
import { connect } from 'react-redux';
import server from '../../../config/server';
import { dataFetchingAction } from "./../../../redux/action/dataFetchingAction"
import { isShowModalAction, typeOrderAction } from "./../../../redux/action/ordersAction"
import ModalOrder from './modalOrder';


function Index(props) {

    // const [typeOrder, setTypeOrder] = useState("Processing");

    const { dataFetching } = props.dataFetchingState;
    const { typeOrder, dataModalOrder } = props.orderModalState;
    const { dataFetchingAction, isShowModalAction, typeOrderAction } = props


    const switchHandler = () => {
        if (typeOrder === "Processing") {
            typeOrderAction("Delivered")
        } else {
            typeOrderAction("Processing")
        }
    }


    const showModalHandler = (orderId) => {
        isShowModalAction({ isShowModal: true, orderId })
    }


    useEffect(() => {
        dataFetchingAction()
    }, [dataModalOrder])


    return (
        <>
            <Stack>
                <h3 className="text-center">مدیریت سفارش ها</h3>
                <div className="d-flex justify-content-center align-items-center mt-3">
                    <span className={`cursor-pointer ${typeOrder === "Delivered" && `link-active`}`} onClick={switchHandler}>سفارش ها تحویل شده</span>
                    {
                        typeOrder === "Delivered"
                            ? <FiToggleRight size={25} className="link-active mx-2 cursor-pointer" onClick={switchHandler} />
                            : <FiToggleLeft size={25} className="link-active mx-2 cursor-pointer" onClick={switchHandler} />
                    }
                    <span className={`cursor-pointer ${typeOrder === "Processing" && `link-active`}`} onClick={switchHandler}>سفارش ها در انتظار ارسال</span>
                </div>
            </Stack>

            <Stack style={{ boxShadow: "0px 8px 50px -9px #8989893d" }} className="my-4 p-2 rounded-3">
                <div style={{ backgroundColor: "#e5f4f5" }} className="d-flex p-3 text-info rounded-3">
                    <Col as="h6" className="mb-0">نام کاربری</Col>
                    <Col as="h6" className="mb-0">مجموع مبلغ</Col>
                    <Col as="h6" className="mb-0">زمان ثبت سفارش</Col>
                    <Col lg={2} as="h6" className="mb-0">بررسی</Col>
                </div>

                {
                    dataFetching.orders.length !== 0
                        ? dataFetching.orders.map(order => {
                            const date = new Date(order.orderDate || order.createdAt);
                            const faDate = date.toLocaleDateString("fa")
                            return order.orderStatus === typeOrder && (
                                <div key={order.id} className="d-flex p-3 text-dark rounded-3" >
                                    <Col> {order.customerDetail.firstName} {order.customerDetail.lastName} </Col>
                                    <Col> {order.purchaseTotal} تومان</Col>
                                    <Col> {faDate} </Col>
                                    <Col className="cursor-pointer link-hover" lg={2} onClick={() => showModalHandler(order.id)}>بررسی سفارش</Col>
                                </div>
                            )
                        })
                        : <h1>در حال لود شدن</h1>
                }

            </Stack>
            <ModalOrder />
        </>
    )
}


const mapStateToProps = state => {
    return {
        orderState: state.fromState,
        dataFetchingState: state.dataState,
        orderModalState: state.orderState
    }
}


const mapDispatchToProps = {
    dataFetchingAction,
    isShowModalAction,
    typeOrderAction
}


export default connect(mapStateToProps, mapDispatchToProps)(Index)