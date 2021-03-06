import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Tabs,
  Tab,
} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Rating from '../components/Rating'
import Meta from '../components/Meta'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      alert('Review submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(match.params.id, { rating, comment }))
  }
  return (
    <>
      <Link className='btn ntm-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col>
              <Row>
                <Col sm={12} md={6} lg={6} xl={6}>
                  <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col sm={12} md={6} lg={6} xl={6}>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>Price: £{product.price}</ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={12} lg={12} xl={12} className='py-5'>
                  <Tabs
                    defaultActiveKey='description'
                    id='uncontrolled-tab-example'
                  >
                    <Tab
                      eventKey='description'
                      title='Description'
                      className='py-3 px-3'
                    >
                      <h2>Description</h2>
                      {product.description}
                    </Tab>
                    <Tab eventKey='specs' title='Specifications' disabled>
                      <h2>Specs</h2>
                    </Tab>
                    <Tab
                      eventKey='reviews'
                      title='Customer Reviews'
                      className='py-3 px-3'
                    >
                      <h2>Reviews</h2>

                      {product.reviews.length === 0 && (
                        <Message>No reviews</Message>
                      )}

                      {product.reviews.map((review) => (
                        <ListGroup.Item key={review._id}>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating} />
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                        </ListGroup.Item>
                      ))}
                      <ListGroup.Item>
                        {errorProductReview && (
                          <Message variant='danger'>
                            {errorProductReview}
                          </Message>
                        )}
                        {userInfo ? (
                          <Form onSubmit={submitHandler}>
                            <Form.Group controlId='rating'>
                              <Form.Label>Rating</Form.Label>
                              <Form.Control
                                as='select'
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                              >
                                <option value=''>Select...</option>
                                <option value='1'>1 - Poor</option>
                                <option value='2'>2 - Fair</option>
                                <option value='3'>3 - Good</option>
                                <option value='4'>4 - Very Good</option>
                                <option value='5'>5 - Excellent</option>
                              </Form.Control>
                              <Form.Group controlId='comment'>
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                  as='textarea'
                                  rows={10}
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                ></Form.Control>
                              </Form.Group>
                            </Form.Group>
                            <Button type='submit' variant='primary'>
                              Submit Review
                            </Button>
                          </Form>
                        ) : (
                          <Message>
                            Please <Link to='/login'>login</Link> to write a
                            review.
                          </Message>
                        )}
                      </ListGroup.Item>
                    </Tab>
                  </Tabs>
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={12} lg={3} xl={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col sm={5}>Price:</Col>
                      <Col>
                        <strong>£{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col sm={5}>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? 'In Stock'
                            : 'Out Of Stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col md={6}>QTY</Col>
                        <Col md={6}>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Button
                          onClick={addToCartHandler}
                          className='btn-block'
                          type='button'
                          disabled={product.countInStock === 0}
                        >
                          Add To Cart
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
