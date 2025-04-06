import { useState, useEffect, React } from 'react';
import { Link } from "react-router-dom";
import './BestSeller.css';

function ContentHome3() {
    // best__sellers
    const [current, setCurrent] = useState(0);
    const itemsPerPage = 5;
    // const [itemsPerPage, setItemsPerPage] = useState(5);
    const totalItems = 10;

    const itemsData = [
        { title: "Sản phẩm 1" },
        { title: "Sản phẩm 2" },
        { title: "Sản phẩm 3" },
        { title: "Sản phẩm 4" },
        { title: "Sản phẩm 5" },
        { title: "Sản phẩm 6" },
        { title: "Sản phẩm 7" },
        { title: "Sản phẩm 8" },
        { title: "Sản phẩm 9" },
        { title: "Sản phẩm 10" },

    ];

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1 < totalItems - itemsPerPage + 1 ? prev + 1 : 0));
    };

    const prevSlide = () => {

        setCurrent((prev) => (prev - 1 >= 0 ? prev - 1 : totalItems - itemsPerPage));
    };
    return (
        <section className="Seller">
            <div className="container">
                <div className="seller row">
                    <div className="seller__Tittle">
                        <h1><strong>BEST SELLERS</strong></h1>
                        <div className="seller__arrow">
                            <button type="button" className="seller__arrow__left" onClick={prevSlide}>{"<"}</button>
                            <button type="button" className="seller__arrow__right" onClick={nextSlide}>{">"}</button>
                            <Link className="seller__Tittle__viewAll">
                                ViewAll
                            </Link>
                        </div>


                    </div>

                    <div className="seller__Wrapper">

                        <div className="seller__Card" >
                            {itemsData.map((item, index) => (
                                <div key={index}
                                    className={`seller__Card__item ${index >= current && index < current + itemsPerPage ? "active" : "hidden"}`}>
                                    <p className="seller__Card__item__title">{item.title}</p>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContentHome3;