import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert, Col } from 'react-bootstrap'
import { setTimer, endTimer, resetTimer } from '../features/timer/timerSlice'
import { updateSurveyee, resetSurveyee } from '../features/surveyee/surveyeeSlice'
import ModalOnEndSurvey from '../components/ModalOnEndSurvey'
import { useNavigate } from 'react-router-dom'

function Survey() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [time, setTime] = useState('')
  const [modalShow, setModalShow] = useState(false)

  const { surveyee, isLoading, isError, isSuccess, message } = useSelector((state) => state.surveyee)
  const { surveyTimer } = useSelector((state) => state.timer)

  const startingMin = 30
  let totalTime = startingMin * 60

  if (surveyTimer != null) {
    totalTime = surveyTimer
  }

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
      } else {

        const surveyeeData = { 
          authCode : surveyee.authCode,
          timeRemaining : 0,
          isCompleted : true
        }
    
        // update surveyee
        dispatch(updateSurveyee(surveyeeData))

        // end timer
        dispatch(endTimer())
        setModalShow(true)

        clearInterval(x);

      }
      
    }, 1000)
    
  }, [dispatch])

  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Survey</Alert.Heading>
        <div className="d-flex justify-content-end">You have: {time}</div>
      </Alert>

      <ModalOnEndSurvey 
        show = {modalShow}
        onHide = {
            () => {
            setModalShow(false)
            navigate('/')
          }
        }
      />
      
    </>
  )
}

export default Survey