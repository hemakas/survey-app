import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert, Col, Row, Container, Card } from 'react-bootstrap'
import GenerateForm from '../components/GenerateForm'

function Generate() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  console.log(user)

  useEffect(() => {
    // redirect if user not found
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

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