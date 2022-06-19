import { DATA_PRODUCT_PRICE_GET, DATA_PRODUCT_COUNT_GET, IS_EDIT_SAVE_PRDOUCTS } from "../types";


const initialState = {
    isEditSaveState: {
        isEditState: true,
        isSaveState: false
    },
    dataProductPrice: "",
    dataProductCount: ""
}


export const productOperationReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_EDIT_SAVE_PRDOUCTS:
            return {
                ...state,
                isEditSaveState: {
                    isEditState: action.payload.isEditState,
                    isSaveState: action.payload.isSaveState
                }
            }
        case DATA_PRODUCT_PRICE_GET:
            return {
                ...state,
                dataProductPrice: action.payload
            }
        case DATA_PRODUCT_COUNT_GET:
            return {
                ...state,
                dataProductCount: action.payload
            }

        default:
            return state
    }
}


