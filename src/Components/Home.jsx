import React from 'react';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import shoeHeaderImage from "./../assets/images/shoe-header-banner.png";
import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import ProductList from './ProductList';


function Home(props) {

    return (
        <>
            <section className="header-home-section">
                <Container fluid>
                    <Row className="mx-5">
                        <Stack direction="horizontal" className="justify-content-around align-items-center bg-light rounded-3 px-5 py-3" >
                            <div className="image-header width-35">
                                <img className="w-100 mw-100" src={shoeHeaderImage} alt="shoe-image" />
                            </div>
                            <div className="w-50 ps-5">
                                <h1 className="text-black fw-bolder">خرید کفش ورزشی برند نایک</h1>
                                <p className="text-muted my-3">
                                    خرید کفش با کیفیت و با دوام اصل از شرکت معتبر نایک با گارانتی اصالت کالا.
                                    این کفش برای انواع ورزش ها مناسب است و عملکرد خوبی دارد
                                </p>
                                <span className="text-primary d-block fs-4 fw-bold mt-4">3000000 تومان</span>
                                <Button className="my-4 px-4">خرید</Button>
                            </div>
                        </Stack>
                    </Row>
                </Container>
            </section>

            <section className="product-home-section mt-5 py-4">
                <Container fluid>
                    <Row>
                        <h2 className="text-center">محصولات</h2>

                        <section className="product-section">
                            <Container fluid className="p-0">
                                <Row className="justify-content-between m-0">
                                    <ProductList width={"w-100"} />
                                </Row>
                            </Container>
                        </section>
                    </Row>
                </Container>
            </section>
        </>
    )
}



export default Home