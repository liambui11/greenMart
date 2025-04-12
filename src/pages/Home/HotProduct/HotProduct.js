import React from 'react'
import { Link } from "react-router-dom";
import './HotProduct.css';

function HotProduct() {
    const itemsData = [
        {
            discount: "WEEKEND DISCOUNT",
            title: "Legumes & Cereals ",
            img: "/image/bannner/hot-product3.webp",
            describe: "Feed your family the best"

        },
        {
            discount: "WEEKEND DISCOUNT",
            title: "Dairys & Eggs",
            img: "/image/bannner/hot-product4.webp",
            describe: "A different kind of grocery store"
        },
    ];
    return (
        <section className="Hotproduct">
            <div className="container">
                <div className="hotproduct row">
                    <div className="hotproduct__Tittle">
                        <h1><strong>HOT PRODUCTS OF WEEK</strong></h1>
                        <Link className="hotproduct__Tittle__viewAll">
                            ViewAll
                        </Link>

                    </div>

                    <div className="hotproduct__Wrapper">
                        <div className="hotproduct__Card" >
                            {itemsData.map((item, index) => (
                                <div key={index}
                                    className="hotproduct__Card__item">
                                    <img
                                        alt=""
                                        className='hotproduct__Card__item__img'
                                        src={item.img}
                                    />
                                    <div className="hotproduct__Card__item__title">
                                        <h4>{item.discount}</h4>
                                        <h1>{item.title}</h1>
                                        <p>{item.describe}</p>
                                        <button type='button'>Go Now </button>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HotProduct