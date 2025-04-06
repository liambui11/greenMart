import { useState, useEffect, useRef, React } from 'react';
import './MyCategory.css';

function MyCategory() {
    const [current, setCurrent] = useState(0);
    const listRef = useRef(null);

    const itemWidth = useRef(0);
    const gap = useRef(0);
    const isTransitioning = useRef(false);

    const itemsData = [
        { title: "Sản phẩm 1" },
        { title: "Sản phẩm 2" },
        { title: "Sản phẩm 3" },
        { title: "Sản phẩm 4" },
        { title: "Sản phẩm 5" },
        { title: "Sản phẩm 6" },
        { title: "Sản phẩm 7" },
        { title: "Sản phẩm 8" },
    ];

    const totalItems = itemsData.length;

    const extendedItems = [...itemsData, ...itemsData]; // Clone sản phẩm đầu tiên

    // useEffect(() => {
    //     if (listRef.current) {
    //         const firstItem = listRef.current.children[0];
    //         if (firstItem) {
    //             const style = window.getComputedStyle(listRef.current);
    //             gap.current = parseFloat(style.gap) || 0;
    //             itemWidth.current = firstItem.offsetWidth + gap.current;
    //         }
    //     }
    // }, []);

    useEffect(() => {
        const updateItemWidth = () => {
            if (listRef.current) {
                const firstItem = listRef.current.children[0];
                if (firstItem) {
                    const style = window.getComputedStyle(listRef.current);
                    gap.current = parseFloat(style.gap) || 0;
                    itemWidth.current = firstItem.offsetWidth + gap.current;
                }
            }
        };

        updateItemWidth(); // Gọi khi component mount
        window.addEventListener("resize", updateItemWidth); // Cập nhật khi thay đổi kích thước màn hình

        return () => {
            window.removeEventListener("resize", updateItemWidth);
        };
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {

        if (current === totalItems + 1) {
            setCurrent(0);
        }
    }, [current]);

    const nextSlide = () => {
        if (!isTransitioning.current) {
            setCurrent((prev) => prev + 1);
        }
    };

    const prevSlide = () => {
        if (!isTransitioning.current) {
            setCurrent((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
        }
    };

    const getTransformStyle = () => ({
        transform: `translateX(-${current * itemWidth.current}px)`,
        transition: current === totalItems ? "none" : "transform 1s ease-in-out",
    });

    return (
        <section className="Category">
            <div className="container">
                <div className="category row">
                    <div className="category__Tittle">
                        <h1><strong>MY CATEGORY</strong></h1>
                        <div className="category__Tittle__arrow">
                            <div className="category__Tittle__arrow__left" onClick={prevSlide}>{"<"}</div>
                            <div className="category__Tittle__arrow__right" onClick={nextSlide}>{">"}</div>
                        </div>
                    </div>
                    <div className="category__Wrapper">
                        <div ref={listRef} className="category__Card" style={getTransformStyle()}>
                            {extendedItems.map((item, index) => (
                                <div key={index} className="category__Card__item">
                                    <p className="category__Card__item__title">{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MyCategory;
