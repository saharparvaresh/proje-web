import React from 'react'
import { Container, Row, Stack } from 'react-bootstrap'
import { connect } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

const Admin = (props) => {

    return (
        <>
            <Container>
                <Row>
                    <Stack direction="horizontal" gap={2} className="mb-5 pb-4 border-bottom justify-content-between align-items-center">
                        <h2>پنل مدیریت فروشگاه</h2>
                        <div>
                            <NavLink to="/Admin/Stock" className={({ isActive }) => isActive ? "link-active link-primary text-decoration-none px-2 mx-1" : "link-primary link-hover text-decoration-none px-2 mx-1"} > کالا ها </NavLink>
                            <NavLink to={"/Admin/ProductManage"} className={({ isActive }) => isActive ? "link-active link-primary text-decoration-none px-2 mx-1" : "link-primary link-hover text-decoration-none px-2 mx-1"} > موجودی و قیمت </NavLink>
                            <NavLink to="/Admin/Orders" className={({ isActive }) => isActive ? "link-active link-primary text-decoration-none px-2 mx-1" : "link-primary link-hover text-decoration-none px-2 mx-1"} > سفارش ها </NavLink>
                        </div>
                    </Stack>
                    <Outlet />
                </Row>
            </Container>
        </>
    )
}


export default Admin