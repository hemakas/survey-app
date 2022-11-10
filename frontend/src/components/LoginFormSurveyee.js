import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Form, Button, Row } from 'react-bootstrap'
import { getSurveyeeByAuthCode, resetSurveyee } from '../features/surveyee/surveyeeSlice'
import ReactSpinner from './ReactSpinner'

function LoginFormSurveyee() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [authCode, setAuthCode] = useState("")
  const { surveyee, isLoading, isError, isSuccess, message } = useSelector((state) => state.surveyee)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess && authCode !== '') {
      // toast.success("Logged in successfully")
      navigate('/Register')
    }
    
    dispatch(resetSurveyee())
  }, [surveyee, isError, isSuccess, message, navigate, dispatch, authCode])

  // set auth code 
  const handleSetAuthCode = (e) => {
    setAuthCode(e.target.value)
  }

  // form submit surveyee
  const handleSubmitSurveyee = (e) => {
    e.preventDefault()

    if (!authCode || authCode === '') {
      toast.error('Auth code field is required')
    } else {
      // get surveyee by auth code
      dispatch(getSurveyeeByAuthCode({ authCode }))
    }
  }

  if (isLoading) {
    <ReactSpinner />
  }

  return (
    <>
      <Form>
          {/* auth code */}
          <Row className="mb-3">
            <Form.Group>
              <Form.Label>Paste the auth code here</Form.Label>
              <Form.Control type="text" name="authCode" id="authCode" value={authCode} onChange={handleSetAuthCode} required/>
            </Form.Group>
          </Row>

          {/* login button */}
          <Form.Group>
            <Button type='submit' onClick={handleSubmitSurveyee} variant='danger'>Validate</Button>
          </Form.Group>
      </Form>
    </>
  )
}

export default LoginFormSurveyee