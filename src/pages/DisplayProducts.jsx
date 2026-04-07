import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const URL = import.meta.env.VITE_API_URL;

const DisplayProduct = () => 
{
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get(`${URL}/demoapi/viewallproducts`);
        setProducts(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch products: ' + err.message);
      }
    };

    loadProducts();
  }, []);

  const fetchProductById = async (id) => {
    try {
      const response = await axios.post(`${URL}/demoapi/displayproductbyid?pid=${id}`);
      setProductDetails(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching product: ' + err.message);
    }
  };

  const handleSelection = (e) => 
  {
    const id = e.target.value;
    setSelectedId(id);
    if (id) 
    {
      fetchProductById(id);
    } 
    else 
    {
      setProductDetails(null);
    }
  };

  return (
    <div className="product-page-container">
      <div className="product-card">
        <h3 className="product-page-title">Display Product Details</h3>

        {error && <p className="form-message form-message-error">{error}</p>}

        <div className="product-form">
          <div className="form-group">
            <label><strong>Select a Product:</strong></label>
            <select value={selectedId} onChange={handleSelection}>
              <option value="">-- Select Product --</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {productDetails && (
          <div className="product-detail-card">
            <img
              src={`${URL}/demoapi/displayproductimage?id=${productDetails.id}`}
              className="product-detail-image"
              alt="Product"
            />
            <div className="product-detail-body">
              <h5 className="product-detail-name">{productDetails.name}</h5>
              <p className="product-detail-info">
                <strong>Category:</strong> {productDetails.category}<br />
                <strong>Description:</strong> {productDetails.description}<br />
                <strong>Cost:</strong> ₹{productDetails.cost}<br />
                <strong>URL:</strong> <a href={productDetails.url} target="_blank" rel="noopener noreferrer">Visit</a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayProduct;
