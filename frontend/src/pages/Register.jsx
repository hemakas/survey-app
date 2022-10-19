import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert, Col, Row, Container, Card } from 'react-bootstrap'
import RegisterForm from '../components/RegisterForm'

function Register() {
  const navigate = useNavigate()
  const { surveyee } = useSelector((state) => state.surveyee)

  useEffect(() => {
    if (!surveyee) {
      navigate('/')
    }
  }, [surveyee, navigate])

  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Register</Alert.Heading>
      </Alert>

      <Container className='mb-3'>
        <Row>
          <Col></Col> 
          
          <Col xs={6}>
            <Card>
              <Card.Body>
                <RegisterForm />
              </Card.Body>
            </Card>
          </Col>

          <Col></Col> 
        </Row>
      </Container>      
    </>
  )
}

export default Register