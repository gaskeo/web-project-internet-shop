import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout, Login, Products, Sales, Register, Cart, Product } from '@pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: <Products />
      },
      {
        path: '/sales',
        element: <Sales />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/product/:productId',
        element: <Product />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
])
