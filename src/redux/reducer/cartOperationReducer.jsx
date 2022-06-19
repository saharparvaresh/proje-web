import { CART_ADD, CART_REMOVE } from "../types";


const initialState = {
    cartDetail: JSON.parse(localStorage.getItem("cart")),
}

export const cartOperationReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_ADD:
            return {
                ...state,
                cartDetail: action.payload,
            }
        case CART_REMOVE:
            return {
                ...state,
                cartDetail: action.payload
            }
        default:
            return state;
    }
}


