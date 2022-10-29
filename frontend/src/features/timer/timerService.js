
// start timer
const setTimer = (time) => {
  localStorage.setItem('surveyTimer', time)
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