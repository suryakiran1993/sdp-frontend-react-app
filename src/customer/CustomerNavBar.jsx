import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './customer.css'
import CustomerHome from './CustomerHome'
import CustomerProfile from './CustomerProfile'

const CustomerNavBar = () => {
	return (
		<div className="customer-layout">
			<nav className="customer-navbar">
				<div className="customer-brand">Customer Panel</div>

				<ul className="customer-nav-links">
					<li><Link to="/customer/home">Home</Link></li>
					<li><Link to="/customer/profile">Profile</Link></li>
					<li><button type="button">Logout</button></li>
				</ul>
			</nav>

			<main className="customer-page-wrap">
				<Routes>
					<Route path="/home" element={<CustomerHome />} />
					<Route path="/profile" element={<CustomerProfile />} />
				</Routes>
			</main>
		</div>
	)
}

export default CustomerNavBar
