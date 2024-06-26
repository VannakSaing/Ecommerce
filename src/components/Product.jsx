import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

export const Product = () => {

    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            setProduct(await response.json());
            setLoading(false);
            console.log(product);
        }
        getProduct();
    }, []);

    const Loading = () => {
        return (
            <>
                <div className="col-md-6">
                    <Skeleton height={400} />
                </div>
                <div className="col-md-6" style={{ lineHeight: 2 }}>
                    <Skeleton height={50} width={300} />
                    <Skeleton height={50} width={400} />
                    <Skeleton height={50} width={75} />
                    <Skeleton height={50} width={150} />
                    <Skeleton height={200} />
                    <div class="row justify-centen-start">
                        <div class="col"><Skeleton height={50} width={100} /></div>
                        <div class="col"><Skeleton height={50} width={100} style={{ marginLeft: 6 }} /></div>
                    </div>
                </div>

            </>
        )
    }

    const ShowProduct = () => {
        return (
            <>
                <div className="col-md-6">
                    <img src={product.image} alt={product.image} className="img-fluid"
                        height="400px" width="400px" />
                </div>
                <div className="col-md-6">
                    <h4 className="text-uppercase text-black-50">
                        {product.category}
                    </h4>
                    <h1 className='display-5'>
                        {product.title}
                    </h1 >
                    <p className="lead  fw-bolder">
                        Rating {product.rating && product.rating.rate}
                        <i className='fa fa-star'></i>
                    </p>
                    <div className="display-6 fw-bolder my-4">
                        $ {product.price}
                    </div>
                    <p className="lead">
                        {product.description}
                    </p>
                    <div className="btn btn-outline-dark px-4 py-2"
                    >Add to cart</div>
                    <NavLink className="btn btn-dark ms-2 px-3 py-2">Go to cart</NavLink>

                </div >
            </>
        )
    }


    return (
        <div>
            <div className="container py-5">
                <div className="row py-4">
                    {loading ? <Loading /> : <ShowProduct />}
                </div>
            </div>
        </div>
    )
}
