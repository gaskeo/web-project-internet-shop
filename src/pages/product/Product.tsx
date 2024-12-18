import { CheckOutlined, LoadingOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Button, Image, Typography } from 'antd'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { useAddToCart, useCart, useCurrentUser, useProduct } from '@shared/api'

export function Product() {
  const { productId } = useParams()
  const { user } = useCurrentUser()

  const { addToCart, isLoading: addLoading } = useAddToCart(user?.uid ?? '')
  const { cart } = useCart(user?.uid ?? '')
  const addedToCart = useMemo(
    () => cart.map((c) => c.id.split('_').at(-1)).includes(productId),
    [cart]
  )
  const { product } = useProduct(productId ?? '')
  if (!product) return <></>
  return (
    <ProductWrapper>
      <ProductContainer>
        <div>
          <Image width={'min(98vw, 490px)'} src={product.image} />
        </div>
        <DescriptionBlock>
          <Typography.Title>{product.title}</Typography.Title>
          <Button
            onClick={() =>
              addToCart({ userId: user?.uid ?? '', productId: productId ?? '', count: 1 })
            }
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
          >
            {addLoading ? 'Загрузка...' : addedToCart ? 'В корзине' : 'Добавить в корзину'}
          </Button>
          <Typography.Paragraph>{product.description}</Typography.Paragraph>
        </DescriptionBlock>
      </ProductContainer>
    </ProductWrapper>
  )
}

const ProductWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ProductContainer = styled.div`
  max-width: 1000px;

  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;

  & > *:first-child {
    flex-basis: min(98vw, 490px);

    &,
    & * {
      border-radius: ${(props) => props.theme.token.borderRadius}px;
    }

    overflow: hidden;
  }
`

const DescriptionBlock = styled.div`
  width: min(98vw, 490px);

  background-color: ${(props) => props.theme.token.colorBgLayout};
  border-radius: ${(props) => props.theme.token.borderRadius}px;
  padding: ${(props) => props.theme.token.padding}px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  & > *:first-child {
    margin-top: 0;
    margin-bottom: 0;
  }
`
