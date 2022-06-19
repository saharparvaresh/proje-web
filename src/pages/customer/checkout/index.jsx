import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { connect } from 'react-redux'

function Checkout(props) {

    const [offerCode, setOfferCode] = useState("");
    const [isOfferCode, setIsOfferCode] = useState(true);
    const [totalPrice, setTotalPrice] = useState([])
    const [isValidate, setIsValidate] = useState(false);
    const [validate, setValidate] = useState(false);

    const [billingValue, setBillingValue] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        zip: ""
    })


    const { cartDetail } = props.checkoutState



    const offerCodeChangeHandler = (e) => {
        setOfferCode(e.target.value)
    }

    const offerCodeClickHandler = () => {
        if (offerCode === "firstcode" && isOfferCode) {
            setTotalPrice([totalPrice - 500000])
            setOfferCode("")
            setIsOfferCode(false)
        } else {
            alert("کد تخفیف درست نیست")
        }
    }


    const submitHandler = (e) => {
        e.preventDefault();
        if (e.target.checkValidity() === false) {
            setIsValidate(true)
        } else {
            setValidate(true)
        }
    }


    useEffect(() => {
        if (cartDetail !== null) {
            setTotalPrice(cartDetail.map(cartVal => cartVal.price.split(",").join("") * cartVal.count).reduce((a, b) => a + b, 0));
        }
    }, [cartDetail])




    return (
        <>
            <section className="py-2">
                <Container className="px-4 my-5">
                    <Row className="flex-row-reverse">
                        <Col lg={"4"} className="mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">سبد خرید</span>
                            </h4>
                            <ListGroup className="mb-3">
                                {
                                    cartDetail.length !== 0
                                    && cartDetail.map(cartVal => (
                                        <ListGroupItem key={cartVal.id} className="d-flex justify-content-between pt-3">
                                            <div>
                                                <h6 className="mb-2"> {cartVal.name} </h6>
                                                <span> {cartVal.count} عدد </span>
                                            </div>
                                            <span className="text-muted"> {cartVal.price} تومان </span>
                                        </ListGroupItem>
                                    ))
                                }

                                <ListGroupItem className="d-flex justify-content-between pt-3 pb-2 bg-light">
                                    <h6>مجموع</h6>
                                    <span className="text-primary fw-bold">{totalPrice.toLocaleString("en-us")} تومان</span>
                                </ListGroupItem>
                            </ListGroup>
                            <Form className="card p-2">
                                <div className="input-group">
                                    <Form.Control type="text" className="me-2" placeholder="کد تخفیف" value={offerCode} onChange={offerCodeChangeHandler} />
                                    <div className="input-group-append">
                                        <Button type="button" className="btn btn-primary px-4" onClick={offerCodeClickHandler}>تخفیف</Button>
                                    </div>
                                </div>
                            </Form>
                        </Col>
                        <Col lg={"8"}>
                            <h4 className="mb-3">اطلاعات تسویه حساب</h4>
                            <Form noValidate validated={isValidate} onSubmit={submitHandler}>
                                <Row className="row">
                                    <Col lg={"6"} className="mb-3">
                                        <Form.Label htmlFor="firstName">نام</Form.Label>
                                        <Form.Control type="text" id="firstName" placeholder="نام" value={billingValue.firstName} onChange={(e) => setBillingValue({ ...billingValue, firstName: e.target.value })} required />
                                    </Col>
                                    <Col lg={"6"} className="mb-3">
                                        <Form.Label htmlFor="lastName">نام خانوادگی</Form.Label>
                                        <Form.Control type="text" id="lastName" placeholder="نام خانوادگی" value={billingValue.lastName} onChange={(e) => setBillingValue({ ...billingValue, lastName: e.target.value })} required />
                                    </Col>
                                </Row>
                                <div className="mb-3">
                                    <Form.Label htmlFor="username">ایمیل</Form.Label>
                                    <Form.Control type="email" id="username" placeholder="ایمیل خود را وارد کنید" value={billingValue.email} onChange={(e) => setBillingValue({ ...billingValue, email: e.target.value })} required />
                                </div>
                                <div className="mb-3">
                                    <Form.Label htmlFor="address">آدرس</Form.Label>
                                    <Form.Control type="text" id="address" placeholder="آدرس خود را بنویسید" value={billingValue.address} onChange={(e) => setBillingValue({ ...billingValue, address: e.target.value })} required />
                                </div>
                                <Col lg={"12"} className="mb-3">
                                    <Form.Label htmlFor="zip">کدپستی</Form.Label>
                                    <Form.Control type="text" id="zip" value={billingValue.zip} onChange={(e) => setBillingValue({ ...billingValue, zip: e.target.value })} />
                                </Col>
                                <hr className="my-4" />
                                <h4 className="mb-3">نحوه پرداخت</h4>
                                <div className="d-block my-3">
                                    <div className="form-check">
                                        <Form.Check type="radio" id="zarinpal" defaultChecked required />
                                        <Form.Label className="form-check-label" htmlFor="zarinpal">زرین پال</Form.Label>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <Button type="submit">
                                    <a href={validate ? "/Customer/PayMock" : null} target="_blank" className="text-white text-decoration-none px-3">
                                        تسویه حساب
                                    </a>
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}



const mapStateToProps = (state) => {
    return {
        checkoutState: state.cartOperationState
    }
}



export default connect(mapStateToProps, null)(Checkout)