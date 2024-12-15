import { CheckOutlined, LoadingOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Button, Space, Typography } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Product } from '@shared/api'

import { ProductCardWrapper, ProductContentWrapper, ProductImage } from './ProductCard.styled.ts'

export type ProductCardProps = {
  product: Product
  showShoppingButton?: boolean
  onShoppingButton?: (product: Product) => Promise<void>
  addedToCart?: boolean
}

export function ProductCard(props: ProductCardProps) {
  const { product, showShoppingButton = true, onShoppingButton, addedToCart } = props

  const [addLoading, setAddLoading] = useState(false)

  const handleAddInCart = async () => {
    if (onShoppingButton) {
      setAddLoading(true)
      await onShoppingButton?.(product)
      setAddLoading(false)
    }
  }
  return (
    <ProductCardWrapper>
      <ProductImage src={product.image} alt={product.title} />
      <ProductContentWrapper>
        <Typography.Title style={{ margin: 0 }} level={5} ellipsis={{ rows: 2 }}>
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </Typography.Title>
        <Space>
          <Typography.Text delete={Boolean(product.sale)}>{product.price} ₽</Typography.Text>
          {Boolean(product.sale) && <Typography.Text>{product.sale} ₽</Typography.Text>}
          {showShoppingButton ? (
            <Button
              onClick={handleAddInCart}
              disabled={addLoading || addedToCart}
              icon={
                addLoading ? (
                  <LoadingOutlined />
                ) : addedToCart ? (
                  <CheckOutlined />
                ) : (
                  <ShoppingOutlined />
                )
              }
            />
          ) : (
            <></>
          )}
        </Space>
      </ProductContentWrapper>
    </ProductCardWrapper>
  )
}
