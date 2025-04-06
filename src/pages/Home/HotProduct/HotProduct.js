import React from 'react'
import { Link } from "react-router-dom";
import './HotProduct.css';

function HotProduct() {
    const itemsData = [
        { title: "Sản phẩm 1" },
        { title: "Sản phẩm 2" },
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
                                    <p className="hotproduct__Card__item__title">{item.title}</p>
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