import React, { useRef, useState } from 'react';
import axios from 'axios';
import './style.css';

const URL = `${import.meta.env.VITE_API_URL}/demoapi/addproduct`;

const AddProduct = () => 
{
  const [product, setProduct] = useState({
    category: '',
    name: '',
    description: '',
    cost: '',
    url: ''
  });
  const [productImage, setProductImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error,setError] = useState("")
  const imageInputRef = useRef(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => 
 {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productimage', productImage);
    formData.append('category', product.category);
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('cost', product.cost);
    formData.append('url', product.url);

    try 
    {
      const response = await axios.post(URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data);
      setError("")

      //Clear form fields
    setProduct({
        category: '',
        name: '',
        description: '',
        cost: '',
        url: ''
      });
      setProductImage(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }

    } 
    catch (error) 
    {
      console.log(error.message)
      setMessage("")
      setError(error.message);
    }
  };

  return (
    <div className="product-page-container">
      <div className="product-card">
        <h3 className="product-page-title">Add Product</h3>
        {message && <p className="form-message form-message-success">{message}</p>}
        {error && <p className="form-message form-message-error">{error}</p>}
        <form className="product-form" onSubmit={handleSubmit} encType="multipart/form-data">

          <div className="form-group">
            <label>Category:</label>
            <select name="category" value={product.category} onChange={handleChange} required>
              <option value="">-- Select Category --</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Books">Books</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={product.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea name="description" value={product.description} rows="3" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Cost:</label>
            <input type="number" step="0.01" name="cost" value={product.cost} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>URL:</label>
            <input type="text" name="url" value={product.url} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Product Image:</label>
            <input type="file" ref={imageInputRef} onChange={handleImageChange} required />
          </div>
          <button type="submit" className="product-submit-btn">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
