import { useEffect, useState } from "react";
import { getProductList } from "../../services/productsService";
import "./Product.css"; 
import ProductItem from "./ProductItem";


function Product() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchApi = async () => {
        const result = await getProductList();
        console.log(result);
        setProducts(result);
      };
      fetchApi();
    }, []);
  

    return (
        <>
            {products.length > 0 && (
                <div className="product">
                    {products.map((item) => (
                        <ProductItem item={item} key={item.productID}/>
                    ))}
                 </div>
            )}
        </>
    )
}

export default Product;