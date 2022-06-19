import { CHECKOUT_FORM } from "../types"

export const CheckoutAction = (state) => {
    return {
        type: CHECKOUT_FORM,
        payload: {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            address: state.address,
            zip: state.zip
        }
    }
}