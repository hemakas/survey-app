import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import ReactSpinner from './ReactSpinner'
import { updateSurveyee, logoutSurveyee } from '../features/surveyee/surveyeeSlice'

function UpdateForm({ surveyee }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState(  surveyee.name ? (surveyee.name.split(' ')[0]) : '' )
  const [lastName, setLastName] = useState( surveyee.name ? (surveyee.name.split(' ')[1]) : '' )
  const [email, setEmail] = useState(surveyee.email ? surveyee.email : '')
  const [phone, setPhone] = useState(surveyee.phone ? surveyee.phone : '')

  const { isLoading, isError, message } = useSelector((state) => state.surveyee)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    
  }, [isError, message])

  // setting values
  const onFirstNameChange = e => setFirstName(e.target.value)
  const onLastNameChange = e => setLastName(e.target.value)
  const onEmailChange = e => setEmail(e.target.value)
  const onPhoneChange = e => setPhone(e.target.value)

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

      // get the surveyee info out of state.surveyee
      dispatch(logoutSurveyee())

      toast.success('Surveyee updated!')
      navigate('/Responses')
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
          <Form.Control type="text" name="firstName" id="firstName" value={firstName} onChange={onFirstNameChange} required placeholder="John"/>
        </FloatingLabel>

        {/* last name */}
        <FloatingLabel label="Last Name" className='mb-3'>
          <Form.Control type="text" name="lastName" id="lastName" value={lastName} onChange={onLastNameChange} required placeholder="Doe"/>
        </FloatingLabel>

        {/* email */}
        <FloatingLabel label="Email" className='mb-3'>
          <Form.Control type="email" name="email" id="email" value={email} onChange={onEmailChange} required placeholder="john@example.com"/>
        </FloatingLabel>

        {/* phone */}
        <FloatingLabel label="Phone" className='mb-3'>
          <Form.Control type="text" name="phone" id="phone" value={phone} onChange={onPhoneChange} required placeholder="Your 10 digit phone number"/>
        </FloatingLabel>

        {/* submit button */}
        <Form.Group>
          <Button type='submit' onClick={handleSubmit} variant='primary'>Update</Button>
        </Form.Group>
      </Form>
    </>
  )

}

export default UpdateForm