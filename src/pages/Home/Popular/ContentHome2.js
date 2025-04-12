import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './ContentHome.css'
import PopularCard from './PopularCard';
import { fetchPopular } from './PopularAPI';

function ContentHome2() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchPopular();
                setProducts(data);
            } catch (err) {
                console.error("Lỗi khi lấy sản phẩm:", err);
            }
        };
        loadProducts();
    }, []);

    // const itemsData = [
    //     {
    //         imageSrc: "https://via.placeholder.com/120",
    //         productName: "Sản phẩm 1",
    //         originalPrice: 100,
    //         discountedPrice: 80,
    //         saleBadge: 20
    //     },
    //     {
    //         imageSrc: "https://via.placeholder.com/120",
    //         productName: "Sản phẩm 2",
    //         originalPrice: 150,
    //         discountedPrice: 120,
    //         saleBadge: 20
    //     },
    //     {
    //         imageSrc: "https://via.placeholder.com/120",
    //         productName: "Sản phẩm 3",
    //         originalPrice: 200,
    //         discountedPrice: 160,
    //         saleBadge: 20
    //     },
    //     {
    //         imageSrc: "https://via.placeholder.com/120",
    //         productName: "Sản phẩm 4",
    //         originalPrice: 250,
    //         discountedPrice: 225,
    //         saleBadge: 10
    //     },
    //     {
    //         imageSrc: "https://via.placeholder.com/120",
    //         productName: "Sản phẩm 5",
    //         originalPrice: 300,
    //         discountedPrice: 240,
    //         saleBadge: 20
    //     },
    //     {
    //         imageSrc: "https://via.placeholder.com/120",
    //         productName: "Sản phẩm 6",
    //         originalPrice: 300,
    //         discountedPrice: 240,
    //         saleBadge: 20
    //     },
    //     {
    //         imageSrc: "https://via.placeholder.com/120",
    //         productName: "Sản phẩm 7",
    //         originalPrice: 300,
    //         discountedPrice: 240,
    //         saleBadge: 20
    //     },
    //     {
    //         imageSrc: "https://via.placeholder.com/120",
    //         productName: "Sản phẩm 8",
    //         originalPrice: 300,
    //         discountedPrice: 240,
    //         saleBadge: 20
    //     },
    // ];


    return (
        <section className="Popular">
            <div className="container">
                <div className="popular row">
                    <div className="popular__Tittle col-12">
                        <h1><strong>NEW PRODUCTS</strong></h1>
                        <Link className="popular__Tittle__viewAll">
                            ViewAll
                        </Link>
                    </div>
                    <div className="popular__Card">
                        {products.map((item, index) => (
                            <div key={index} className="popular__Card__item">
                                <PopularCard item={item} />
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContentHome2