import React, { useEffect, useState } from 'react'
import { Button, Carousel, Container, FormControl, Row, Spinner, Stack } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
import server from '../../../config/server';
import { cartAddAction } from "./../../../redux/action/cartOperationAction";
import { dataFetchingAction } from "./../../../redux/action/dataFetchingAction";


function Index(props) {

    const { cartDetail } = props.cartOperationState;
    const { dataFetching } = props.productState;
    const { cartAddAction, dataFetchingAction } = props;


    const params = useParams("");

    // const [product, setProduct] = useState([]);

    let [countValueProduct, setCountValueProduct] = useState(1);


    const productHandler = async () => {
        // const res = await server.get(`/products/${params.id}`);
        // const data = res.data;
        // setProduct(data)
        dataFetchingAction({ productId: params.id })
    }



    const clickHandler = (productId) => {
        if (countValueProduct <= 12) {
            if (parseInt(countValueProduct) > 0 && parseInt(dataFetching.product.count) > 0) {
                cartAddAction([
                    {
                        name: dataFetching.product.name,
                        price: dataFetching.product.price,
                        count: parseInt(countValueProduct),
                        id: dataFetching.product.id
                    }
                ])
            }


            if (cartDetail !== null && parseInt(countValueProduct) > 0 && parseInt(dataFetching.product.count) > 0) {
                let findCartProduct = cartDetail.find(val => val.id === productId);
                if (findCartProduct !== undefined) {
                    cartAddAction([...cartDetail])
                    findCartProduct.count = 0 + parseInt(countValueProduct);
                } else {
                    cartAddAction([
                        ...cartDetail,
                        {
                            name: dataFetching.product.name,
                            price: dataFetching.product.price,
                            count: parseInt(countValueProduct),
                            id: dataFetching.product.id
                        }
                    ])
                }
            }
        } else {
            alert("این تعداد محصول موجود نیست")
        }
    }
    localStorage.setItem("cart", JSON.stringify(cartDetail))


    const countValueHandler = (e) => {
        if (e.target.value > 0) {
            setCountValueProduct(e.target.value)
        }
    }


    useEffect(() => {
        productHandler();
    }, [])

    return (
        <>
            <Container fluid>
                <Row className="mx-5 py-4 justify-content-center">
                    {
                        dataFetching.product.length !== 0
                            ? (
                                <Stack key={dataFetching.product.id} direction="horizontal">
                                    <div className="width-48 bg-light p-5 rounded-3">
                                        <Carousel variant='dark'>
                                            {
                                                dataFetching.product.images !== undefined
                                                && dataFetching.product.images.map(image => (
                                                    <Carousel.Item key={image}>
                                                        <img className="w-100 mw-100 h-auto rounded-3" src={`./../../../assets/images/${image}`} alt="product-image" />
                                                    </Carousel.Item>
                                                ))
                                            }
                                        </Carousel>
                                    </div>
                                    <div className="mx-5 px-4 w-75">
                                        <h3 className="fs-1 fw-bolder text-black"> {dataFetching.product.name} </h3>
                                        <p className="text-muted my-4"> {dataFetching.product.description} </p>
                                        <span className="fs-3 fw-bold text-primary"> {dataFetching.product.price} تومان </span>
                                        <FormControl type="number" className="w-25 mt-5 mb-3" value={countValueProduct} onChange={countValueHandler} />
                                        <Button className="px-4" onClick={() => clickHandler(dataFetching.product.id)} >افزودن به سبد</Button>
                                    </div>
                                </Stack>
                            ) : (
                                <Spinner animation="border" variant="primary">
                                    <span className="visually-hidden">در حال لود شدن </span>
                                </Spinner>
                            )
                    }
                </Row>
            </Container>
        </>
    )
}



const mapStateToProps = (state) => {
    return {
        cartOperationState: state.cartOperationState,
        productState: state.dataState
    }
}


const mapDispatchToProps = {
    cartAddAction,
    dataFetchingAction
}



export default connect(mapStateToProps, mapDispatchToProps)(Index);