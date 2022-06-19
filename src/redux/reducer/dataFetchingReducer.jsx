import { DATA_FETCHING } from "../types";


const initialState = {
    totalProducts: 0,
    dataFetching: {
        products: [],
        product: [],
        categories: [],
        orders: []
    }
}

export const dataFetchingReducer = (state = initialState, action) => {
    switch (action.type) {
        case DATA_FETCHING:
            return {
                ...state,
                dataFetching: action.payload
            }
        default:
            return state
    }
}


