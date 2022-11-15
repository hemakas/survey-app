import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert, Col, Row, Container, Card } from 'react-bootstrap'
import LoginForm from '../components/LoginForm'
import LoginFormSurveyee from '../components/LoginFormSurveyee'
import { resetSurveyee } from '../features/surveyee/surveyeeSlice'
import { resetTimer } from '../features/timer/timerSlice'

function Login() {
  const dispatch = useDispatch()
  const { surveyee } = useSelector((state) => state.surveyee)
  const { surveyTimer } = useSelector((state) => state.timer)
  
  useEffect(() => {

    if(surveyee != null) {
      dispatch(resetSurveyee())
    }

    if(surveyTimer != null) {
      dispatch(resetTimer())
    }
    
  }, [surveyee, surveyTimer, dispatch])

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
                <LoginFormSurveyee />
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