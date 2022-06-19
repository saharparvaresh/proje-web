import React from 'react'
import { Button, Container, Row, Stack } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { paymentAction } from "./../../../redux/action/paymentAction"

function Index(props) {

    const { paymentAction } = props

    return (
        <Container>
            <Row className="mb-5 pb-4 border-bottom">
                <h2>پرداخت</h2>
            </Row>
            <Row className="pb-4">
                <p className="text-center fw-bold fs-5 mb-4">ادامه و نهایی کردن خرید</p>
                <div className="bg-white shadow-lg rounded-3 p-4 mb-3">
                    <p className="text-center fw-bold mb-4">آیا از خرید خود مطمئن هستید؟</p>
                    <Stack direction="horizontal" className="justify-content-center align-items-center">
                        <Link to={"/Customer/payResult"} className="mx-2">
                            <Button variant="primary" className="px-3" onClick={() => paymentAction(true)}>پرداخت موفق</Button>
                        </Link>
                        <Link to={"/Customer/payResult"} className="mx-2">
                            <Button variant="danger" className="px-3" onClick={() => paymentAction(false)}>پرداخت نا موفق</Button>
                        </Link>
                    </Stack>
                </div>
            </Row>
        </Container>
    )
}


const mapDispatchToProps = {
    paymentAction
}


export default connect(null, mapDispatchToProps)(Index)