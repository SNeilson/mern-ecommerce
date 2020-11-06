import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Rating from '../components/Rating'
import { useDispatch } from 'react-redux'
import { addToCart } from '../actions/cartActions'

const Product = ({ product }) => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()

  let history = useHistory()

  const addToCartHandler = () => {
    setQty(qty + 1)
    dispatch(addToCart(product._id, Number(qty)))
    history.push('/cart/')
  }

  const AddToCartButton = () => {
    if (qty > product.countInStock) {
      return (
        <Button variant='dark' size='sm' className='btn-block' disabled>
          Out Of Stock
        </Button>
      )
    } else {
      return (
        <Button
          variant='dark'
          size='sm'
          className='btn-block'
          onClick={addToCartHandler}
        >
          <span className='px-2'>
            <svg
              width='1.25em'
              height='1.25em'
              viewBox='0 0 16 16'
              className='bi bi-bag-plus'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5H2z'
              />
              <path
                fillRule='evenodd'
                d='M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z'
              />
            </svg>
          </span>
          Add to cart
        </Button>
      )
    }
  }

  return (
    <>
      <Card className='my-3'>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' />
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
        </Card.Body>
        <Card.Footer>
          <Card.Text as='div'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>

          <Card.Text as='h3' className='d-flex align-items-baseline'>
            £{product.price}
          </Card.Text>
          <AddToCartButton />
        </Card.Footer>
      </Card>
    </>
  )
}

export default Product
