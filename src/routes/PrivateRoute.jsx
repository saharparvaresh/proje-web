import React from 'react'
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute(props) {

    const { validateUser } = props.privateState;

    return (
        validateUser ? <Outlet /> : <Navigate to="/Account/Register-Login" />
    )
}


const mapStateToProps = (state) => {
    return {
        privateState: state.fromState
    }
}


export default connect(mapStateToProps, null)(PrivateRoute)