import React from 'react'
import { Container, Card } from 'react-bootstrap'

function ThankYou() {
  return (
    <Container className='mb-3'>
      <div className='mb-3 d-flex align-items-center justify-content-center'>

        <Card border="secondary" className='m-5'>
          <Card.Body>
            <Card.Title className='text-center'>Thank you!</Card.Title>
            <Card.Text>Your response has been saved successfully.</Card.Text>
          </Card.Body>
        </Card>

      </div>
    </Container>  
  )
}

export default ThankYou