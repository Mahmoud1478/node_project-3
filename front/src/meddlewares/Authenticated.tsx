import React, { useContext } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { StateContext } from '../store/StateProvider';

function Authenticated() {
    const { auth } = useContext(StateContext);
    const locathon = useLocation();
    return auth.user ? <Outlet /> : <Navigate to="/sign-in" state={{ from: locathon }} replace />;
}

export default Authenticated;
