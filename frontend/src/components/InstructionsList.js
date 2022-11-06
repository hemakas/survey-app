import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Form } from 'react-bootstrap'
import { updateSurveyee, resetSurveyee } from '../features/surveyee/surveyeeSlice'
import { setTimer, resetTimer } from '../features/timer/timerSlice'

function InstructionsList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { surveyee, isError, isSuccess, message } = useSelector((state) => state.surveyee)
  const { surveyTimer } = useSelector((state) => state.timer)

  // console.log('surveyee remaining time  ' + surveyee.timeRemaining)
  
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      const minutes = Math.floor(surveyee.timeRemaining / 60)
      toast.success(`You have ${minutes} minutes left to answer the questions`)
      navigate('/Survey')

      // console.log('survey Timer ' + surveyTimer)
    }

    dispatch(resetSurveyee())

  }, [surveyee, isError, isSuccess, message, navigate, dispatch])

  // begin survey button is clicked
  const handleEntry = (e) => {
    e.preventDefault()

    const time = surveyee.timeRemaining

    // set timer
    dispatch(setTimer(time))
    
    const surveyeeData = { 
      authCode : surveyee.authCode,
      startedOn : new Date()
    }

    // update surveyee
    dispatch(updateSurveyee(surveyeeData))
  }

  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Instructions list</Form.Label>
        </Form.Group>

        <Form.Group>
          <Button type='submit' onClick={handleEntry} variant='primary'>Begin Survey</Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default InstructionsList