import React from 'react'

const CustomerHome = () => {
  const storedCustomer = sessionStorage.getItem('loggedInCustomer')
  const customer = storedCustomer ? JSON.parse(storedCustomer) : null
  const customerName = customer?.name || 'Customer'
 
  return (
    <section className="customer-section-card">
      <h2>Customer Home</h2>
      <p>Welcome, {customerName}</p>
    </section>
  )
}

export default CustomerHome
