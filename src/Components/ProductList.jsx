import React, { useEffect, useState } from 'react'
import { Col, Container, Pagination, Row, Stack } from 'react-bootstrap';
import server from './../config/server';
import ProductCard from './../Components/ProductCard';
import { Link } from 'react-router-dom';
import { dataFetchingAction } from "./../redux/action/dataFetchingAction";
import { filterationAction } from "./../redux/action/filterationAction";
import { connect } from 'react-redux';


function ProductList(props) {

    // const [products, setProducts] = useState("");
    const [categories, setCategories] = useState("");


    const { dataFetching } = props.productState;
    const { filteration } = props.filterState
    const { dataFetchingAction, filterationAction } = props;



    const productHandler = async () => {
        // const res = await server.get("/products");
        // const data = res.data;
        // setProducts(data)
        dataFetchingAction({ productId: "" })
    }


    const categoryHandler = async () => {
        const res = await server.get("/category");
        const data = res.data;
        setCategories(data)
    }


    // let paginationCount = []
    // console.log(props.productState);
    // for (let i = 1; i <= Math.ceil(props.productState.totalProducts / filteration.limit); i++) {
    //     paginationCount.push(i)
    // }

    // const paginationHandler = (index) => {
    //     filterationAction({ ...filteration, paginationIndex: index })
    // }


    useEffect(() => {
        filterationAction({
            filterSelect: "",
            categoryName: [],
            limit: 17,
            paginationIndex: 1
        })
        productHandler()
        categoryHandler()
    }, [])



    return (
        <div className={props.width}>
            {
                filteration.categoryName.length === 0
                    ? (
                        categories.length > 0
                        && categories.map(category => {
                            let categoryArrSplit = category.name.split("، ");
                            return (
                                <div key={category.id} className="mb-5 pt-1 pb-3 px-5 bg-light bg-color-odd rounded-3">
                                    <div className="mx-3 mt-5">
                                        <h3 className="link-active"> {category.name} </h3>
                                        <p className="mt-3 mb-4 text-muted"> فروش محصولات ویژه </p>
                                    </div>
                                    <Stack direction="horizontal" className="flex-wrap align-items-start">
                                        {
                                            dataFetching.products.length > 0
                                            && dataFetching.products.map(product => (
                                                categoryArrSplit.includes(...product.name.split(" "))
                                                && (
                                                    <Col key={product.id} lg={"4"} className="my-3 box-scale-hover" >
                                                        <Link to={`/Customer/Product/ProductDetail/${product.id}`} className="card text-black text-decoration-none mx-3">
                                                            <ProductCard product={product} />
                                                        </Link>
                                                    </Col>
                                                )
                                            ))
                                        }
                                    </Stack>
                                    {/* <Pagination className="justify-content-center my-3">
                                        {
                                            paginationCount.map((pagination, index) => (
                                                <Pagination.Item key={pagination} onClick={() => paginationHandler(paginationCount[index])}>{pagination}</Pagination.Item>
                                            ))
                                        }
                                    </Pagination> */}
                                </div>
                            )
                        })
                    )
                    : (
                        <div className="mb-5 pt-1 pb-3 px-5 bg-light bg-color-odd rounded-3">
                            <div className="mx-3 mt-5">
                                <h3 className="link-active"> {filteration.categoryName.join("، ")} </h3>
                                <p className="mt-3 mb-4 text-muted"> فروش محصولات ویژه </p>
                            </div>
                            <Stack direction="horizontal" className="flex-wrap align-items-start">
                                {
                                    dataFetching.products.length > 0
                                    && dataFetching.products.map(product => (
                                        filteration.categoryName.includes(...product.name.split(" "))
                                        && (
                                            <Col key={product.id} lg={"4"} className="my-3 box-scale-hover" >
                                                <Link to={`/Customer/Product/ProductDetail/${product.id}`} className="card text-black text-decoration-none mx-3">
                                                    <ProductCard product={product} />
                                                </Link>
                                            </Col>
                                        )
                                    ))
                                }
                            </Stack>
                        </div>
                    )

            }
        </div>
    )
}



const mapStateToProps = (state) => {
    return {
        productState: state.dataState,
        filterState: state.filterState
    }
}


const mapDispatchToProps = {
    dataFetchingAction,
    filterationAction
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductList)