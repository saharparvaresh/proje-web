import React, { useEffect, useState } from 'react'
import { Button, Col, Stack } from 'react-bootstrap';
import { dataFetchingAction } from "./../../../redux/action/dataFetchingAction";
import { filterationAction } from "./../../../redux/action/filterationAction";
import { productOperationAction, dataProductManageAction, dataProductPriceAction, dataProductCountAction } from "./../../../redux/action/productOperationAction";
import { connect } from 'react-redux';


function Index(props) {

    const { dataFetching } = props.dataFetchingState;
    const { isEditSaveState, isEditState, isSaveState, dataProductPrice, dataProductCount } = props.productOperationState
    const { dataFetchingAction, filterationAction, productOperationAction, dataProductManageAction, dataProductPriceAction, dataProductCountAction } = props;

    const productsFunc = async () => {
        // const res = await server.get("/products");
        // const data = res.data;
        dataFetchingAction();

    }




    // console.log(productPrice, dataProductManage.productManage);



    // const changeProductManageHandler = (e, productId) => {
    //     changeValueProductManageAction({ productPrice: e.target.value, productCount:e.target.value, productId: productId })
    // }


    // const productManageHandler = () => {

    //     dataProductManageAction({
    //         ...dataProductManage,
    //         // productPrice: productPrice,
    //         // productCount: productCount
    //     })
    // }

    // useEffect(() => {
    //     productManageHandler()
    // }, [isEditSaveState])



    const escapekeyHandler = () => {
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                productOperationAction({ isEditState: true, isSaveState: true })
            }
        })
    }
    escapekeyHandler()



    useEffect(() => {
        if (isEditSaveState.isSaveState) {
            dataProductManageAction();
        }

    }, [isEditSaveState.isSaveState])


    useEffect(() => {
        filterationAction({
            filterSelect: "",
            categoryName: [],
            limit: 17,
            paginationIndex: 1,
        })
        productsFunc()
    }, [])


    return (
        <>
            <Stack direction="horizontal" className="align-items-center justify-content-between">
                <h3 className="text-center">مدیریت موجودی و قیمت ها</h3>
                <div>
                    <Button onClick={() => productOperationAction({ isEditState: false, isSaveState: false })} className="ms-3 fs-6 btn-success">ویرایش</Button>
                    <Button onClick={() => productOperationAction({ isEditState: true, isSaveState: true })} className="ms-3 fs-6 btn-secondary">ذخیره</Button>
                </div>
            </Stack>

            <Stack style={{ boxShadow: "0px 8px 50px -9px #8989893d" }} className="my-4 p-2 rounded-3">
                <div style={{ backgroundColor: "#e5f4f5" }} className="d-flex p-3 text-info rounded-3">
                    <Col lg={7} as="h6" className="mb-0">کالا</Col>
                    <Col as="h6" className="mb-0">قیمت (تومان)</Col>
                    <Col as="h6" className="mb-0">موجودی</Col>
                </div>

                {
                    dataFetching.products.length !== 0
                        ? dataFetching.products.map((product, index) => {
                            return (
                                <div key={product.id} className="d-flex p-3 text-dark rounded-3">
                                    <Col lg={7}> {product.name} </Col>
                                    <Col>
                                        <input
                                            type="text"
                                            className={isEditSaveState.isEditState ? "border-0 bg-transparent text-black rounded-3 text-start" : "border-0 bg-light text-secondary rounded-3 text-start"}
                                            name={`productPrice ${product.id}`}
                                            value={
                                                dataProductPrice[`productPrice ${product.id}`] === ""
                                                    ? dataProductPrice[`productPrice ${product.id}`]
                                                    : dataProductPrice[`productPrice ${product.id}`] || product.price
                                            }
                                            onChange={(e) => dataProductPriceAction({ ...dataProductPrice, [e.target.name]: e.target.value })}
                                            disabled={isEditSaveState.isEditState}
                                        />
                                    </Col>
                                    <Col>
                                        <input
                                            type="number"
                                            className={isEditSaveState.isEditState ? "border-0 bg-transparent text-black rounded-3 text-start" : "border-0 bg-light text-secondary rounded-3 text-start"}
                                            name={`productCount ${product.id}`}
                                            value={
                                                dataProductCount[`productCount ${product.id}`] === ""
                                                    ? dataProductCount[`productCount ${product.id}`]
                                                    : dataProductCount[`productCount ${product.id}`] || product.count
                                            }
                                            onChange={(e) => dataProductCountAction({ ...dataProductCount, [e.target.name]: e.target.value })}
                                            disabled={isEditSaveState.isEditState}
                                        />
                                    </Col>
                                </div>
                            )
                        })
                        : <h1>در حال لود شدن</h1>
                }
            </Stack>
        </>
    )
}



const mapStateToProps = state => {
    return {
        dataFetchingState: state.dataState,
        filterationState: state.filterState,
        productOperationState: state.productOperationState
    }
}


const mapDispatchToProps = {
    dataFetchingAction,
    filterationAction,
    productOperationAction,
    dataProductManageAction,
    dataProductPriceAction,
    dataProductCountAction
}


export default connect(mapStateToProps, mapDispatchToProps)(Index)