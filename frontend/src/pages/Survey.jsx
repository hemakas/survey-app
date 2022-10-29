import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from 'react-bootstrap'
import { setTimer, endTimer } from '../features/timer/timerSlice'
import { updateSurveyee } from '../features/surveyee/surveyeeSlice'
import ModalOnEndSurvey from '../components/ModalOnEndSurvey'
import { useNavigate } from 'react-router-dom'

function Survey() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [time, setTime] = useState('')
  const [modalShow, setModalShow] = useState(false)

  const { surveyee } = useSelector((state) => state.surveyee)
  const { surveyTimer } = useSelector((state) => state.timer)

  let totalTime = surveyee.timeRemaining

  console.log(surveyee)

  useEffect(() => {

    // run in every second
    let x = setInterval(function() {

      if (totalTime > 0) {
        const minutes = Math.floor(totalTime / 60)
        let seconds = totalTime % 60
        seconds = seconds < 10 ? '0' + seconds : seconds
        
        // break from setInterval loop
        if (totalTime === 0) {
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
          clearInterval(x)
        }

        totalTime--
  
        setTime(minutes + ' minutes & ' + seconds + ' seconds ' )
  
        // set/update timer
        dispatch(setTimer(totalTime))

        const surveyeeData = { 
          authCode : surveyee.authCode,
          timeRemaining : totalTime,
        }
    
        // update surveyee
        dispatch(updateSurveyee(surveyeeData))

        console.log('timer : ' + surveyTimer + '  surveyee timer : ' + surveyee.timeRemaining)

      }
    }, 1000)
    
  }, [dispatch, surveyTimer, surveyee.authCode, surveyee.timeRemaining, totalTime])

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