import axios from 'axios'

const axiosClient = axios.create()

const clearAuthSession = () => {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('role')
  sessionStorage.removeItem('loggedInRole')
  sessionStorage.removeItem('loggedInAdmin')
  sessionStorage.removeItem('loggedInCustomer')
  sessionStorage.removeItem('loggedInServiceManager')
}

axiosClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token')

    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearAuthSession()

      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default axiosClient
