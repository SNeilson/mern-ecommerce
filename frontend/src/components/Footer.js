import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className='footer mt-auto py-3 bg-dark text-white'>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <i className='fab fa-react'></i> Simple MERN Store
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
