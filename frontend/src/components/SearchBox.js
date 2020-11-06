import React, { useState } from 'react'
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline className='mx-3 navSearch'>
      <InputGroup className='mb-3'>
        <FormControl
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Products...'
          size='sm'
        />
        <InputGroup.Append>
          <Button type='submit' size='sm'>
            <svg
              width='1.5em'
              height='1.5em'
              viewBox='0 0 16 16'
              className='bi bi-search'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'
              />
              <path
                fillRule='evenodd'
                d='M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'
              />
            </svg>
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  )
}

export default SearchBox
