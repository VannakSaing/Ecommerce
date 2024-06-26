import React from 'react'
import { Products } from './Products'

export const Home = () => {
    return (
        <div classNameName='hero'>
            <div className="card bg-dark text-white border-0">
                <img src="assets/images/bg4.jpg" className="card-img image-fit" alt="Background"
                    style={{
                        height: "600px", width: "100%", objectFit: "cover"
                    }} />
                <div className="card-img-overlay d-flex flex-column justify-content-center">
                    <div classNameName="container">
                        <h5 className="card-title display-3 mb-0">NEW SEASON ARRIVALS</h5>
                        <p className="card-text">CHECK OUT ALL THE TRENDS</p>
                    </div>
                </div>
            </div>
            <Products />
        </div>
    )
}
