import { PAYMENT_RESULT } from "../types"


const initialState = {
    isPaymentResult: false
}


export const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT_RESULT:
            return {
                isPaymentResult: action.payload
            }
        default:
            return state
    }
}