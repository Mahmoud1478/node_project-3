import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from '../../api/axios';
import { Product } from '../../store/products/types';
import DataTable from '../../components/datatable';
import { AxiosError, AxiosResponse } from 'axios';
import FormCreatePopup from '../../components/modal/FormCreatePopup';
import FormUpdatePopup from '../../components/modal/FormUpdatePopup';

const Products: React.FC = () => {
    const [data, setData] = useState<Product[]>([]);
    const [reload, setReload] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [product, setProduct] = useState<Product>({
        id: 0,
        name: '',
        price: 0,
        category: '',
    });

    async function fetchProducts() {
        try {
            const { data } = await axios.get('/products');
            setData(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [reload]);
    return (
        <>
            <FormUpdatePopup
                id="update"
                inputs={{
                    Name: {
                        name: 'name',
                        type: 'text',
                        label: true,
                    },
                    Price: {
                        name: 'price',
                        type: 'text',
                        label: true,
                    },
                    Category: {
                        name: 'category',
                        type: 'text',
                        label: true,
                    },
                }}
                onSubmit={async (setErr: Dispatch<SetStateAction<string>[]>) => {
                    try {
                        await axios.put(`/products/${product.id}`, product);
                        // @ts-ignore
                        // eslint-disable-next-line no-undef
                        bootstrap.Modal.getInstance('#update').hide();
                        setProduct({
                            id: 0,
                            name: '',
                            price: 0,
                            category: '',
                        });
                        setReload((prev) => !prev);
                    } catch (e) {
                        setErr([`err: ${e}`]);
                    }
                }}
                title="Update User"
                values={product}
                setValues={setProduct}
            />
            <FormCreatePopup
                id="new"
                inputs={[
                    {
                        name: 'name',
                        type: 'text',
                        label: 'Name',
                    },
                    {
                        name: 'price',
                        type: 'text',
                        label: 'Price',
                    },
                    {
                        name: 'category',
                        type: 'text',
                        label: 'Category',
                    },
                ]}
                title="New User"
                onSubmit={async (data: Record<string, string | number>) => {
                    const response: AxiosResponse = await axios.post('/products', data);
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
                        <h1 className="display-4 fw-bolder">Shop in style</h1>
                        <p className="lead fw-normal text-white-50 mb-0">
                            With this shop hompeage template
                        </p>
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
            <section className="py-5">
                {
                    <DataTable
                        headers={{
                            id: {
                                name: '#',
                            },
                            name: {
                                name: 'name',
                            },
                            price: {
                                name: 'price',
                            },
                            category: {
                                name: 'category',
                            },
                        }}
                        actions={{
                            edit: (product: Product) => {
                                console.log(product);
                                setProduct((prev) => {
                                    return {
                                        ...prev,
                                        ...product,
                                    };
                                });
                                // @ts-ignore
                                // eslint-disable-next-line no-undef
                                bootstrap.Modal.getOrCreateInstance('#update').show();
                            },
                            cart: (product: Product) => console.log(product),
                            delete: async (product: Product) => {
                                try {
                                    await axios.delete(`/products/${product.id}`);
                                    setReload((prev) => !prev);
                                } catch (e) {
                                    console.log(e);
                                }
                            },
                        }}
                        data={data}
                        isLoading={isLoading}
                    />
                }
            </section>
        </>
    );
};

export default Products;
