import server from "../../config/server"
import { DATA_PRODUCT_MANAGAE_GET, DATA_PRODUCT_PRICE_GET, DATA_PRODUCT_COUNT_GET, IS_EDIT_SAVE_PRDOUCTS } from "../types"


export const productOperationAction = (state) => {
    return {
        type: IS_EDIT_SAVE_PRDOUCTS,
        payload: {
            isEditState: state.isEditState,
            isSaveState: state.isSaveState
        }
    }
}



export const dataProductManageAction = () => {
    return async (dispatch, getState) => {
        const { products } = getState().dataState.dataFetching;
        const { dataProductPrice, dataProductCount } = getState().productOperationState;
        if (dataProductPrice !== "" || dataProductCount !== "") {
            let [productPriceId, productCountId] = [
                Object.keys(dataProductPrice).map(key => key.split(" ")[1]),
                Object.keys(dataProductCount).map(key => key.split(" ")[1])];


            productPriceId.concat(productCountId).map(async (key) => {

                let newProductPrice = products.find((v, i) => v.id === parseFloat(key))
                let newProductCount = products.find((v, i) => v.id === parseFloat(key))

                let productPrice = Object.values(dataProductPrice).filter(value => value !== newProductPrice.price)
                let productCount = Object.values(dataProductCount).filter(value => value !== newProductCount.count)


                const resProductManage = await server.put(`/products/${key}`, {
                    name: newProductPrice.name,
                    price: productPrice[productPriceId.indexOf(key)] || newProductPrice.price,
                    brand: newProductPrice.brand,
                    category: newProductPrice.category,
                    count: productCount[productCountId.indexOf(key)] || newProductPrice.count,
                    description: newProductPrice.description,
                    images: newProductPrice.images,
                    thumbnail: newProductPrice.thumbnail,
                })
                const productManage = resProductManage.data;
                dispatch({
                    type: DATA_PRODUCT_MANAGAE_GET,
                    payload: productManage
                })
            })
        }

    }
}



export const dataProductPriceAction = (state) => {
    return {
        type: DATA_PRODUCT_PRICE_GET,
        payload: state
    }
}


export const dataProductCountAction = (state) => {
    return {
        type: DATA_PRODUCT_COUNT_GET,
        payload: state
    }
}







