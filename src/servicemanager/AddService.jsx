import React, { useState } from 'react'
import axios from '../api/axiosClient'

const AddService = () => {
  const storedManager = sessionStorage.getItem('loggedInServiceManager')
  const manager = storedManager ? JSON.parse(storedManager) : null
  const managerId = manager?.id

  const [formData, setFormData] = useState({
    category: '',
    name: '',
    description: '',
    baseprice: '',
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const URL = `${import.meta.env.VITE_API_URL}/servicemanagerapi/addservicedetails`

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!managerId) {
      setMessage('')
      setError('Manager details are not available in session. Please sign in with the service manager portal.')
      return
    }

    const payload = {
      category: formData.category,
      name: formData.name,
      description: formData.description,
      baseprice: Number(formData.baseprice),
      serviceManager: { id: Number(managerId) },
    }

    try {
      const response = await axios.post(URL, payload)

      if (response.status === 201) {
        setMessage(response.data)
        setError('')
        setFormData({
          category: '',
          name: '',
          description: '',
          baseprice: '',
        })
      }
    } catch (err) {
      setMessage('')
      if (err.response?.status === 500) {
        setError('Internal Server Error - Failed to add service')
      } else if (err.request) {
        setError('Network Error - Server not responding')
      } else {
        setError('Bad Request - Check your input')
      }
    }
  }

  if (!managerId) {
    return (
      <section className="sm-section-card">
        <h2 style={{ textAlign: 'center' }}>Add Service</h2>
        <p className="sm-error" style={{ textAlign: 'center' }}>
          Manager details are not available in session. Please sign in with the service manager portal.
        </p>
      </section>
    )
  }

  return (
    <section className="sm-section-card">
      <h2 style={{ textAlign: 'center' }}>Add Service</h2>
      {message && <p className="sm-success" style={{ textAlign: 'center' }}>{message}</p>}
      {error && <p className="sm-error" style={{ textAlign: 'center' }}>{error}</p>}

      <form onSubmit={handleSubmit} className="sm-form-grid">
        <input
          name="name"
          placeholder="Service Name"
          value={formData.name}
          onChange={handleChange}
          required
          maxLength={100}
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Service Category</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Repair">Repair</option>
          <option value="Installation">Installation</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Inspection">Inspection</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="number"
          min="0"
          step="0.01"
          name="baseprice"
          placeholder="Base Price"
          value={formData.baseprice}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Service Description"
          value={formData.description}
          onChange={handleChange}
          required
          maxLength={100}
        />
        <button type="submit" className="sm-primary-btn">Add Service Details</button>
      </form>
    </section>
  )
}

export default AddService
