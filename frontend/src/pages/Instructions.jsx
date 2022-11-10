import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert, Col, Row, Container, Card } from 'react-bootstrap'
import InstructionsList from '../components/InstructionsList'

function Instructions() {
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
        <Alert.Heading>Instructions</Alert.Heading>
      </Alert>

      <Container className='mb-3'>
        <Row>
          <Col></Col> 
          
          <Col xs={6}>
            <Card>
              <Card.Body>
                <InstructionsList />
              </Card.Body>
            </Card>
          </Col>

          <Col></Col> 
        </Row>
      </Container>      
    </>
  )
}

export default Instructions