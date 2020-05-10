export default class AccentTypographyBuild {
  constructor(elementSelector, timer, classForActivate, property, offsets) {
    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;
    this._element = document.querySelector(this._elementSelector);
    this._timeOffsets = offsets;

    this.prePareText();
  }

  createElement(letter, wordNumber, letterNumber) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    span.style.transition = `${this._property} ${this._timer}ms ease-out ${this._timeOffsets ? this._timeOffsets[wordNumber][letterNumber] : 0}ms`;
    return span;
  }

  prePareText() {
    if (!this._element) {
      return;
    }
    const text = this._element.textContent.trim().split(` `).filter((letter) => letter !== ``);

    const content = text.reduce((fragmentParent, word, wordNumber) => {
      const wordElement = Array.from(word).reduce((fragment, letter, letterNumber) => {
        fragment.appendChild(this.createElement(letter, wordNumber, letterNumber));
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`text-word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);
      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }
    this._element.classList.add(this._classForActivate);
  }

  destroyAnimation() {
    this._element.classList.remove(this._classForActivate);
  }
}
