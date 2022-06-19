import axios from "axios";
import server from "../../config/server";
import { DATA_FETCHING } from "../types"



export const dataFetchingAction = (state) => {
    return async (dispatch, getState) => {
        const resProducts = await server({
            method: "GET",
            url: "/products",
            params: {
                "category": getState().filterState.filteration.filterSelect !== "" ? getState().filterState.filteration.filterSelect : null,
                "_sort": "number",
                "_order": "desc",
                "_limit": getState().filterState.filteration.limit,
                "_page": getState().filterState.filteration.paginationIndex,
            }
        });
        const products = resProducts.data;


        products.map(product => {
            product.price = parseInt(product.price).toLocaleString("en-us")
        })

        let product;
        if (state !== undefined) {
            const resProduct = await server(`/products/${state.productId}`)
            product = resProduct.data;
            product.price = parseInt(product.price).toLocaleString("en-us")
        }


        getState().dataState.totalProducts = resProducts.headers["x-total-count"];


        const resCategories = await server.get("/category");
        const categories = resCategories.data;

        let orders = [];
        if (getState().fromState.token !== null) {
            const resOreders = await server({
                method: "GET",
                url: "/orders",
                headers: {
                    "token": getState().fromState.token
                }
            });
            orders = resOreders.data;
        }

        dispatch(dataFetchingFunc({ products, product, categories, orders }))
    }
}


export const dataFetchingFunc = (state) => {
    return {
        type: DATA_FETCHING,
        totalProducts: "",
        payload: {
            products: state.products,
            product: state.product,
            categories: state.categories,
            orders: state.orders
        }
    }
}



