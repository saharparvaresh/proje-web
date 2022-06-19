import React, { useEffect, useRef, useState } from 'react'
import { Button, Container, Form, Row, Stack } from 'react-bootstrap';
import { connect } from "react-redux";
import axiosHandler, { isLoggin } from '../config/serv';
import { loginAction, registerAction, changeValueAction, submitAction, saveTokenAction } from "./../redux/action/formAction"




function RegisterLogin(props) {

    const { token, validateUser, isValidate, formValues, activeForm } = props.formState;
    const { loginAction, registerAction, changeValueAction, submitAction, saveTokenAction } = props;

    const checkValuesAdmin = useRef("");
    const checkValuesCustomer = useRef("");


    const submitHandler = (e) => {
        e.preventDefault();
        if (e.target.checkValidity() === false) {
            submitAction({ isValidate: true, validateUser: false })
        } else {
            if (formValues.userName === "admin" && formValues.password === "admin") {
                submitAction({ ...props.formState, validateUser: true })
                axiosHandler();
                if (isLoggin()) {
                    saveTokenAction(localStorage.getItem("token"))
                }
            }
        }
    }


    return (
        <>
            <Container>
                <Row>
                    <h4 className="text-center mb-5" role="button">
                        <span onClick={loginAction}>ورود</span> / <span onClick={registerAction}>ثبت نام</span>
                    </h4>
                    <Stack className="justify-content-center">

                        {
                            activeForm === "login" ? (
                                <Form noValidate validated={isValidate} className="w-50 m-auto" onSubmit={submitHandler}>
                                    <Form.Group className="mb-4">
                                        <Form.Label>نام کاربری یا ایمیل</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            value={formValues?.userName}
                                            onChange={(e) => changeValueAction({ ...formValues, userName: e.target.value })}
                                        ></Form.Control>
                                        <Form.Control.Feedback type="invalid" className="mt-2">لطفا فرم رو پر کن</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label>رمز عبور</Form.Label>
                                        <Form.Control
                                            type="password"
                                            required
                                            value={formValues?.password}
                                            onChange={(e) => changeValueAction({ ...formValues, password: e.target.value })}
                                        ></Form.Control>
                                        <Form.Control.Feedback type="invalid" className="mt-2">لطفا فرم رو پر کن</Form.Control.Feedback>
                                    </Form.Group>
                                    <Button type="submit" className="d-block my-4 mx-auto w-50 text-center">ورود</Button>
                                </Form>
                            ) : (
                                <Form noValidate validated={isValidate} className="w-50 m-auto" onSubmit={submitHandler}>
                                    <Form.Group className="mb-4">
                                        <Form.Label>نام کاربری</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            value={formValues?.userName}
                                            onChange={(e) => changeValueAction({ ...formValues, userName: e.target.value })}
                                        ></Form.Control>
                                        <Form.Control.Feedback type="invalid" className="mt-2">لطفا فرم رو پر کن</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label>ایمیل</Form.Label>
                                        <Form.Control
                                            type="email"
                                            required
                                            value={formValues?.email}
                                            onChange={(e) => changeValueAction({ ...formValues, email: e.target.value })}
                                        ></Form.Control>
                                        <Form.Control.Feedback type="invalid" className="mt-2">لطفا فرم رو پر کن</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label>نقش کاربری</Form.Label>
                                        <Form.Group className="d-flex">
                                            <Form.Check
                                                className="me-2"
                                                type="radio"
                                                id="admin"
                                                name="roleUser"
                                                required
                                                onChange={() => changeValueAction({ ...formValues, roleUser: checkValuesAdmin.current.textContent })}
                                            />
                                            <Form.Label className="me-4" htmlFor="admin" ref={checkValuesAdmin}>مدیر</Form.Label>

                                            <Form.Check
                                                className="me-2"
                                                type="radio"
                                                id="customer"
                                                name="roleUser"
                                                required
                                                onChange={() => changeValueAction({ ...formValues, roleUser: checkValuesCustomer.current.textContent })}
                                            />
                                            <Form.Label className="me-4" htmlFor="customer" ref={checkValuesCustomer}>فروشنده</Form.Label>
                                        </Form.Group>
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label>رمز عبور</Form.Label>
                                        <Form.Control
                                            type="password"
                                            required
                                            value={formValues?.password}
                                            onChange={(e) => changeValueAction({ ...formValues, password: e.target.value })}
                                        ></Form.Control>
                                        <Form.Control.Feedback type="invalid" className="mt-2">لطفا فرم رو پر کن</Form.Control.Feedback>
                                    </Form.Group>
                                    <Button type="submit" className="d-block my-4 mx-auto w-50 text-center">ثبت نام</Button>
                                </Form>
                            )
                        }


                    </Stack>
                </Row>
            </Container>
        </>
    )
}



const mapStateToProps = (state) => {
    return {
        formState: state.fromState
    }
}

const mapDispatchToProps = {
    loginAction,
    registerAction,
    changeValueAction,
    submitAction,
    saveTokenAction
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterLogin);