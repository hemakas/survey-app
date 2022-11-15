import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import ReactSpinner from './ReactSpinner'
import { updateSurveyee, resetSurveyee, getSurveyeeByAuthCode } from '../features/surveyee/surveyeeSlice'

function UpdateForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { authCode } = useParams()
  const { surveyee, isLoading, isError, isSuccess, message } = useSelector((state) => state.surveyee)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  const { firstName, lastName, email, phone } = formData

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getSurveyeeByAuthCode({ authCode }))

    setFormData({ 
      firstName: surveyee.email,
      lastName: surveyee.email,
      email: surveyee.email,
      phone: surveyee.phone
    })
    
  }, [authCode, surveyee, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault()

    // form validation rules
    if ((!firstName || firstName === '') && (!lastName || lastName === ''))
      toast.error('Please enter either first name or last name')
    if (!email || email === '')
      toast.error('Please enter email')
    else {
      const surveyeeData = {
        authCode : surveyee.authCode,
        name : firstName + ' ' + lastName,
        email,
        phone
      }

      // update surveyee
      dispatch(updateSurveyee(surveyeeData))
    }
  }

  // show spinner while loading
  if (isLoading) {
    return <ReactSpinner />
  }

  return (
    <>
      <Form>
        {/* first name */}
        <FloatingLabel label="First Name" className='mb-3'>
          <Form.Control type="text" name="firstName" id="firstName" value={firstName} onChange={onChange} required placeholder="John"/>
        </FloatingLabel>

        {/* last name */}
        <FloatingLabel label="Last Name" className='mb-3'>
          <Form.Control type="text" name="lastName" id="lastName" value={lastName} onChange={onChange} required placeholder="Doe"/>
        </FloatingLabel>

        {/* email */}
        <FloatingLabel label="Email" className='mb-3'>
          <Form.Control type="email" name="email" id="email" value={email} onChange={onChange} required placeholder="john@example.com"/>
        </FloatingLabel>

        {/* phone */}
        <FloatingLabel label="Phone" className='mb-3'>
          <Form.Control type="text" name="phone" id="phone" value={phone} onChange={onChange} required placeholder="Your 10 digit phone number"/>
        </FloatingLabel>

        {/* submit button */}
        <Form.Group>
          <Button type='submit' onClick={handleSubmit} variant='primary'>Register</Button>
        </Form.Group>
      </Form>
    </>
  )

}

export default UpdateForm