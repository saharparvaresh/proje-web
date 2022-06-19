import { CHANGE_VALUE_ACTION, FORM_MODAL_BOX, LOGIN, REGISTER, SAVE_TOKEN, SUBMIT } from "../types";

const initialState = {
    validateUser: localStorage.getItem("token") !== null ? true : false,
    validateModalForm: false,
    isValidate: false,
    formValues: {
        userName: "",
        email: "",
        roleUser: "admin",
        password: ""
    },
    activeForm: "login",
    role: "",
    token: localStorage.getItem("token"),
    formModal: {
        name: "",
        category: "",
        brand: "",
        price: "",
        count: "",
        description: "",
        images: [],
        thumbnail: ""
    }
}


export const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                activeForm: "login",
                formValues: {
                    userName: "",
                    email: "",
                    password: ""
                },
                isValidate: false,
            }
        case REGISTER:
            return {
                ...state,
                activeForm: "register",
                formValues: {
                    userName: "",
                    email: "",
                    roleUser: "",
                    password: ""
                },
                isValidate: false,
            }
        case CHANGE_VALUE_ACTION:
            return {
                ...state,
                formValues: action.payload
            }
        case SUBMIT:
            return {
                ...state,
                validateUser: action.payload.validateUser,
                validateModalForm: action.payload.validateModalForm,
                isValidate: action.payload.isValidate,
                role: action.payload.role
            }
        case SAVE_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case FORM_MODAL_BOX:
            return {
                ...state,
                formModal: action.payload
            }
        default:
            return state;
    }
}


