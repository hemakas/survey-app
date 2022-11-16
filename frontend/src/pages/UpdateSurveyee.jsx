import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, Col, Row, Container, Card } from 'react-bootstrap'
import UpdateForm from '../components/UpdateForm'
import { getSurveyeeByAuthCode } from '../features/surveyee/surveyeeSlice'
import ReactSpinner from '../components/ReactSpinner'

function UpdateSurveyee() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { authCode } = useParams()
  const { surveyee } = useSelector((state) => state.surveyee)

  console.log(surveyee)

  useEffect(() => {
    if (!user) {
      navigate('/')
    }

    dispatch(getSurveyeeByAuthCode({ authCode }))

  }, [user, navigate, authCode, dispatch])

  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Edit Surveyee</Alert.Heading>
      </Alert>

      <Container className='mb-3'>
        <Row>
          <Col></Col> 
          
          <Col xs={6}>
            { surveyee ? (
              
              <Card>
                <Card.Body>
                  <UpdateForm surveyee={surveyee}/>
                </Card.Body>
              </Card>
            
            ) : (
              <ReactSpinner />
            )}
            
          </Col>
          <Col></Col> 
        </Row>
      </Container>      
    </>
  )
}

export default UpdateSurveyee