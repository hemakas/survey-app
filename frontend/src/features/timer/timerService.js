
// start timer
const setTimer = (time) => {
  localStorage.setItem('surveyTimer', JSON.stringify(time))
}

// end timer
const endTimer = () => {
  localStorage.removeItem('surveyTimer')
}

const timerService = {
  setTimer,
  endTimer
}

export default timerService