import React, { useContext } from 'react';
import axios from '../../api/axios';
import { StateContext } from '../../store/StateProvider';
import acions from '../../store/auth/acions';

const SignUp: React.FC = () => {
    const { setAuth } = useContext(StateContext);
    const submition = async (e: React.FormEvent): Promise<void> => {
        try {
            e.preventDefault();
            const {
                data: { user, token, type },
            } = await axios.post('/users/sign-up', new FormData(e.target as HTMLFormElement));
            setAuth({
                type: acions.SET_AUTH,
                paylod: {
                    user,
                    token,
                },
            });
            localStorage.setItem(
                'token',
                JSON.stringify({
                    type,
                    value: token,
                })
            );
            localStorage.setItem('user', JSON.stringify(user));
        } catch (e) {
            console.log(e);
        }
    };
    return (
        // <!-- Section: Design Block -->
        <section className="" style={{ minHeight: '100vh' }}>
            {/* <!-- Jumbotron --> */}
            <div
                className="px-4 py-5 px-md-5 text-center text-lg-start"
                style={{ backgroundColor: 'hsl(0, 0%, 96%)', minHeight: '100Vh' }}
            >
                <div className="container">
                    <div className="row gx-lg-5 align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <h1 className="my-5 display-3 fw-bold ls-tight">
                                The best offer <br />
                                <span className="text-primary">for your business</span>
                            </h1>
                            <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
                                itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora
                                at cupiditate quis eum maiores libero veritatis? Dicta facilis sint
                                aliquid ipsum atque?
                            </p>
                        </div>

                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="card">
                                <div className="card-body py-5 px-md-5">
                                    <form onSubmit={submition} method="post">
                                        {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="form3Example1"
                                                    >
                                                        First name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="form3Example1"
                                                        className="form-control"
                                                        name="firstname"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="form3Example2"
                                                    >
                                                        Last name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="form3Example2"
                                                        className="form-control"
                                                        name="lastname"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- Email input --> */}
                                        {/* <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form3Example3">
                                                Email address
                                            </label>
                                            <input
                                                type="email"
                                                id="form3Example3"
                                                className="form-control"
                                            />
                                        </div> */}

                                        {/* <!-- Password input --> */}
                                        <label className="form-label" htmlFor="form3Example4">
                                            Password
                                        </label>
                                        <div className="form-outline mb-4">
                                            <input
                                                type="password"
                                                id="form3Example4"
                                                className="form-control"
                                                name="password"
                                            />
                                        </div>
                                        {/* <!-- Submit button --> */}
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block mb-4"
                                        >
                                            Sign up
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Jumbotron --> */}
        </section>
        // <!-- Section: Design Block -->
    );
};
export default SignUp;
