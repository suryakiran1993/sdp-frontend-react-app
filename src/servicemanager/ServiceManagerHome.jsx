import React from 'react'

const ServiceManagerHome = () => {
  const storedManager = sessionStorage.getItem('loggedInServiceManager')
  const manager = storedManager ? JSON.parse(storedManager) : null
  const managerName = manager?.managername || 'Service Manager'
  
  return (
    <section className="sm-section-card">
      <h2>Service Manager Home</h2>
      <p>Welcome, {managerName}</p>
    </section>
  )
}

export default ServiceManagerHome
