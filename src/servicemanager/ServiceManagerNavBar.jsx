import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './servicemanager.css'
import ServiceManagerHome from './ServiceManagerHome'
import AddService from './AddService'
import ViewServices from './ViewServices'
import ViewBookings from './ViewBookings'

const ServiceManagerNavBar = () => {
	return (
		<div className="sm-layout">
			<nav className="sm-navbar">
				<div className="sm-brand">Service Manager Panel</div>

				<ul className="sm-nav-links">
					<li><Link to="/servicemanager/home">Home</Link></li>
					<li><Link to="/servicemanager/addservice">Add Service</Link></li>
					<li><Link to="/servicemanager/viewaservices">View Services</Link></li>
					<li><Link to="/servicemanager/viewbookings">View Bookings</Link></li>
					<li><button type="button">Logout</button></li>
				</ul>
			</nav>

			<main className="sm-page-wrap">
				<Routes>
					<Route path="/home" element={<ServiceManagerHome />} />
					<Route path="/addservice" element={<AddService />} />
					<Route path="/viewservices" element={<ViewServices />} />
					<Route path="/viewbookings" element={<ViewBookings />} />
				</Routes>
			</main>
		</div>
	)
}

export default ServiceManagerNavBar
