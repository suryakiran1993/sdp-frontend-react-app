import React from 'react'

const AdminHome = () => {
  const storedAdmin = sessionStorage.getItem('loggedInAdmin')
  const admin = storedAdmin ? JSON.parse(storedAdmin) : null
  const adminName = admin?.username || 'Admin'
 
  return (
    <section className="admin-section-card">
      <h2>Admin Home</h2>
      <p>Welcome, {adminName}</p>
    </section>
  )
}

export default AdminHome
