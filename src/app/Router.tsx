import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout, Login, Products, Sales, Register, Cart, Product } from '@pages'

export const router = createBrowserRouter([
  {
    path: '/web-project-internet-shop',
    element: <AuthLayout />,
    children: [
      {
        path: '/web-project-internet-shop',
        element: <Products />
      },
      {
        path: '/web-project-internet-shop/sales',
        element: <Sales />
      },
      {
        path: '/web-project-internet-shop/cart',
        element: <Cart />
      },
      {
        path: '/web-project-internet-shop/product/:productId',
        element: <Product />
      }
    ]
  },
  {
    path: '/web-project-internet-shop/login',
    element: <Login />
  },
  {
    path: '/web-project-internet-shop/register',
    element: <Register />
  }
])
