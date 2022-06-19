import React, { useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { modalAction, dataModalPostAction, dataModalUpdateAction, dataModalDeleteAction } from "./../../../redux/action/modalAction";
import { submitAction, formModalAction } from "./../../../redux/action/formAction";
import { Editor } from 'react-bootstrap-editor';



function ModalStock(props) {

    const { isShowModal, dataModalId } = props.modalStockState;
    const { isValidate, validateModalForm, formModal } = props.formState;
    const { modalAction, submitAction, formModalAction, dataModalPostAction, dataModalUpdateAction } = props;


    const hideHandler = () => {
        modalAction(false)
    }


    const submitHandler = (e) => {
        e.preventDefault();
        if (e.target.checkValidity() === false) {
            submitAction({ ...props.formState, isValidate: true, validateModalForm: false })
        } else {
            submitAction({ ...props.formState, validateModalForm: true })
        }
    }




    useEffect(() => {
        if (validateModalForm) {
            if (dataModalId === "") {
                dataModalPostAction({ newProducts: formModal })
            } else {
                dataModalUpdateAction({ newProducts: formModal, productId: dataModalId })
            }
            submitAction({ ...props.formState, validateModalForm: false })
            modalAction(false)
        }
    }, [validateModalForm, dataModalId])



    return (
        <>
            <Modal show={isShowModal} onHide={hideHandler} className="p-0">
                <Modal.Header closeButton>
                    <Modal.Title>افزودن کالا</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={isValidate} onSubmit={submitHandler} className="d-flex justify-content-between align-items-center flex-wrap my-5">
                        <Form.Group className="w-100 mb-4 mx-2" controlId="exampleForm.ControlInput1">
                            <Form.Label>نام کالا</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                autoFocus
                                value={formModal.name || ""}
                                onChange={(e) => formModalAction({ ...formModal, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="w-100 mb-4 mx-2" controlId="exampleForm.ControlInput1">
                            <Form.Label>دسته بندی کالا</Form.Label>
                            <Form.Select
                                required
                                className="text-start"
                                value={formModal.category || ""}
                                onChange={(e) => formModalAction({ ...formModal, category: e.target.value })}
                            >
                                <option></option>
                                <option>کیف</option>
                                <option>کفش</option>
                                <option>کاپشن</option>
                                <option>کت</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="w-100 mb-4 mx-2" controlId="exampleForm.ControlInput1">
                            <Form.Label>برند کالا</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={formModal.brand || ""}
                                onChange={(e) => formModalAction({ ...formModal, brand: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="w-100 mb-4 mx-2" controlId="exampleForm.ControlInput1">
                            <Form.Label>تصویر کالا</Form.Label>
                            <Form.Group className={`d-flex justify-content-start align-items-center border rounded-3 p-1 ${isValidate && !formModal.thumbnail ? `border-danger` : null} ${!formModal.thumbnail === false && `border-success`}`}>
                                <Form.Label style={{ paddingTop: "3px", paddingBottom: "3px" }} className="mb-0 me-3 btn btn-primary px-3" htmlFor="thumbnail-file-input">انتخاب تصویر</Form.Label>
                                {
                                    !formModal.thumbnail === false
                                        ? <img src={`./../../../assets/images/${formModal.thumbnail}`} className="width-15 mw-100 h-auto" />
                                        : ""
                                }
                                {
                                    !formModal.thumbnail
                                        ? <Form.Control
                                            required
                                            accept="image/*"
                                            type="file"
                                            id="thumbnail-file-input"
                                            className="d-none"
                                            onChange={(e) => formModalAction({ ...formModal, thumbnail: e.target.files[0].name })}
                                        />
                                        : <Form.Control
                                            accept="image/*"
                                            type="file"
                                            id="thumbnail-file-input"
                                            className="d-none"
                                            onChange={(e) => formModalAction({ ...formModal, thumbnail: e.target.files[0].name })}
                                        />
                                }
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className="w-100 mb-4 mx-2" controlId="exampleForm.ControlInput1">
                            <Form.Label>گالری تصویر کالا</Form.Label>
                            <Form.Group className={`d-flex justify-content-start align-items-center border rounded-3 p-1 ${isValidate && !formModal.images ? `border-danger` : null} ${!formModal.images === false && `border-success`}`}>
                                <Form.Label style={{ paddingTop: "3px", paddingBottom: "3px" }} className="mb-0 me-3 btn btn-primary px-3" htmlFor="img-file-input">انتخاب تصویر</Form.Label>
                                <div>
                                    {
                                        !formModal.images === false
                                            ? formModal.images.map(image => (
                                                <img key={image} src={`./../../../assets/images/${image}`} className="width-15 mw-100 h-auto mx-2" />
                                            ))
                                            : ""
                                    }
                                </div>
                                {
                                    !formModal.images
                                        ? <Form.Control
                                            required
                                            accept="image/*"
                                            type="file"
                                            id="img-file-input"
                                            multiple
                                            className="d-none"
                                            onChange={(e) => formModalAction({ ...formModal, images: Object.values(e.target.files).map(v => v.name) })}
                                        />
                                        : <Form.Control
                                            accept="image/*"
                                            type="file"
                                            id="img-file-input"
                                            multiple
                                            className="d-none"
                                            onChange={(e) => formModalAction({ ...formModal, images: Object.values(e.target.files).map(v => v.name) })}
                                        />
                                }
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className="w-100 mb-4 mx-2" controlId="exampleForm.ControlInput1">
                            <Form.Label>قیمت</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={parseInt(formModal.price) || ""}
                                onChange={(e) => formModalAction({ ...formModal, price: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="w-100 mb-4 mx-2" controlId="exampleForm.ControlInput1">
                            <Form.Label>تعداد</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={formModal.count || ""}
                                onChange={(e) => formModalAction({ ...formModal, count: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4 mx-2 w-100" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>توضیحات</Form.Label>
                            {/* <Form.Control
                                as="textarea"
                                rows={3}
                                value={formModal.description || ""}
                                onChange={(e) => formModalAction({ ...formModal, description: e.target.value })}
                            /> */}
                            <Editor
                                value={formModal.description || ""}
                                onChange={(e) => formModalAction({ ...formModal, description: e.target.value })}
                            />
                        </Form.Group>
                        <Button className="mt-4 mx-2 w-100" variant="primary" type="submit">
                            ذخیره تغییرات
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}



const mapStateToProps = (state) => {
    return {
        modalStockState: state.modalState,
        formState: state.fromState
    }
}


const mapDispatchToProps = {
    modalAction,
    submitAction,
    formModalAction,
    dataModalPostAction,
    dataModalUpdateAction
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalStock)