import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert, Form } from 'react-bootstrap'
import { setTimer, countDownTimer, resetTimer } from '../features/timer/timerSlice'
import { updateSurveyee, resetSurveyee, logoutSurveyee } from '../features/surveyee/surveyeeSlice'
import ModalOnEndSurvey from '../components/modals/ModalOnEndSurvey'
import QuestionItems from '../components/QuestionItems'
import { useNavigate } from 'react-router-dom'
import { CountDownTimer } from '../features/timer/timerSlice'

function Survey() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [time, setTime] = useState('')
  const [modalShow, setModalShow] = useState(false)

  const { surveyee } = useSelector((state) => state.surveyee)
  const { surveyTimer } = useSelector((state) => state.timer)

  let totalTime = surveyTimer

  useEffect(() => {
    // run in every second
    let x = setInterval(function() {

      if (totalTime > 0) {
        const minutes = Math.floor(totalTime / 60)
        let seconds = totalTime % 60
        seconds = seconds < 10 ? '0' + seconds : seconds

        totalTime--

        setTime(minutes + ' minutes & ' + seconds + ' seconds ' )

        // set/update timer
        dispatch(setTimer(totalTime))

      }

      if (surveyTimer < 1) {

        setTime('0 minutes')

        if (surveyee.authCode != null) {
          const surveyeeData = { 
            authCode : surveyee.authCode,
            // timeRemaining : 0,
            isCompleted : true
          }
  
          // update surveyee
          dispatch(updateSurveyee(surveyeeData))
        } else {
          console.log('null auth code  ' + surveyee.authCode)
        }

        // end timer
        // dispatch(endTimer())
        setModalShow(true)

        // break loop
        clearInterval(x)
      }
    }, 1000)
  }, [surveyee.authCode, dispatch, setTime, setModalShow, clearInterval, totalTime])

  

  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Survey</Alert.Heading>
        <CountDownTimer targetDate={dateTimeAfterThreeDays} />
      </Alert>

      <QuestionItems />

      <ModalOnEndSurvey 
        show = {modalShow}
        onHide = {
            () => {
            setModalShow(false)
            dispatch(endTimer())
            dispatch(logoutSurveyee())
            navigate('/')
          }
        }
      />
    </>
  )
}

export default Survey