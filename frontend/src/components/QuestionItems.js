import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Form, Button } from 'react-bootstrap'
import { updateSurveyee, resetSurveyee, logoutSurveyee } from '../features/surveyee/surveyeeSlice'
import { endTimer } from '../features/timer/timerSlice'
import ModalOnSubmitSurvey from './modals/ModalOnSubmitSurvey'

function QuestionItems() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false)
    const [formData, setFormData] = useState({
        question1 : '',
        question2 : ''
    })
    const { surveyee, isError, isSuccess, message } = useSelector((state) => state.surveyee)
    const { confrimSubmit } = useSelector((state) => state.modal)
    const { question1, question2 } = formData

    useEffect(() => {
        if (isError) {
          toast.error(message)
        }

        if (confrimSubmit) {
            if (surveyee.authCode != null) {
                const surveyeeData = { 
                    authCode : surveyee.authCode,
                    timeRemaining : 0,
                    isCompleted : true,
                    answers : [question1, question2]
                }
              
                // update surveyee
                dispatch(updateSurveyee(surveyeeData))
            } else {
                console.log('null auth code  ' + surveyee.authCode)
            }
            
            dispatch(endTimer())
            dispatch(resetSurveyee())
            dispatch(logoutSurveyee())
            navigate('/ThankYou')
            toast.success('Your response has been saved successfully')
        }
    
        dispatch(resetSurveyee())
    
    }, [surveyee.authCode, isError, isSuccess, message, navigate, dispatch, confrimSubmit, question1, question2])

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }
    
    // if surveyee clicks submit show modal
    const handleSubmit = (e) => {
        e.preventDefault()

        // show modal
        setModalShow(true) 
    }

    return (
        <>
            <Container>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Questions list</Form.Label>
                    </Form.Group>

                    <Row className="mb-5">
                        <Form.Label>1. Lorem Ipsum is simply dummy text of the printing and typesetting?</Form.Label>
                        <Form.Group>
                            <Form.Check inline label="1" name="question1" value="q1-a1" onChange={onChange} checked={question1 === 'q1-a1' } type="radio" id="inline-radio-1" className="m-4"/>
                            <Form.Check inline label="2" name="question1" value="q1-a2" onChange={onChange} checked={question1 === 'q1-a2' } type="radio" id="inline-radio-2" className="m-4"/>
                            <Form.Check inline label="3" name="question1" value="q1-a3" onChange={onChange} checked={question1 === 'q1-a3' } type="radio" id="inline-radio-3" className="m-4"/>
                            <Form.Check inline label="4" name="question1" value="q1-a4" onChange={onChange} checked={question1 === 'q1-a4' } type="radio" id="inline-radio-4" className="m-4"/>
                        </Form.Group>
                    </Row>

                    <Row className="mb-5">
                        <Form.Label>2. Lorem Ipsum is simply dummy text of the printing and typesetting?</Form.Label>
                        <Form.Group>
                            <Form.Check inline label="1" name="question2" value="q2-a1" onChange={onChange} type="radio" id="inline-radio-1" className="m-4"/>
                            <Form.Check inline label="2" name="question2" value="q2-a2" onChange={onChange} type="radio" id="inline-radio-2" className="m-4"/>
                            <Form.Check inline label="3" name="question2" value="q2-a3" onChange={onChange} type="radio" id="inline-radio-3" className="m-4"/>
                            <Form.Check inline label="4" name="question2" value="q2-a4" onChange={onChange} type="radio" id="inline-radio-4" className="m-4"/>
                        </Form.Group>
                    </Row>

                    <Form.Group>
                        <Button type='submit' onClick={handleSubmit} variant='primary'>Submit</Button>
                    </Form.Group>
                </Form>

                <ModalOnSubmitSurvey 
                    show = {modalShow}
                    onHide = {() => { setModalShow(false) }}
                />
            </Container>
        </>
    )
}

export default QuestionItems