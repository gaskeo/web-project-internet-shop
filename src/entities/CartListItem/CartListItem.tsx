import { DeleteOutlined, LoadingOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Avatar, Button, Input, List, Space, Typography } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { CartItem } from '@shared/api'

export type CartListItemProps = {
  cartItem: CartItem
  onDelete: (cartItem: CartItem) => Promise<void>
  onPlus: (cartItem: CartItem) => Promise<void>
  onMinus: (cartItem: CartItem) => Promise<void>
}

export function CartListItem(props: CartListItemProps) {
  const { cartItem, onDelete, onMinus, onPlus } = props
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [minusLoading, setMinusLoading] = useState(false)
  const [plusLoading, setPlusLoading] = useState(false)

  const handleDelete = async () => {
    setDeleteLoading(true)
    if (onDelete) await onDelete(cartItem)
    setDeleteLoading(false)
  }
  const handleMinus = async () => {
    if (deleteLoading) return
    setMinusLoading(true)
    if (onMinus) await onMinus(cartItem)
    setMinusLoading(false)
  }
  const handlePlus = async () => {
    if (deleteLoading) return
    setPlusLoading(true)
    if (onPlus) await onPlus(cartItem)
    setPlusLoading(false)
  }

  return (
    <List.Item
      actions={[
        <Space.Compact>
          <Button
            disabled={cartItem.count <= 1 || plusLoading || minusLoading || deleteLoading}
            icon={minusLoading ? <LoadingOutlined /> : <MinusOutlined />}
            onClick={handleMinus}
          />
          <Input style={{ width: '40px', textAlign: 'center' }} value={cartItem.count} readOnly />
          <Button
            disabled={plusLoading || minusLoading || deleteLoading}
            icon={plusLoading ? <LoadingOutlined /> : <PlusOutlined />}
            onClick={handlePlus}
          />
        </Space.Compact>,
        <Button
          onClick={handleDelete}
          icon={deleteLoading ? <LoadingOutlined /> : <DeleteOutlined />}
        />
      ]}
    >
      <List.Item.Meta
        style={{
          alignItems: 'center'
        }}
        avatar={<Avatar size="large" shape="square" src={cartItem.product.image} />}
        title={<Link to={`/product/${cartItem.product.id}`}>{cartItem.product.title}</Link>}
        description={<Typography.Text ellipsis>{cartItem.product.description}</Typography.Text>}
      />
    </List.Item>
  )
}
