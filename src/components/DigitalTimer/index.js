import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimer: false, timeLimit: 25, timerSeconds: 0}

  timeRunning = () => {
    const {timeLimit, timerSeconds} = this.state

    const isTimerCom = timerSeconds === timeLimit * 60

    if (isTimerCom) {
      clearInterval(this.intervalId)
      this.setState({isTimer: false})
    } else {
      this.setState(prevState => ({timerSeconds: prevState.timerSeconds + 1}))
    }
  }

  onStartClickPause = () => {
    const {isTimer, timeLimit, timerSeconds} = this.state

    const isTimerCom = timerSeconds === timeLimit * 60

    if (isTimerCom) {
      this.setState({timerSeconds: 0})
    }
    if (isTimer) {
      clearInterval(this.intervalId)
    } else {
      this.intervalId = setInterval(this.timeRunning, 1000)
    }
    this.setState(prevState => ({isTimer: !prevState.isTimer}))
  }

  onResetClick = () => {
    clearInterval(this.intervalId)
    this.setState({timeLimit: 25, isTimer: false, timerSeconds: 0})
  }

  onDecreaseTime = () => {
    const {timeLimit} = this.state

    if (timeLimit > 1) {
      this.setState(prevState => ({timeLimit: prevState.timeLimit - 1}))
    }
  }

  onIncreaseTime = () => {
    this.setState(prevState => ({timeLimit: prevState.timeLimit + 1}))
  }

  renderDigitalTimerValue = () => {
    const {timerSeconds, timeLimit} = this.state

    const totalRemainingSeconds = timeLimit * 60 - timerSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const finalMinutes = minutes > 9 ? minutes : `0${minutes}`
    const finalSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${finalMinutes}:${finalSeconds}`
  }

  renderDigitalTimer = () => {
    const {isTimer} = this.state

    const imgIcon = isTimer
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const imgAltText = isTimer ? 'pause icon' : 'play icon'

    return (
      <div className="start-pause-reset-container">
        <div className="start-pause-container">
          <button
            type="button"
            className="btn-style"
            onClick={this.onStartClickPause}
          >
            <img src={imgIcon} alt={imgAltText} className="img-style" />
            <p className="start-pause-reset-name">
              {isTimer ? 'Pause' : 'Start'}
            </p>
          </button>
        </div>

        <div className="reset-container">
          <button
            type="button"
            className="btn-style"
            onClick={this.onResetClick}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
              className="img-style"
            />
            <p className="start-pause-reset-name">Reset</p>
          </button>
        </div>
      </div>
    )
  }

  renderChangeTime = () => {
    const {timeLimit, timerSeconds} = this.state
    const btnDisabled = timerSeconds > 0

    return (
      <div className="timer-limit-container">
        <p className="limit-name">Set Timer limit</p>
        <div className="change-time">
          <button
            className="time-btn-style"
            type="button"
            onClick={this.onDecreaseTime}
            disabled={btnDisabled}
          >
            -
          </button>
          <div className="time-container">
            <p>{timeLimit}</p>
          </div>
          <button
            className="time-btn-style"
            type="button"
            onClick={this.onIncreaseTime}
            disabled={btnDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {isTimer} = this.state
    const textType = isTimer ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="card-container">
          <div className="color-container">
            <div className="digital-container">
              <h1 className="digital-value">
                {this.renderDigitalTimerValue()}
              </h1>
              <p className="text-type">{textType}</p>
            </div>
          </div>
          <div>
            {this.renderDigitalTimer()}
            {this.renderChangeTime()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
