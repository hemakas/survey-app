import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert, Form } from 'react-bootstrap'
import { setTimer, countDownTimer, resetTimer } from '../features/timer/timerSlice'
import { updateSurveyee, resetSurveyee, logoutSurveyee } from '../features/surveyee/surveyeeSlice'
import ModalOnEndSurvey from '../components/ModalOnEndSurvey'
import { useNavigate } from 'react-router-dom'
import { CountDownTimer } from '../features/timer/timerSlice'

function Survey() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [time, setTime] = useState('')
  const [modalShow, setModalShow] = useState(false)

  const { surveyee } = useSelector((state) => state.surveyee)
  const { surveyTimer } = useSelector((state) => state.timer)

  // console.log('surveyee remaining time' + surveyee.timeRemaining)
  // console.log('survey Timer ' + surveyTimer)

  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
  
  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Survey</Alert.Heading>
        <CountDownTimer targetDate={dateTimeAfterThreeDays} />
      </Alert>

      <ModalOnEndSurvey 
        show = {modalShow}
        onHide = {
            () => {
            setModalShow(false)
            dispatch(resetTimer())
            dispatch(resetSurveyee())
            dispatch(logoutSurveyee())
            navigate('/')
          }
        }
      />
    </>
  )
}

export default Survey