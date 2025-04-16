import React, { useState, useEffect } from 'react'
import './Search.css'
import { useParams } from 'react-router-dom';
// import SearchCard from './SearchCard'
import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import CardProduct from '../../News/CardProduct';

import {
    fetchProducts,
    fetchProductsByName,
    fetchProductsByPriceAscending,
    fetchProductsByPriceDescending,
    fetchProductsByPromotion
} from './SearchAPI';


function Search() {
    const { query } = useParams();

    const [products, setProducts] = useState([]);


    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts(query);
                setProducts(data);
            } catch (err) {
                console.error("Lỗi khi lấy sản phẩm:", err);
            }
        };
        loadProducts();
    }, [query]);

    const handleSort = async (sortFunc) => {
        try {
            const data = await sortFunc(query);
            setProducts(data);
        } catch (err) {
            console.error("Lỗi khi sắp xếp sản phẩm:", err);
        }
    };
    return (
        <div className="container">
            <div className="pageSearch">
                <div className="pageSearch__Tittle"><IoHome size={20}/> HOME / {query}</div>
                <div className='pageSearch__info'>
                    <div className="pageSearch__Filter">
                        <div className="pageSearch__Filter__content">Sort Product</div>

                        <button
                            className="pageSearch__Filter__btn"
                            onClick={() => handleSort(fetchProductsByPriceAscending)}>
                            <FaSortAmountUp />
                            Ascending
                        </button>
                        <button
                            className="pageSearch__Filter__btn"
                            onClick={() => handleSort(fetchProductsByPriceDescending)}>
                            <FaSortAmountDown />
                            Descending
                        </button>
                        <button
                            onClick={() => handleSort(fetchProductsByName)}
                            className="pageSearch__Filter__btn">By Name
                        </button>
                        <button
                            onClick={() => handleSort(fetchProductsByPromotion)}
                            className="pageSearch__Filter__btn">By Promition
                        </button>
                    </div>
                </div>
                <div className="productList">
                    {products.map((product) => (
                        <div key={product._id} className="productItem">
                            <CardProduct item={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Search