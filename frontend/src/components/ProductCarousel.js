import React, { useEffect } from 'react'
import { Carousel, Image, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h2>Featured Products</h2>
      <Carousel pause='hover' className='bg-dark featured-products'>
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Row className='align-items-center'>
              <Col sm>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col sm className='px-5 py-5 text-center'>
                <h2>
                  {product.name} (£{product.price})
                </h2>
              </Col>
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
}

export default ProductCarousel
