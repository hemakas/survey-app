import React from 'react'
import { Alert, Col, Row, Container, Card } from 'react-bootstrap'
import LoginForm from '../components/LoginForm'
import LoginForm2 from '../components/LoginForm2'

function Login() {
  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Login</Alert.Heading>
      </Alert>

      <Container className='mb-3'>
        <Row>
          <Col xs={5}>
            <Card>
              <Card.Body>
                <Card.Title className='text-center'>Login with auth code</Card.Title>
                <LoginForm2 />
              </Card.Body>
            </Card>
          </Col> 

          <Col xs={2}>
            <div className='vl'></div>
          </Col>
          
          <Col xs={5}>
            <Card>
              <Card.Body>
                <Card.Title className='text-center'>Login with credentials</Card.Title>
                <LoginForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>      
    </>
  )
}

export default Login