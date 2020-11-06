import React from 'react'
import { Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const CartIcon = () => {
  return (
    <span className='cartIcon mx-1'>
      <svg
        width='1.4em'
        height='1.4em'
        viewBox='0 0 18 18'
        className='bi bi-basket'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          d='M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z'
        />
      </svg>
    </span>
  )
}

const CartInfo = () => {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0)

  return (
    <>
      <CartIcon /> Cart
      <sup>
        <Badge pill variant='light' className='mx-1 cartBadge'>
          {cartCount}
        </Badge>
      </sup>
    </>
  )
}

export default CartInfo