import React from 'react'
import { useMemo, useState, useEffect, useRef } from "react";
import './SlideSection1.css';
//Ảnh bị lệch là do kích thước max của ảnh k bằng nhau có giới hạn
function SlideSection1() {
    const [current, setCurrent] = useState(0);
    const listRef = useRef(null);
    // const imgRef = useRef(null);
    // const images = ["/image/page2.jpg", "/image/page1.jpg"];
    const images = useMemo(() => [
        "/image/page2.jpg",
        "/image/page1.jpg",
    ], []);
    const contents = [
        {
            title: "Free Shipping-orders over $100",
            description: "Free Shipping to First-Time Customers Only, After promotions and discounts are applied",
            buttonText: "Shop Now"
        },
        {
            title: "Opening Shop",
            description: "Enjoy exclusive deals and free shipping on your first order!",
            buttonText: "Explore Now"
        }
    ];


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 2000);

        return () => clearInterval(interval);
    }, [images]);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.style.transition = "transform 0.5s ease-in-out";
            listRef.current.style.transform = `translateX(-${current * 100}%)`;

        }
    }, [current]); // Khi current thay đổi, update vị trí ảnh

    return (
        <section className="section1 mt-8">
            <div className="container">
                <div className="slideshow">
                    <div ref={listRef} className="list-images">
                        {images.map((src, index) => (
                            <img key={index} className="img1" src={src} alt="" />
                        ))}
                    </div>

                    {/* <!-- Thẻ nội dung trong ảnh --> */}
                    {images.map((_, index) => (
                        <div key={index} className={`slideshow-content ${current === index ? "active" : ""}`}>
                            <h6>{contents[index].title}</h6>
                            <p>{contents[index].description}</p>
                            <button>{contents[index].buttonText}</button>
                        </div>

                    ))}

                    <div className="container-dots">
                        <span className="dot" onClick={() => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))}></span>
                        <span className="dot" onClick={() => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))}></span>
                    </div>
                </div>
            </div>
        </section>
    );

}

export default SlideSection1