import styled from 'styled-components'

import { useCart, useCurrentUser } from '@shared/api'
import { CartList } from '@widgets/CartList'

export function Cart() {
  const { user } = useCurrentUser()
  const { cart } = useCart(user?.uid ?? null)
  return (
    <CartPageWrapper>
      <CartList cart={cart} />
    </CartPageWrapper>
  )
}

const CartPageWrapper = styled.div`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
`
