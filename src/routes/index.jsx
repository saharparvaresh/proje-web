import React, { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Admin from "./../Components/Admin";
import Customer from "./../Components/Customer";
import Home from "./../Components/Home";
import RegisterLogin from '../Components/RegisterLogin'
import PageNotFound from "./../pages/404page";
import Orders from "./../pages/admin/orders";
import ProductManage from "./../pages/admin/productManage"
import Stock from "./../pages/admin/stock";
import Product from "./../pages/customer/product";
import ProductDetail from "./../pages/customer/productDetail";
import Cart from "./../pages/customer/cart"
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Checkout from '../pages/customer/checkout';
import PayMock from '../pages/customer/payMock';
import PayResult from '../pages/customer/payResult';


function CustomRoute(props) {

    return (
        <>
            <Routes>
                <Route path="Home" element={<Navigate to="/" replace />} />
                <Route path="/" element={<Home />} />
                <Route path="/" element={<PublicRoute />}>
                    <Route path="Account">
                        <Route path="Register-Login" element={<RegisterLogin />} />
                    </Route>
                </Route>

                <Route path="/" element={<PrivateRoute />}>
                    <Route path="Admin" element={<Admin />}>
                        <Route path="Orders" element={<Orders />} />
                        <Route path="ProductManage" element={<ProductManage />} />
                        <Route path="Stock" element={<Stock />} />
                    </Route>
                </Route>

                <Route path="Customer" element={<Customer />}>
                    <Route path="Cart" element={<Cart />} />
                    <Route path="Checkout" element={<Checkout />} />
                    <Route path="PayMock" element={<PayMock />} />
                    <Route path="PayResult" element={<PayResult />} />
                    <Route path="Product">
                        <Route index element={<Product />} />
                        <Route path="ProductDetail/:id" element={<ProductDetail />} />
                    </Route>
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    )
}




export default CustomRoute