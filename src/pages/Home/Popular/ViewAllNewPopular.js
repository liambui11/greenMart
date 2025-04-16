import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
// import SearchCard from './SearchCard'
import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { fetchPopular } from './PopularAPI';
import PopularCard from './PopularCard';

function ViewAllNewPopular() {
    const navigate = useNavigate();

    const handleViewAllPopular = () => {
        navigate('/view-all-popular/');
    }


    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(8); //so san pham hienj trong 1 trang
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

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = products.slice(firstPostIndex, lastPostIndex);


    return (
        <section className="Popular">
            <div className="container">
                <div className="popular row">
                    <div className="popular--title col-12">
                        <h1><strong>NEW PRODUCTS</strong></h1>
                        <button
                            className="popular__Tittle__viewAll"
                            onClick={handleViewAllPopular}
                        >
                            ViewAll
                        </button>
                    </div>
                    <div className="popular__Card">
                        {currentPosts.map((item, index) => (
                            <div key={index} className="popular__Card__item">
                                <PopularCard item={item} />
                            </div>
                        ))}

                    </div>
                    <div className="popular--pagination">
                        <Pagination
                            totalPosts={products.length}
                            postsPerPage={postsPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ViewAllNewPopular

