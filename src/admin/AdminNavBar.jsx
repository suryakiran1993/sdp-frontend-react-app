import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './admin.css'
import AdminHome from './AdminHome'
import AddServiceManager from './AddServiceManager'
import ViewServiceManagers from './ViewServiceManagers'
import ViewCustomers from './ViewCustomers'

const AdminNavBar = () => {
	return (
		<div className="admin-layout">
			<nav className="admin-navbar">
				<div className="admin-brand">Admin Panel</div>
				<ul className="admin-nav-links">
					<li><Link to="/admin/home">Home</Link></li>
					<li><Link to="/admin/addsm">Add Service Manager</Link></li>
					<li><Link to="/admin/viewsm">View Service Managers</Link></li>
					<li><Link to="/admin/viewcustomers">View Customers</Link></li>
                    <li><button>Logout</button></li>
				</ul>
			</nav>

			<main className="admin-page-wrap">
				<Routes>
					<Route path="/home" element={<AdminHome />} />
					<Route path="/addsm" element={<AddServiceManager />} />
					<Route path="/viewsm" element={<ViewServiceManagers />} />
					<Route path="/viewcustomers" element={<ViewCustomers />} />
				</Routes>
			</main>
		</div>
	)
}

export default AdminNavBar
