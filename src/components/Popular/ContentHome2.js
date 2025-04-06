import React from 'react'
import { Link } from "react-router-dom";
import './ContentHome.css'

function ContentHome2() {
    const itemsData = [
        { title: "Sản phẩm 1" },
        { title: "Sản phẩm 2" },
        { title: "Sản phẩm 3" },
        { title: "Sản phẩm 4" },
        { title: "Sản phẩm 5" },

        { title: "Sản phẩm 1" },
        { title: "Sản phẩm 2" },
        { title: "Sản phẩm 3" },
        { title: "Sản phẩm 4" },
        { title: "Sản phẩm 5" },

    ];


    return (
        <section className="Popular">
            <div className="container">
                <div className="popular row">
                    <div className="popular__Tittle col-12">
                        <h1><strong>POPULAR PRODUCTS</strong></h1>
                        <Link className="popular__Tittle__viewAll">
                            ViewAll
                        </Link>
                    </div>
                    <div className="popular__Card">
                        {itemsData.map((item, index) => (
                            <div key={index} className="popular__Card__item">
                                <p className="popular__Card__item__title">{item.title}</p>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContentHome2