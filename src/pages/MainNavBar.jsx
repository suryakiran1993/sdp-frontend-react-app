import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import './style.css'
import Home from './Home'
import CustomerRegistration from './CustomerRegistration'
import CustomerLogin from './CustomerLogin'
import ServiceManagerLogin from './ServiceManagerLogin'
import AdminLogin from './AdminLogin'
import Login from './Login'
import Contact from './Contact'
import MUIDemo from './MUIDemo'
import PageNotFound from './PageNotFound'
import AddProduct from './AddProduct'
import DisplayProduct from './DisplayProducts'
import ViewAllProducts from './ViewAllProducts'

const MainNavBar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">Service Management System</div>
        <ul className="navbar-links">

          <li><Link to="/">Home</Link></li>
          <li><Link to="/customerregistration">Customer Registration</Link></li>
          <li className="nav-dropdown">
            <button type="button" className="nav-dropdown-label">Products</button>
            <ul className="dropdown-menu">
              <li><Link to="/products/add">Add Product</Link></li>
              <li><Link to="/products/display">Display Product</Link></li>
              <li><Link to="/products/all">View All Products</Link></li>
            </ul>
          </li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/muidemo">MUI Demo</Link></li>
          
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customerregistration" element={<CustomerRegistration />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/muidemo" element={<MUIDemo />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/display" element={<DisplayProduct />} />
        <Route path="/products/all" element={<ViewAllProducts />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default MainNavBar
