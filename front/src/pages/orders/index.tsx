import DataTable from '../../components/datatable';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order } from '../../store/orders/Order';
import axios from '../../api/axios';
import { AxiosError } from 'axios';

const Orders = () => {
    const [data, setData] = useState<Order[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    async function fetchData() {
        try {
            const { data } = await axios.get('/orders');
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
    }, []);
    return (
        <>
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Orders</h1>
                        <p className="lead fw-normal text-white-50 mb-0">Listing User all Orders</p>
                    </div>
                </div>
            </header>
            {
                <DataTable
                    headers={{
                        id: {
                            name: '#',
                        },
                        status: {
                            name: 'status',
                        },
                    }}
                    actions={{
                        edit: (order: Order) => console.log(order),
                    }}
                    data={data}
                    isLoading={isLoading}
                />
            }
        </>
    );
};

export default Orders;
