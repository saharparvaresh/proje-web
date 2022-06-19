import { FILTERATION } from "../types";


const initialState = {
    filteration: {
        filterSelect: "",
        categoryName: [],
        limit: 5,
        paginationIndex: 1,
    }

}

export const filterationReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILTERATION:
            return {
                ...state,
                filteration: action.payload
            }
        default:
            return state
    }
}


