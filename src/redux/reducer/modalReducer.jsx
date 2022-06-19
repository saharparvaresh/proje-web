import { DATA_MODAL_DELETE, DATA_MODAL_GET, DATA_MODAL_POST, DATA_MODAL_UPDATE, MODAL_BOX } from "../types";


const initialState = {
    isShowModal: "",
    dataModal: "",
    dataModalId: ""
}



export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case MODAL_BOX:
            return {
                ...state,
                isShowModal: action.isShowModal
            }
        case DATA_MODAL_GET:
            return {
                ...state,
                dataModal: action.dataModal,
                dataModalId: action.dataModalId
            }
        case DATA_MODAL_POST:
            return {
                ...state,
                dataModal: action.dataModal
            }
        case DATA_MODAL_UPDATE:
            return {
                ...state,
                dataModal: action.dataModal,
                dataModalId: action.dataModalId
            }
        case DATA_MODAL_DELETE:
            return {
                ...state,
                dataModal: action.dataModal,
                dataModalId: action.dataModalId
            }
        default:
            return state;
    }
}

