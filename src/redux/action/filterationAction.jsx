import { FILTERATION } from "../types"

export const filterationAction = (state) => {
    return {
        type: FILTERATION,
        payload: {
            filterSelect: state.filterSelect,
            categoryName: state.categoryName,
            limit: state.limit,
            paginationIndex: state.paginationIndex
        }
    }
}