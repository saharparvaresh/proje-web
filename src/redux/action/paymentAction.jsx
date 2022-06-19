import { PAYMENT_RESULT } from "../types"

export const paymentAction = (state) => {
    return {
        type: PAYMENT_RESULT,
        payload: state
    }
}