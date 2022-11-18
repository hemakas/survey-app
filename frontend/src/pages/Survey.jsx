import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from 'react-bootstrap'
import { resetTimer } from '../features/timer/timerSlice'
import { updateSurveyee, logoutSurveyee } from '../features/surveyee/surveyeeSlice'
import ModalOnEndSurvey from '../components/modals/ModalOnEndSurvey'
import QuestionItems from '../components/QuestionItems'
import { useNavigate } from 'react-router-dom'
import NewCountDown from '../components/NewCountDown'

function Survey() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [modalShow, setModalShow] = useState(false)
  const { surveyee } = useSelector((state) => state.surveyee)
  const { surveyTimer } = useSelector((state) => state.timer)

  let totalTime = surveyTimer

  useEffect(() => {
    // end timer
    if (totalTime < 0) {
      dispatch(resetTimer())
      
      const surveyeeData = { 
        authCode : surveyee.authCode,
        timeRemaining : surveyTimer,
        isCompleted: 1
      }

      // update surveyee
      dispatch(updateSurveyee(surveyeeData))

      setModalShow(true)
    }
  }, [dispatch, totalTime, surveyTimer, surveyee.authCode])

  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Survey</Alert.Heading>
        <div className="d-flex justify-content-end">You have:{<NewCountDown countDownTime={totalTime} />}</div>
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