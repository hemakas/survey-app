
// start timer
const setTimer = (time) => {
  localStorage.setItem('surveyTimer', time)
}

// end timer
const endTimer = () => {
  localStorage.removeItem('timer')
}

const timerService = {
  setTimer,
  endTimer
}

export default timerService