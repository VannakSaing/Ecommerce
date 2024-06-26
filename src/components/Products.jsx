import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { NavLink } from 'react-router-dom';

export const Products = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;
    const [isExpanded, setIsExpanded] = useState(false);


    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const respone = await fetch('https://fakestoreapi.com/products');

            if (componentMounted) {
                setData(await respone.clone().json());
                setFilter(await respone.json());
                setLoading(false);
                console.log(filter);
            }

            return () => {
                componentMounted = false;
            }
        }
        getProducts();
    }, []);

    const Loading = () => {
        return (
            <>
                {/* Loadding... */}
                <div className="col-md-3">
                    <Skeleton height={450} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={450} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={450} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={450} />
                </div>
            </>
        )
    }

    const setFilterProducts = (cat) => {
        const updateList = data.filter((x) => x.category === cat)
        setFilter(updateList);
    }

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-3 pb-3">
                    <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => setFilterProducts("men's clothing")}>Men's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => setFilterProducts("women's clothing")}>Women'c Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => setFilterProducts("jewelery")}>Jewelery</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => setFilterProducts("electronics")}>Electronic</button>
                </div>
                {
                    filter.map((item, index) => {
                        return (
                            <div className="col-md-3 mb-4">
                                <div className="card h-100 text-center mb-4" key={item.id}>
                                    <img src={item.image} className="card-img-top p-4" alt={item.title}
                                        height="300px" />
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div>
                                            <h5 className="card-title mb-0">{!isExpanded ? `${item.title.substring(0, 12)}...` : item.title}</h5>
                                            <p className={`card-text ${isExpanded ? '' : 'three-lines'}`}>
                                                {item.description}
                                            </p>
                                            <button className="btn btn-link" onClick={toggleDescription}>
                                                {isExpanded ? 'See Less' : 'See More'}
                                            </button>
                                        </div>
                                        <div className="mt-auto">
                                            <p className="card-text lead"><small className="text-muted">${item.price}</small></p>
                                            <NavLink to={`/products/${item.id}`} clNavLinkssName="btn btn-outline-dark">
                                                Buy Now
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        )
                    })
                }
            </>
        )
    }

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5"></div>
                    <h1 className='displaly-6 fw-bolder text-center'>Latest Products</h1>
                    <hr />
                </div>
                <div className={`${loading ? 'row justify-centen-center' : "row justify-centen-center"}`}>
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    )
}
