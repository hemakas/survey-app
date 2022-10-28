import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Form } from 'react-bootstrap'
import { updateSurveyee, resetSurveyee } from '../features/surveyee/surveyeeSlice'
import { setTimer } from '../features/timer/timerSlice'

function InstructionsList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const minutes = 30

  const { surveyee, isLoading, isError, isSuccess, message } = useSelector((state) => state.surveyee)
  const { surveyTimer } = useSelector((state) => state.timer)

  console.log(surveyee)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    
    if (isSuccess) {
      toast.success(`You have ${minutes} minutes left to answer the questions`)
      navigate('/Survey')
    }
  }, [surveyee, isError, isSuccess, message, navigate, dispatch])

  const handleEntry = (e) => {
    e.preventDefault()
    const totalTime = 30 * 60

    if (surveyee.timeRemaining == 0) {
      // set timer
      dispatch(setTimer(totalTime))
    } else {
      const minutes = Math.floor(surveyee.timeRemaining / 60)
      // set timer
      dispatch(setTimer(surveyee.timeRemaining))
    }

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