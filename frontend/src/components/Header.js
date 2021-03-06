import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import { useHistory } from 'react-router-dom'
import CartInfo from './CartInfo'
import MiniCart from './MiniCart'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const history = useHistory()

  const logoutHandler = () => {
    dispatch(logout())
    history.push('/login')
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect fixed='top'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <i className='fab fa-react'></i> Simple MERN Store
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <NavDropdown
                title={<CartInfo />}
                alignRight
                className='cartdropdown'
              >
                <MiniCart />
              </NavDropdown>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/' exact>
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/users/'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/products/'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orders/'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
