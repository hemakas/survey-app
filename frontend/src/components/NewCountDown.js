import { useState, useEffect } from 'react'
import React from 'react'
import { setTimer } from '../features/timer/timerSlice'
import { useDispatch } from 'react-redux'

const defaultRemainingTime = {
    minutes: '00',
    seconds: '00'
}

const NewCountDown = ({ countDownTime }) => {
    const dispatch = useDispatch()
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime)
  
    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countDownTime)
            dispatch(setTimer(countDownTime))
            countDownTime--
        }, 500)

        return () => clearInterval(intervalId)
    }, [countDownTime, dispatch])

    function updateRemainingTime(totalTime) {
        var totalTimeNum = Number(totalTime)
        let minutes
        let seconds
        
        if (totalTimeNum > 0) {
            minutes = Math.floor(totalTimeNum / 60)
            minutes = minutes < 10 ? '0' + minutes : minutes

            seconds = totalTimeNum % 60
            seconds = seconds < 10 ? '0' + seconds : seconds
        } else {
            minutes = '00'
            seconds = '00'
        }

        const remainingTime = {
            minutes: minutes,
            seconds: seconds
        }

        setRemainingTime(remainingTime)
    }
    
    return (
        <div>
            <span> {remainingTime.minutes} minutes and {remainingTime.seconds} seconds</span>
        </div>
    )
}

export default NewCountDown