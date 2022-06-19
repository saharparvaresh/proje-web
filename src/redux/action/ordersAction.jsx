import { IS_SHOW_MODAL_ORDER, TYPE_ORDER, DATA_MODAL_ORDER_UPDATE } from "../types"
import server from "../../config/server"

export const isShowModalAction = (state) => {
    return {
        type: IS_SHOW_MODAL_ORDER,
        payload: state
    }
}


export const typeOrderAction = (state) => {
    return {
        type: TYPE_ORDER,
        payload: state
    }
}


export const dataModalOrderUpdateAction = (state) => {
    const { orderStatus, deliveredAt, orderId } = state;
    return async (dispatch, getState) => {
        const resOrder = await server({
            method: "GET",
            url: `/orders/${orderId}`,
            headers: {
                token: getState().fromState.token
            },
            data: {
                orderStatus: orderStatus,
                deliveredAt: deliveredAt,
            }
        })
        const order = resOrder.data;
        delete order.processAt
        dispatch(dataModalOrderUpdateFunc({ order, orderId }))
    }
}

export const dataModalOrderUpdateFunc = (state) => {
    return {
        type: DATA_MODAL_ORDER_UPDATE,
        payload: {
            dataModalOrder: state.order
        }
    }
}

