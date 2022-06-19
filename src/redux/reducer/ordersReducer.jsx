import { DATA_MODAL_ORDER_UPDATE, IS_SHOW_MODAL_ORDER, TYPE_ORDER } from "../types";


const initialState = {
    isShowModalOrder: {
        isShowModal: false,
        orderId: null
    },
    typeOrder: "Processing",
    dataModalOrder: ""
}


export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_SHOW_MODAL_ORDER:
            return {
                ...state,
                isShowModalOrder: action.payload
            }
        case TYPE_ORDER:
            return {
                ...state,
                typeOrder: action.payload
            }
        case DATA_MODAL_ORDER_UPDATE:
            return {
                ...state,
                dataModalOrder: action.payload
            }
        default:
            return state
    }
}

