import React, { useState } from 'react'
import "./addProduct.css"
import upload_icon from "../../assets/upload.jpg"

const AddProduct = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "valentino",
    price: ""
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_products = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('file', image);

    try {
      // Upload image
      const uploadRes = await fetch(`${backendURL}/upload`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      });
      responseData = await uploadRes.json();

      if (responseData.success) {
        product.image = responseData.image_url;

        // Add product
        const addRes = await fetch(`${backendURL}/addproduct`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product)
        });
        const data = await addRes.json();

        alert(data.success ? "Product Added!" : "Failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className='add-product'>
      <div className='addproduct-itemfield'>
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
      </div>
      <div className='addproduct-price'>
        <div className='addproduct-itemfield'>
          <p>Price</p>
          <input value={productDetails.price} onChange={changeHandler} type='text' name="price" placeholder='Type here' />
        </div>
      </div>
      <div className='addproduct-itemfield'>
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name='category' className='addproduct-selector'>
          <option value="nike">Nike</option>
          <option value="puma">Puma</option>
          <option value="valentino">Valentino</option>
        </select>
      </div>
      <div className='addproduct-itemfield'>
        <label htmlFor='file-input'>
          <img src={image ? URL.createObjectURL(image) : upload_icon} className='addproduct-img' alt='' />
        </label>
        <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
      </div>
      <button onClick={Add_products} className='addproduct-btn'>ADD</button>
    </div>
  );
};

export default AddProduct;
