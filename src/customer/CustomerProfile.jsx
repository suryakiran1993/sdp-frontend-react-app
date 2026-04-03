import React, { useState } from 'react'
import axios from '../api/axiosClient'

const CustomerProfile = () => {
	const [formData, setFormData] = useState(() => {
		const loggedInCustomer = sessionStorage.getItem('loggedInCustomer')

		if (!loggedInCustomer) {
			return {
				email: '',
				username: '',
				gender: '',
				name: '',
				contact: '',
				location: '',
				password: '********' // dummy password
			}
		}

		const customer = JSON.parse(loggedInCustomer)

		return {
			email: customer.email,
			username: customer.username,
			gender: customer.gender,
			name: customer.name,
			contact: customer.contact,
			location: customer.location,
			password: '********' // dummy password
		}
	})

	const [message, setMessage] = useState('')
	const [error, setError] = useState('')

	const URL = `${import.meta.env.VITE_API_URL}/customerapi/updateprofile`

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const loggedInCustomer = sessionStorage.getItem('loggedInCustomer')

			if (!loggedInCustomer) {
				setError('Customer session not found. Please login again.')
				setMessage('')
				return
			}

			const customer = JSON.parse(loggedInCustomer)

			if (!customer?.id) {
				setError('Invalid session. Please login again.')
				setMessage('')
				return
			}

			// ✅ Base payload
			const payload = {
				id: customer.id,
				name: formData.name,
				contact: formData.contact,
				location: formData.location
			}

			// ✅ Only send password if user changed it
			if (
				formData.password &&
				formData.password !== '********'
			) {
				payload.password = formData.password
			}

			const response = await axios.post(URL, payload)

			if (response.status === 201) {
				const updatedCustomer = {
					...customer,
					name: formData.name,
					contact: formData.contact,
					location: formData.location
				}

				sessionStorage.setItem(
					'loggedInCustomer',
					JSON.stringify(updatedCustomer)
				)

				setMessage(response.data)
				setError('')

				// ✅ Reset password to dummy again
				setFormData({
					...formData,
					password: '********'
				})
			}
		} catch (err) {
			setMessage('')
			if (err.response?.status === 500) {
				setError('Internal Server Error - Failed to Update Profile')
			} else if (err.request) {
				setError('Network Error - Server not responding')
			} else {
				setError('Bad Request - Check your input')
			}
		}
	}

	return (
		<section className="customer-section-card">
			<h2>Update Customer Profile</h2>

			{message && <div className="form-message">{message}</div>}
			{error && (
				<div className="form-message form-message-error">{error}</div>
			)}

			<form onSubmit={handleSubmit} className="login-form">

				<div className="form-group">
					<label>Email Address</label>
					<input type="email" value={formData.email} disabled />
				</div>

				<div className="form-group">
					<label>Username</label>
					<input type="text" value={formData.username} disabled />
				</div>

				<div className="form-group">
					<label>Gender</label>
					<input type="text" value={formData.gender} disabled />
				</div>

				<div className="form-group">
					<label>Full Name</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-group">
					<label>Contact Number</label>
					<input
						type="text"
						name="contact"
						value={formData.contact}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-group">
					<label>Location</label>
					<input
						type="text"
						name="location"
						value={formData.location}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-group">
					<label>Password</label>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
				</div>

				<button type="submit" className="login-btn">
					Update Profile
				</button>
			</form>
		</section>
	)
}

export default CustomerProfile