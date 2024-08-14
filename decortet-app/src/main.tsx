import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import CartPage from './CartPage.tsx'
import Navbar from './Navbar'
import Snackbar from './components/Snackbar.tsx'
import './style.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,    
  },
  {
    path: "cart",
    element: <CartPage/>,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navbar/>
    <Snackbar message='Вітаю з новим сповіщенням!' success={false}/>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
