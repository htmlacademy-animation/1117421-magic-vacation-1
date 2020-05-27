export default class Timer {
  constructor(minContainer, secContainer, endTime) {
    this._minContainer = minContainer;
    this._secContainer = secContainer;
    this._startTime = 0;
    this._endTime = endTime;
    this._requestID = null;
  }

  startTimer() {
    this._startTime = (new Date()).getTime();
    this.initTimer();
  }

  stopTimer() {
    cancelAnimationFrame(this._requestID);
  }

  initTimer() {
    this._requestID = requestAnimationFrame(() => {
      this.initTimer();
    });

    const currentTime = (new Date()).getTime();
    const passedTime = currentTime - this._startTime;
    const timeSecPassed = Math.floor((passedTime / 1000) % 60);
    const timeMinPassed = Math.floor((passedTime / 1000 / 60) % 60);

    this.renderTime(timeSecPassed, timeMinPassed);

    if (timeMinPassed >= this._endTime) {
      this.stopTimer();
    }
  }

  renderTime(timeSecPassed, timeMinPassed) {
    this._minContainer.innerText = `0${timeMinPassed}`;
    if (timeSecPassed < 10) {
      this._secContainer.innerText = `0${timeSecPassed}`;
    } else {
      this._secContainer.innerText = timeSecPassed;
    }
  }

  resetTimer() {
    cancelAnimationFrame(this._requestID);
    this._minContainer.innerText = `00`;
    this._secContainer.innerText = `00`;
  }
}
