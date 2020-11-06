import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'

const MiniCart = () => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <>
      <ListGroup variant='flush'>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <ListGroup.Item key={item.product} className='mini-cart'>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid />
                </Col>
                <Col md={4}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={2}>£{item.price}</Col>
                <Col md={2}>
                  <Form.Control
                    as='select'
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={1}>
                  <Button
                    type='button'
                    variant='light'
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>
            <h4>You have no items in your cart</h4>
          </ListGroup.Item>
        )}

        <ListGroup.Item>
          <Row>
            {' '}
            <Button
              href='/cart/'
              variant='dark'
              size='sm'
              className='my-2 mx-1'
            >
              Go To Cart
            </Button>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}

export default MiniCart
