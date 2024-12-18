import { Col, Row } from 'antd'
import { useMemo } from 'react'

import { ProductCard } from '@entities/ProductCard'
import { Product, useAddToCart, useCart, useCurrentUser } from '@shared/api'

export type ProductGridProps = {
  products: Product[]
}

export function ProductGrid(props: ProductGridProps) {
  const { user } = useCurrentUser()
  const { addToCart } = useAddToCart(user?.uid ?? '')

  const { cart } = useCart(user?.uid ?? '')
  const addedToCart = useMemo(() => cart.map((c) => c.id.split('_').at(-1)), [cart])
  const handleShoppingButton = async (product: Product) => {
    if (user) await addToCart({ userId: user.uid, productId: product.id, count: 1 })
  }

  return (
    <Row gutter={[16, 16]}>
      {props.products.map((product) => (
        <Col xs={24} sm={8} md={6} lg={6} xl={4}>
          <ProductCard
            key={product.id}
            product={product}
            addedToCart={addedToCart.includes(product.id)}
            onShoppingButton={handleShoppingButton}
          />
        </Col>
      ))}
    </Row>
  )
}
