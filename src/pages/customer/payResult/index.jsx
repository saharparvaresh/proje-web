import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'

function PayResult(props) {

    const { isPaymentResult } = props.paymentResState

    return (
        <Container>
            <Row>
                <div className={` ${isPaymentResult ? `bg-primary` : `bg-danger`} w-50 m-auto text-white text-center p-5 rounded-3`}>
                    {
                        isPaymentResult
                            ? <h2>پرداخت با موفقیت انجام شد</h2>
                            : <h2>پرداخت ناموفق بود</h2>
                    }
                </div>
            </Row>
        </Container>
    )
}


const mapStateToProps = (state) => {
    return {
        paymentResState: state.paymentState
    }
}

export default connect(mapStateToProps, null)(PayResult)