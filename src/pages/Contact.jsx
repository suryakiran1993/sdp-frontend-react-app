import React, { useState } from 'react'
import axios from 'axios'
import './style.css'

const Contact = () => {
  const [formData, setFormData] = useState({
     fullname: '',
     subject: '',
     message: '',
     receiveremail: '',
     contact: '',
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => 
  {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    try 
    {
      const response = await axios.post('http://localhost:2026/demoapi/sendemail',formData)
      setMessage(response.data) // "Email Sent Successfully"
      if (response.status === 200)
      {
        setMessage(response.data)
        setFormData({
          fullname: '',
          subject: '',
          message: '',
          receiveremail: '',
          contact: '',
        })

      }
    } 
    catch (err) 
     {
      setMessage('')
      if (err.response?.status === 500) 
      {
        setError('Internal Server Error - Failed to add service')
      } 
      else if (err.request) 
      {
        setError('Network Error - Server not responding')
      } 
      else 
      {
        setError('Bad Request - Check your input')
      }
    }
  }

  return (
    <div className="login-container">
      <div className="login-card registration-card">
        <h2 className="login-title">Contact Us</h2>

        {message && (
          <div className="form-message form-message-success">
            {message}
          </div>
        )}

        {error && (
          <div className="form-message form-message-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Enter subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              placeholder="Enter message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="receiveremail"
              placeholder="Enter email"
              value={formData.receiveremail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contact</label>
            <input
              type="tel"
              name="contact"
              placeholder="Enter contact number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact