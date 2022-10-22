
// Logout user
const endTimer = () => {
    localStorage.removeItem('timer')
}

const timerService = {
    endTimer
  }

export default timerService