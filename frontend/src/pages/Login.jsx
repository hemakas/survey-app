import { Alert, Col, Row, Container, Card } from 'react-bootstrap'
import LoginForm from '../components/LoginForm'
import LoginFormSurveyee from '../components/LoginFormSurveyee'

function Login() {
  // window.location.reload(false)

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