import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { dataFetchingReducer } from "../reducer/dataFetchingReducer";
import { filterationReducer } from "../reducer/filterationReducer";
import { formReducer } from "../reducer/formReducer";
import { modalReducer } from "../reducer/modalReducer";
import { productOperationReducer } from "../reducer/productOperationReducer";
import { cartOperationReducer } from "../reducer/cartOperationReducer";
import { orderReducer } from "../reducer/ordersReducer";
import { paymentReducer } from "../reducer/paymentReducer";


export const store = createStore(combineReducers({
    fromState: formReducer,
    dataState: dataFetchingReducer,
    filterState: filterationReducer,
    modalState: modalReducer,
    productOperationState: productOperationReducer,
    cartOperationState: cartOperationReducer,
    orderState: orderReducer,
    paymentState: paymentReducer
}), applyMiddleware(thunk))

