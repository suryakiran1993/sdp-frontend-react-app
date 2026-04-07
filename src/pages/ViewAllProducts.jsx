import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const URL = import.meta.env.VITE_API_URL;

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try 
      {
        const response = await axios.get(`${URL}/demoapi/viewallproducts`);
        setProducts(response.data);
        setError('');
      } 
      catch (err) 
      {
        setError('Failed to fetch products. ' + err.message);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="product-table-container">
      <h3 className="product-heading">All Products</h3>

      {error && <p className="product-error">{error}</p>}

      <div className="table-responsive">
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Cost</th>
              <th>URL</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>₹{product.cost}</td>
                <td>
                  <a href={product.url} target="_new" rel="noopener noreferrer">
                    Visit
                  </a>
                </td>
                <td>
                  <img
                    src={`${URL}/demoapi/displayproductimage?id=${product.id}`}
                    alt="Product Image Here"
                    className="table-image"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllProducts;
