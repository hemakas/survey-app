import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert, Col } from 'react-bootstrap'
import { setTimer, endTimer, resetTimer } from '../features/timer/timerSlice'

import ModalOnEndSurvey from '../components/ModalOnEndSurvey'
import { useNavigate } from 'react-router-dom'

function Survey() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [time, setTime] = useState('')
  const [modalShow, setModalShow] = useState(false)
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
        // end timer
        dispatch(endTimer())
        setModalShow(true)

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