import React from 'react';
import './styles.css';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ConsumState } from '../../store/StateProvider';
const Navbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container py-2 px-4 px-lg-5">
                <a className="navbar-brand" href="#!">
                    Start Bootstrap
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/products">
                                Products
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/Orders">
                                Orders
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/users">
                                Users
                            </NavLink>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <ConsumState>
                            {({ auth }): React.ReactNode => {
                                return auth.user ? (
                                    <>
                                        <button className="btn btn-outline-dark" type="button">
                                            <i className="bi-cart-fill me-1"></i>
                                            Cart
                                            <span className="badge bg-dark text-white ms-1 rounded-pill">
                                                0
                                            </span>
                                        </button>
                                        <button
                                            className="btn btn-outline-dark"
                                            type="button"
                                            style={{
                                                marginInlineStart: '20px',
                                            }}
                                        >
                                            <i className="bi-cart-fill me-1"></i>
                                            {auth.user.firstname + ' ' + auth.user.lastname}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link className="btn btn-outline-dark" to="/sign-in">
                                            Sign in
                                        </Link>
                                        <Link
                                            className="btn btn-outline-dark"
                                            style={{
                                                marginInlineStart: '20px',
                                            }}
                                            to="/sign-up"
                                        >
                                            Sign up
                                        </Link>
                                    </>
                                );
                            }}
                        </ConsumState>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
