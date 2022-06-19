import { DATA_MODAL_POST, DATA_MODAL_GET, MODAL_BOX, DATA_MODAL_UPDATE, DATA_MODAL_DELETE } from "../types";
import server from "./../../config/server";


export const modalAction = (state) => {
    return {
        type: MODAL_BOX,
        isShowModal: state
    }
}


export const dataModalGetAction = (state) => {
    const { products, productId } = state
    return async (dispatch, getState) => {
        const resProducts = await server.get(`/products/${productId}`)
        const products = resProducts.data;
        dispatch(dataModalGetFunc({ products, productId }))
    }
}

export const dataModalGetFunc = (state) => {
    return {
        type: DATA_MODAL_GET,
        dataModal: state.products,
        dataModalId: state.productId
    }
}


export const dataModalPostAction = (state) => {
    const { newProducts, productId } = state;
    return async (dispatch, getState) => {
        const resProducts = await server.post("/products", newProducts)
        const products = resProducts.data;
        dispatch(dataModalPostFunc({ products }))
    }
}


const dataModalPostFunc = (state) => {
    return {
        type: DATA_MODAL_POST,
        dataModal: state.products
    }
}


export const dataModalUpdateAction = (state) => {
    const { newProducts, productId } = state;
    return async (dispatch, getState) => {
        const resProducts = await server.put(`/products/${productId}`, newProducts)
        const products = resProducts.data;
        dispatch(dataModalUpdateFunc({ products, productId }))
    }
}


const dataModalUpdateFunc = (state) => {
    return {
        type: DATA_MODAL_UPDATE,
        dataModal: state.products,
        dataModalId: state.productId
    }
}




export const dataModalDeleteAction = (state) => {
    const { productId } = state;
    return async (dispatch, getState) => {
        const resProducts = await server.delete(`/products/${productId}`)
        const products = resProducts.data;
        dispatch(dataModalDeleteFunc({ products, productId }))
    }
}


const dataModalDeleteFunc = (state) => {
    return {
        type: DATA_MODAL_DELETE,
        dataModal: state.products,
        dataModalId: state.productId
    }
}



