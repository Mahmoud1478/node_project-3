import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import ProductCard from '../../components/ProductCard';
import Spinner from '../../components/Spinner';
import { Product } from '../../store/products/types';

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoding, setLoading] = useState<boolean>(true);
    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data } = await axios.get('/products');
                setProducts(data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchProducts();
    }, []);
    return isLoding ? (
        <Spinner />
    ) : (
        <>
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Shop in style</h1>
                        <p className="lead fw-normal text-white-50 mb-0">
                            With this shop hompeage template
                        </p>
                    </div>
                </div>
            </header>
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {products.map((product) => {
                            return (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    category={product.category}
                                    price={product.price}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Products;
