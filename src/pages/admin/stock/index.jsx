import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Pagination, Stack } from 'react-bootstrap';
import { FiTrash2, FiEdit } from "react-icons/fi";
import { dataFetchingAction } from "./../../../redux/action/dataFetchingAction";
import { filterationAction } from "./../../../redux/action/filterationAction";
import { modalAction, dataModalGetAction, dataModalUpdateAction, dataModalPostAction, dataModalDeleteAction } from "./../../../redux/action/modalAction";
import { formModalAction } from "./../../../redux/action/formAction"
import { connect } from 'react-redux';
import ModalStock from './modalStock';


function Index(props) {


    // const [showModal, setShowModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    // const limit = 5

    // const [products, setProducts] = useState([]);
    // const [categories, setCategories] = useState("");
    // const [filterSelect, setFilterSelect] = useState("");
    // const [totalPages, setTotalPages] = useState(0)
    // const [paginationIndex, setPaginationIndex] = useState(1)

    const { dataFetching } = props.dataFetchingState;
    const { filteration } = props.filterationState;
    const { dataModal, dataModalId } = props.modalStockState;
    const {
        dataFetchingAction,
        filterationAction,
        modalAction,
        dataModalGetAction,
        dataModalPostAction,
        dataModalUpdateAction,
        dataModalDeleteAction,
        formModalAction } = props;


    const showModalHandler = () => {
        modalAction(true)
        dataModalGetAction({ productId: "" });
    }

    const operationModalHandler = (productId) => {
        modalAction(true);
        dataModalGetAction({ ...props.modalStockState, productId: productId });
    }


    const deleteOperationProductHandler = (productId) => {
        dataModalGetAction({ ...props.modalStockState, productId: productId });
        setShowDeleteModal(true)
    }


    const deleteProductHandler = () => {
        dataModalDeleteAction({ productId: dataModalId })
        setShowDeleteModal(false)
    }



    useEffect(() => {
        if (dataModalId !== undefined) {
            formModalAction({
                name: dataModal.name,
                category: dataModal.category,
                brand: dataModal.brand,
                price: dataModal.price,
                count: dataModal.count,
                description: dataModal.description,
                images: dataModal.images,
                thumbnail: dataModal.thumbnail
            })
        } else {
            formModalAction({
                name: "",
                category: "",
                brand: "",
                price: "",
                count: "",
                description: "",
                images: "",
                thumbnail: ""
            })
        }
    }, [dataModal, dataModalId])



    const productsFunc = () => {
        // const res = await server({
        //     method: "GET",
        //     url: "/products",
        //     params: {
        //         "category": filterSelect !== "" ? filterSelect : null,
        //         "_limit": limit,
        //         "_page": paginationIndex
        //     }
        // });
        // setProducts(res.data)
        // setTotalPages(res.headers["x-total-count"])
        dataFetchingAction();
        filterationAction({ ...filteration, limit: 5 })
    }


    const categoriesFunc = () => {
        // const res = await server.get("/category");
        // const data = res.data;
        // setCategories(data)
        dataFetchingAction();
    }


    const filterSelectHandler = (e) => {
        filterationAction({ ...filteration, filterSelect: e.target.value });
    }


    let paginationCount = []
    for (let i = 1; i <= Math.ceil(props.dataFetchingState.totalProducts / filteration.limit); i++) {
        paginationCount.push(i)
    }

    const paginationHandler = (index) => {
        filterationAction({ ...filteration, paginationIndex: index })
    }

    useEffect(() => {
        productsFunc()
        categoriesFunc()
    }, [filteration.paginationIndex, filteration.filterSelect, dataModal])



    const renderProduct = (product, productArr) => {
        return (
            <div key={product.id} className="d-flex align-items-center p-3 text-dark rounded-3">
                <Col lg={1}>
                    <img className="w-50 cover-full mw-100" src={`./../../../assets/images/${product.thumbnail}`} alt={"product-image"} />
                </Col>
                <Col> {product.name} </Col>
                <Col>
                    {
                        dataFetching.categories.length !== 0 && dataFetching.categories.map(category => {
                            let categoryArr = category.name.split("، ");
                            if (categoryArr.includes(...productArr)) {
                                return category.name
                            }
                        })
                    }
                </Col>
                <Col lg={1}>
                    <FiEdit onClick={() => operationModalHandler(product.id)} className="link-hover cursor-pointer mx-2" size={20} />
                    <FiTrash2 onClick={() => deleteOperationProductHandler(product.id)} className="text-danger cursor-pointer mx-2" size={20} />
                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>حذف کالا</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="fw-bold">آیا میخواهید محصول مورد نظر را حذف کنید؟</Modal.Body>
                        <Modal.Footer>
                            <Button variant="light" onClick={() => setShowDeleteModal(false)}>
                                خیر
                            </Button>
                            <Button className="px-3" variant="danger" onClick={deleteProductHandler}>
                                بله
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </div>
        )
    }



    return (
        <>
            <Stack direction="horizontal" className="align-items-center justify-content-between">
                <h3 className="text-center">مدیریت کالا ها</h3>
                <Form.Select className="w-25" value={filteration.filterSelect} onChange={filterSelectHandler}>
                    <option value="">همه</option>
                    <option value="کیف">کیف</option>
                    <option value="کفش">کفش</option>
                    <option value="کاپشن">کاپشن</option>
                    <option value="کت">کت</option>
                </Form.Select>
                <Button className="fs-6" onClick={showModalHandler} >افزودن کالا</Button>
            </Stack>

            <Stack style={{ boxShadow: "0px 8px 50px -9px #8989893d" }} className="my-4 p-2 rounded-3">
                <div style={{ backgroundColor: "#e5f4f5" }} className="d-flex p-3 text-info rounded-3">
                    <Col lg={1} as="h6" className="mb-0">تصاویر</Col>
                    <Col as="h6" className="mb-0">نام کالا</Col>
                    <Col as="h6" className="mb-0">دسته بندی</Col>
                    <Col lg={1} as="h6" className="mb-0">عملیات</Col>
                </div>

                {
                    dataFetching.products.length !== 0 && dataFetching.products.map(product => {
                        let productArr = product.name.split(" ");
                        return renderProduct(product, productArr)
                    })
                }
            </Stack>



            <Pagination className="justify-content-center my-3">
                {
                    paginationCount.map((pagination, index) => (
                        <Pagination.Item key={pagination} onClick={() => paginationHandler(paginationCount[index])}>{pagination}</Pagination.Item>
                    ))
                }
            </Pagination>




            {/* <Pagination className="justify-content-center my-3">
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item>{4}</Pagination.Item>
                <Pagination.Item>{5}</Pagination.Item>
                <Pagination.Next />
            </Pagination> */}


            <ModalStock />


        </>
    )
}


const mapStateToProps = state => {
    return {
        dataFetchingState: state.dataState,
        filterationState: state.filterState,
        modalStockState: state.modalState,
        formState: state.fromState
    }
}


const mapDispatchToProps = {
    dataFetchingAction,
    filterationAction,
    modalAction,
    dataModalGetAction,
    dataModalPostAction,
    dataModalUpdateAction,
    dataModalDeleteAction,
    formModalAction
}


export default connect(mapStateToProps, mapDispatchToProps)(Index)