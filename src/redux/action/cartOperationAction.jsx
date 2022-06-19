import { CART_ADD, CART_REMOVE } from "../types"


export const cartAddAction = (state) => {
    return {
        type: CART_ADD,
        payload: state
    }
}



export const cartRemoveAction = (state) => {
    return {
        type: CART_REMOVE,
        payload: state
    }
}

