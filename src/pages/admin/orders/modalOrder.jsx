import React from 'react'
import { Button, Col, Modal, Stack } from 'react-bootstrap'
import { connect } from 'react-redux'
import { isShowModalAction, dataModalOrderUpdateAction } from "./../../../redux/action/ordersAction"


function ModalOrder(props) {

    const { isShowModalOrder, typeOrder, dataModalOrder } = props.modalOrderState
    const { dataFetching } = props.dataFetchingOrderState
    const { isShowModalAction, dataModalOrderUpdateAction } = props

    const deliveryAtDateHandler = (orderId) => {
        const newDeliveryAtDate = new Date().getTime();
        dataModalOrderUpdateAction({ orderStatus: "Delivered", deliveredAt: newDeliveryAtDate, orderId: orderId })
        isShowModalAction({ isShowModal: false, orderId: null })
    }


    const hideModalHandler = () => {
        isShowModalAction({ isShowModal: false, orderId: null })
    }


    return (
        <>
            <Modal show={isShowModalOrder.isShowModal} onHide={hideModalHandler} className="p-0">
                <Modal.Header closeButton>
                    <Modal.Title>نمایش سفارش</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        dataFetching.orders.length !== 0
                        && dataFetching.orders.map(order => {
                            const deliveryAtFaDate = new Date(order.deliveredAt).toLocaleDateString("fa");
                            const orderFaDate = new Date(order.delivery || order.process).toLocaleDateString("fa");
                            return order.orderStatus === typeOrder && isShowModalOrder.orderId === order.id
                                && (
                                    <div key={order.id}>
                                        <div className="my-3">
                                            <span className="fw-bold">نام مشتری: </span> <span className="text-primary"> {order.customerDetail.firstName} {order.customerDetail.lastName} </span>
                                        </div>
                                        <div className="my-3">
                                            <span className="fw-bold">آدرس: </span> <span className="text-primary"> {order.customerDetail.billingAddress} </span>
                                        </div>
                                        <div className="my-3">
                                            <span className="fw-bold">تلفن: </span> <span className="text-primary"> {order.customerDetail.phone} </span>
                                        </div>
                                        <div className="my-3">
                                            {
                                                order.orderStatus === "Processing"
                                                    ? (
                                                        <>
                                                            <span className="fw-bold">زمان تحویل: </span> <span className="text-primary"> تحویل داده نشده </span>
                                                        </>
                                                    )
                                                    : (
                                                        <>
                                                            <span className="fw-bold">زمان تحویل: </span> <span className="text-primary"> {deliveryAtFaDate} </span>
                                                        </>
                                                    )
                                            }
                                        </div>
                                        <div className="my-3">
                                            <span className="fw-bold">زمان سفارش: </span> <span className="text-primary"> {orderFaDate} </span>
                                        </div>
                                        <Stack style={{ boxShadow: "0px 8px 50px -9px #8989893d" }} className="my-4 p-2 bg-white rounded-3">
                                            <div style={{ backgroundColor: "#e5f4f5" }} className="d-flex p-3 text-info rounded-3">
                                                <Col lg={"6"} as="h6" className="mb-0">کالا</Col>
                                                <Col lg={"4"} as="h6" className="mb-0">قیمت</Col>
                                                <Col lg={"2"} as="h6" className="mb-0">تعداد</Col>
                                            </div>
                                            {
                                                order.orderItems.map((orderItem, index) => (
                                                    <div key={index} className="d-flex p-3 rounded-3">
                                                        <Col lg={"6"}> {orderItem.name} </Col>
                                                        <Col lg={"4"}> {parseInt(orderItem.price).toLocaleString("en-us")} تومان </Col>
                                                        <Col lg={"2"}> {orderItem.quantity} </Col>
                                                    </div>
                                                ))
                                            }
                                        </Stack>
                                        {
                                            order.orderStatus === "Processing"
                                            && <Button className="w-100 my-2" onClick={() => deliveryAtDateHandler(order.id)}>تحویل شد</Button>
                                        }
                                    </div>
                                )
                        })
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        modalOrderState: state.orderState,
        dataFetchingOrderState: state.dataState,
    }
}


const mapDispatchToProps = {
    isShowModalAction,
    dataModalOrderUpdateAction
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalOrder)