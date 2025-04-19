import React from 'react'
import { useMemo, useState, useEffect, useRef } from "react";
import './SlideSection1.css';

function SlideSection1() {
    const [current, setCurrent] = useState(0);
    const listRef = useRef(null);
    const images = useMemo(() => [
        "/image/slideshow/page1.webp",
        "/image/slideshow/page2.webp",
    ], []);
    const contents = [
        {
            title: "Free Shipping-orders over $100",
            description1: (
                <>
                    Free Shipping to<br />
                    First-Time Customers Only
                </>
            ),
            description2: "After promotions and discounts are applied",
            buttonText: "SHOP NOW"
        },
        {
            title: "Opening Shop",
            description1: "Enjoy exclusive deals and",
            description2: " Free shipping on your first order!",
            buttonText: "SHOP NOW"
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
            listRef.current.style.width = `${images.length * 100}vw`;
            listRef.current.style.transition = "transform 0.5s ease-in-out";
            listRef.current.style.transform = `translateX(-${current * 100}vw)`;

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
                            <h2>{contents[index].description1}</h2>
                            <p>{contents[index].description2}</p>
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