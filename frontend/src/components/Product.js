import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
const Product = ({ product }) => {
  return (
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
      </Card.Footer>
    </Card>
  )
}

export default Product
