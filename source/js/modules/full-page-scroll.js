import throttle from 'lodash/throttle';
import {screenNames} from "./utils";
import {animateText} from "./text-animate";

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeActiveMenuItem();
    const back = document.querySelector(`.backing`);
    const currentScreen = document.querySelector(`.screen.active`);
    const isBack = this.isShowBackgroundBlock(this.screenElements[this.activeScreen].id);

    if (isBack) {
      back.classList.add(`active`);
    } else {
      back.classList.remove(`active`);
    }

    if (currentScreen && currentScreen.id === screenNames.STORY && this.screenElements[this.activeScreen].id === screenNames.PRIZES) {
      back.classList.add(`animate`);
      back.addEventListener(`animationend`, () => {
        this.toggleDisplay();
        back.classList.remove(`animate`);
      });
    } else if (currentScreen && currentScreen.id !== this.screenElements[this.activeScreen].id || !currentScreen) {
      this.toggleDisplay();
    }
  }

  isShowBackgroundBlock(name) {
    switch (name) {
      case screenNames.PRIZES:
      case screenNames.RULES:
      case screenNames.GAME:
        return true;
      default:
        return false;
    }
  }

  toggleDisplay() {
    this.changeVisibilityDisplay();
    this.emitChangeDisplayEvent();
    const primaryAwardWrap = document.querySelector(`.prizes__item--journeys .prizes__icon`);
    if (this.screenElements[this.activeScreen].id === screenNames.PRIZES) {
      primaryAwardWrap.innerHTML = `<picture><source srcset="img/prize1-mob.svg?id=${Math.random()}" media="(orientation: portrait)"><img src="img/primary-award.svg?id=${Math.random()}"></picture>`;
    } else {
      primaryAwardWrap.innerHTML = ``;
    }
  }

  changeVisibilityDisplay() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    this.screenElements[this.activeScreen].classList.add(`active`);
    animateText(this.screenElements[this.activeScreen].id);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
