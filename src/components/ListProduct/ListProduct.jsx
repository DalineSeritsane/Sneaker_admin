import React, { useEffect, useState } from 'react'
import "./listProduct.css"
import cross_icon from "../../assets/cross_icon.jpg"

const ListProduct = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const res = await fetch(`${backendURL}/allproducts`);
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    try {
      await fetch(`${backendURL}/removeproduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      });
      await fetchInfo();
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className='listproduct-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr />
        {allproducts.map((product, index) => (
          <React.Fragment key={product.id}>
            <div className='listproduct-format-main listproduct-format'>
              <img src={product.image} alt='' className='listproduct-product-icon' />
              <p>{product.name}</p>
              <p>${product.price}</p>
              <p>{product.category}</p>
              <img onClick={() => remove_product(product.id)} className='listproduct-remove-icon' src={cross_icon} alt='Remove' />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
