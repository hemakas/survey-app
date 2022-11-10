import React from 'react'
import { Container, Card } from 'react-bootstrap'

function ThankYou() {
  return (
    <Container className='mb-3 d-flex justify-content-center align-items-center'>
      <Card border="secondary">
        <Card.Body>
          <Card.Title className='text-center'>Thank you!</Card.Title>
        </Card.Body>
        <Card.Text>
          Your response has been saved successfully.
        </Card.Text>
      </Card>
    </Container>  
  )
}

export default ThankYou