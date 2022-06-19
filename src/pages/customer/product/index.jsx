import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap';
import server from './../../../config/server';
import { Link, NavLink } from 'react-router-dom';
import { dataFetchingAction } from "./../../../redux/action/dataFetchingAction";
import { filterationAction } from "./../../../redux/action/filterationAction";
import { connect } from 'react-redux';
import ProductList from '../../../Components/ProductList';


function Index(props) {

    const { filteration } = props.filterState
    const { filterationAction } = props

    // const [products, setProducts] = useState("");
    const [categories, setCategories] = useState("");


    const categoryHandler = async () => {
        const res = await server.get("/category");
        const data = res.data;
        setCategories(data)
    }




    const clickCategoryHandler = (categoryName) => {
        filterationAction({ ...filteration, categoryName: categoryName.split("، ") })
    }



    useEffect(() => {
        categoryHandler()
    }, [])



    return (
        <section className="product-section">
            <Container fluid className="p-0">
                <Row className="justify-content-between m-0">
                    <aside style={{ top: "30px" }} className="width-20 h-100 position-sticky mt-5 mx-4 p-5 bg-white shadow-lg rounded-3">
                        <div>
                            <h3 className="mb-2 pb-2">دسته بندی ها</h3>
                            {
                                filteration.categoryName.length > 0
                                && <Button variant="danger" className="fs-6 text-center d-flex mx-auto mb-4" onClick={() => filterationAction({ ...filteration, categoryName: [] })}>حذف دسته بندی</Button>
                            }
                            {
                                categories.length !== 0
                                && categories.map(category => (
                                    <NavLink onClick={() => clickCategoryHandler(category.name)} key={category.id} to={""} className={({ isActive }) => isActive ? "link-active my-3 text-decoration-none d-block" : "my-3 text-decoration-none"}> {category.name} </NavLink>
                                ))
                            }
                        </div>
                    </aside>
                    <ProductList width={"w-75"} />
                </Row>
            </Container>
        </section>
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


export default connect(mapStateToProps, mapDispatchToProps)(Index)