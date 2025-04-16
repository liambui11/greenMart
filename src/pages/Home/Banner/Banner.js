import React from 'react'
import './Banner.css';
import { Link } from "react-router-dom";

function Banner() {
    return (
        <section className="Banner">
            <div className="container">
                <div className="banner row">
                    {/* <div className="banner col-12"> */}
                    <Link className="banner__image col-12">
                        <img src="/image/bannner/vegetable-banner.jpg" alt=""/>
                        <div className="banner__title">
                            <h4 className="banner__title__1 ">Organic Meals Prepared</h4>
                            <h3 className="banner__title__2 ">Delivered to
                                <strong className="banner__title__3 "> your Home</strong>
                            </h3>
                            <div className="banner__title__4 ">Fully prepared & delivered nationwide.</div>
                        </div>
                    </Link>

                    {/* </div> */}
                </div>
            </div>
        </section>
    )
}

export default Banner