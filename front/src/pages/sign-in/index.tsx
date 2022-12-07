import { AxiosError } from 'axios';
import { Dispatch, FormEvent, useRef, useState } from 'react';
import axios from '../../api/axios';
import acions from '../../store/auth/acions';
import { ConsumState } from '../../store/StateProvider';
import { Action } from '../../store/types';

const SignIn = () => {
    const firstname = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const [err, setErr] = useState<string[]>([]);
    const handleSubmit = async (e: FormEvent, setAuth: Dispatch<Action>) => {
        try {
            e.preventDefault();
            const {
                data: { user, token, type },
            } = await axios.post('/users/sign-in', {
                firstname: firstname.current?.value,
                password: password.current?.value,
            });
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
        } catch (error) {
            if ((error as AxiosError).response?.status === 422) {
                setErr(() => {
                    const r: string[] = [];
                    Object.values<(string | string[])[]>(
                        (error as AxiosError<any>).response?.data
                    ).forEach((item: (string | string[])[]) => {
                        if (typeof item === 'string') {
                            r.push(item);
                        } else {
                            item.forEach((e) => r.push(e as string));
                        }
                    });
                    return r;
                });
            } else {
                console.log(error);
            }
        }
    };
    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="img-fluid"
                            alt="Phone image"
                        />
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <ConsumState>
                            {({ setAuth }) => (
                                <>
                                    <form onSubmit={(e) => handleSubmit(e, setAuth)} method="post">
                                        {err.map((item, idx) => (
                                            <div key={idx} className="alert alert-danger">
                                                {item}
                                            </div>
                                        ))}
                                        <div className="form-outline mb-4 mt-4">
                                            <input
                                                type="text"
                                                id="form1Example13"
                                                className="form-control form-control-lg"
                                                ref={firstname}
                                                placeholder="firstname"
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input
                                                type="password"
                                                id="form1Example23"
                                                className="form-control form-control-lg"
                                                ref={password}
                                                placeholder="password"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg btn-block"
                                        >
                                            Sign in
                                        </button>
                                    </form>
                                </>
                            )}
                        </ConsumState>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default SignIn;
