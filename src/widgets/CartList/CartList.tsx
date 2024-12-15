import { List } from 'antd'

import { CartListItem } from '@entities/CartListItem'
import { CartItem, useCurrentUser, useDeleteFromCart, useSetItemCountInCart } from '@shared/api'

export type CartListProps = {
  cart: CartItem[]
}

export function CartList(props: CartListProps) {
  const { user } = useCurrentUser()
  const { deleteFromCart } = useDeleteFromCart(user?.uid ?? '')
  const { setItemCountInCart } = useSetItemCountInCart(user?.uid ?? '')

  const handleDeleteFromCart = async (cartItem: CartItem) => {
    if (user) await deleteFromCart(cartItem.id)
  }

  const handlePlus = async (cartItem: CartItem) => {
    if (user) await setItemCountInCart({ itemId: cartItem.id, count: cartItem.count + 1 })
  }

  const handleMinus = async (cartItem: CartItem) => {
    if (user) await setItemCountInCart({ itemId: cartItem.id, count: cartItem.count - 1 })
  }
  return (
    <List>
      {props.cart.map((cart) => (
        <CartListItem
          key={cart.id}
          cartItem={cart}
          onMinus={handleMinus}
          onPlus={handlePlus}
          onDelete={handleDeleteFromCart}
        />
      ))}
    </List>
  )
}
