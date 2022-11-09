import React from 'react'
import { Container, Card } from 'react-bootstrap'

function ThankYou() {
  return (
    <Container className='mb-3'>
      <Card>
        <Card.Title className='text-center'>Thank you!</Card.Title>
        <Card.Body className='text-center'>Your response was saved</Card.Body>
      </Card>
    </Container>  
  )
}

export default ThankYou