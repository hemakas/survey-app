import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from 'react-bootstrap'
import { setTimer, resetTimer } from '../features/timer/timerSlice'
import { updateSurveyee, resetSurveyee, logoutSurveyee } from '../features/surveyee/surveyeeSlice'
import ModalOnEndSurvey from '../components/modals/ModalOnEndSurvey'
import QuestionItems from '../components/QuestionItems'
import { useNavigate } from 'react-router-dom'

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
    // let x = setInterval(function() {

    //   if (totalTime > 0) {
    //     const minutes = Math.floor(totalTime / 60)
    //     let seconds = totalTime % 60
    //     seconds = seconds < 10 ? '0' + seconds : seconds

    //     totalTime--

    //     setTime(minutes + ' minutes & ' + seconds + ' seconds ' )

    //     // set/update timer
    //     dispatch(setTimer(totalTime))

    //   } 
      
    //   if (totalTime === 0) {

    //     setTime('0 minutes')

    //     const surveyeeData = { 
    //       authCode : surveyee.authCode,
    //       timeRemaining : totalTime,
    //       isCompleted : true
    //     }

    //     // update surveyee
    //     dispatch(updateSurveyee(surveyeeData))

    //     // end timer
    //     dispatch(resetTimer())
    //     setModalShow(true)

    //     // break loop
    //     clearInterval(x)
    //   }

    // }, 1000)   

  }, [surveyee.authCode, dispatch, setTime, setModalShow, totalTime])

  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Survey</Alert.Heading>
        <div className="d-flex justify-content-end">You have: {time}</div>
      </Alert>

      <QuestionItems />

      <ModalOnEndSurvey 
        show = {modalShow}
        onHide = {
            () => {
            setModalShow(false)
            dispatch(logoutSurveyee())
            navigate('/')
          }
        }
      />
    </>
  )
}

export default Survey