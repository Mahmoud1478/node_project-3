import { AxiosError, AxiosResponse } from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from '../../api/axios';
import DataTable from '../../components/datatable';
import { useNavigate } from 'react-router-dom';
import { User } from '../../store/users/users';
import FormUpdatePopup from '../../components/modal/FormUpdatePopup';
import FormCreatePopup from '../../components/modal/FormCreatePopup';

const Users = () => {
    const [reload, setReload] = useState<boolean>(false);
    const [data, setData] = useState([]);
    const [user, setUser] = useState<User>({
        id: 0,
        firstname: '',
        lastname: '',
        password: '',
    });
    const [isLoading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    async function fetchData() {
        try {
            const { data } = await axios.get('/users');
            setData(data);
            setLoading(false);
        } catch (err) {
            if (err instanceof AxiosError) {
                switch (err.response?.data.error) {
                    case 'jwt expired':
                        localStorage.clear();
                        navigate('/sign-in');
                        break;
                    default:
                        console.log(err.response?.data);
                        break;
                }
                return;
            }
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [reload]);
    return (
        <>
            <FormUpdatePopup
                id="update"
                inputs={{
                    'First name': {
                        name: 'firstname',
                        type: 'text',
                        label: true,
                    },
                    'Last name': {
                        name: 'lastname',
                        type: 'text',
                        label: true,
                    },
                    Password: {
                        name: 'password',
                        type: 'password',
                        label: true,
                    },
                }}
                onSubmit={async (setErr: Dispatch<SetStateAction<string>[]>) => {
                    try {
                        await axios.put(`/users/${user.id}`, user);
                        // @ts-ignore
                        // eslint-disable-next-line no-undef
                        bootstrap.Modal.getInstance('#update').hide();
                        setUser({
                            id: 0,
                            lastname: '',
                            firstname: '',
                            password: '',
                        });
                        setReload((prev) => !prev);
                    } catch (e) {
                        setErr([`err: ${e}`]);
                    }
                }}
                title="Update User"
                values={user}
                setValues={setUser}
            />
            <FormCreatePopup
                id="new"
                inputs={[
                    {
                        name: 'firstname',
                        type: 'text',
                        label: 'First name',
                    },
                    {
                        name: 'lastname',
                        type: 'text',
                        label: 'Last name',
                    },
                    {
                        name: 'password',
                        type: 'password',
                        label: 'Password',
                    },
                ]}
                title="New User"
                onSubmit={async (data: Record<string, string | number>) => {
                    const response: AxiosResponse = await axios.post('/users', data);
                    if (response.status === 200) {
                        setReload((prev) => !prev);
                    }
                    // @ts-ignore
                    // eslint-disable-next-line no-undef
                    bootstrap.Modal.getInstance('#new').hide();
                }}
                onError={(e, s: Dispatch<SetStateAction<string[]>>) => {
                    if (e instanceof AxiosError) {
                        switch (e.response?.status) {
                            case 422:
                                // eslint-disable-next-line no-case-declarations
                                const errArr: string[] = [];
                                Object.values<string[]>(e.response?.data).forEach(
                                    (element: string[]) => {
                                        element.forEach((content: string) => errArr.push(content));
                                    }
                                );
                                s(errArr);
                                break;

                            default:
                                break;
                        }
                        return;
                    }
                    console.log(e);
                }}
            />
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Users</h1>
                        <p className="lead fw-normal text-white-50 mb-0">Listing all Users</p>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#new"
                        data-bs-whatever="@mdo"
                    >
                        New
                    </button>
                </div>
            </header>
            {
                <DataTable
                    headers={{
                        id: {
                            name: '#',
                        },
                        firstname: {
                            name: 'First Name',
                        },
                        lastname: {
                            name: 'Last Name',
                        },
                    }}
                    actions
                    onDelete={async (user: User) => {
                        try {
                            await axios.delete(`/users/${user.id}`);
                            setReload((prev) => !prev);
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                    onEdit={async (user: User) => {
                        setUser({
                            ...user,
                            password: '',
                        });
                        // @ts-ignore
                        // eslint-disable-next-line no-undef
                        bootstrap.Modal.getOrCreateInstance('#update').show();
                    }}
                    isLoading={isLoading}
                    data={data}
                />
            }
        </>
    );
};

export default Users;
