import React from 'react'
import { Alert, Col, Row, Container, Card } from 'react-bootstrap'
import GenerateForm from '../components/GenerateForm'

function Generate() {
  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Generate</Alert.Heading>
      </Alert>

      <Container className='mb-3'>
        <Row>
          <Col></Col> 
          
          <Col xs={6}>
            <Card>
              <Card.Body>
                <GenerateForm />
              </Card.Body>
            </Card>
          </Col>

          <Col></Col> 
        </Row>
      </Container>      
    </>
  )
}

export default Generate