export default class Counter {
  constructor(counterContainer, startNumber, endNumber, countSteps, fps) {
    this._counterContainer = counterContainer;
    this._startNumber = startNumber;
    this._endNumber = endNumber;
    this._fps = fps;
    this._step = Math.ceil((this._endNumber - this._startNumber) / (countSteps - 1));
    this._startTime = 0;
    this._requestID = null;
  }

  initCounter() {
    this._startTime = (new Date()).getTime();
    this.changeCounter();
  }

  cancelCounter() {
    cancelAnimationFrame(this._requestID);
  }

  changeCounter() {
    this._requestID = requestAnimationFrame(() => {
      this.changeCounter();
    });

    const currentTime = (new Date()).getTime();
    const passedTime = currentTime - this._startTime;
    let fpsInterval = 1000 / this._fps;

    if (passedTime > fpsInterval) {
      this._startTime = currentTime - (passedTime % fpsInterval);
      this.renderNumber(this._startNumber);
      this._startNumber = this._startNumber + this._step;


      if (this._startNumber > this._endNumber) {
        this.renderNumber(this._endNumber);
        this.cancelCounter();
      }
    }
  }

  renderNumber(number) {
    this._counterContainer.innerText = number;
  }
}
