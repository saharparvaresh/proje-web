import { CHANGE_VALUE_ACTION, FORM_MODAL_BOX, LOGIN, REGISTER, SAVE_TOKEN, SUBMIT } from "../types"

export const loginAction = () => {
    return {
        type: LOGIN
    }
}


export const registerAction = () => {
    return {
        type: REGISTER,
    }
}


export const changeValueAction = (state) => {
    return {
        type: CHANGE_VALUE_ACTION,
        payload: {
            userName: state.userName,
            email: state.email,
            roleUser: state.roleUser,
            password: state.password
        }
    }
}

export const submitAction = (state) => {
    return {
        type: SUBMIT,
        payload: {
            validateUser: state.validateUser,
            validateModalForm: state.validateModalForm,
            isValidate: state.isValidate,
            role: state.role
        }
    }
}

export const saveTokenAction = (state) => {
    return {
        type: SAVE_TOKEN,
        payload: state
    }
}



export const formModalAction = (state) => {
    return {
        type: FORM_MODAL_BOX,
        payload: {
            name: state.name,
            category: state.category,
            brand: state.brand,
            price: state.price,
            count: state.count,
            description: state.description,
            images: state.images,
            thumbnail: state.thumbnail
        }
    }
}










