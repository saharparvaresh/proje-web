import React from 'react'
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoute(props) {

    const { validateUser } = props.publicState;

    return (
        validateUser === false ? <Outlet /> : <Navigate to={"/Admin/Stock"} replace />
    )
}

const mapStateToProps = (state) => {
    return {
        publicState: state.fromState
    }
}

export default connect(mapStateToProps, null)(PublicRoute)