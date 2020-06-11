import Counter from "./counter";
const SECONDARY_AWARD_OPTIONS = {
  startNumber: 1,
  endNumber: 7,
  countSteps: 7,
  animationMainDelay: 5200,
  animationCounterDelay: 6000
};
const ADDITIONAL_AWARD_OPTIONS = {
  startNumber: 11,
  endNumber: 900,
  countSteps: 7,
  animationMainDelay: 8500,
  animationCounterDelay: 9500
};
const COUNTER_FPS = 12;
const animatePrizes = (isActivePrizesScreen) => {
  const primaryAwardWrap = document.querySelector(`.prizes__item--journeys .prizes__icon--desktop`);
  const secondaryAwardWrap = document.querySelector(`.prizes__item--cases .prizes__icon--desktop`);
  const secondaryAwardCounterWrap = document.querySelector(`.prizes__item--cases .prizes__number--animate`);
  const secondaryAwardCounter = new Counter(
      secondaryAwardCounterWrap,
      SECONDARY_AWARD_OPTIONS.startNumber,
      SECONDARY_AWARD_OPTIONS.endNumber,
      SECONDARY_AWARD_OPTIONS.countSteps,
      COUNTER_FPS);
  const secondaryAwardDelay = SECONDARY_AWARD_OPTIONS.animationMainDelay;
  const secondaryAwardCounterDelay = SECONDARY_AWARD_OPTIONS.animationCounterDelay;
  const additionalAwardWrap = document.querySelector(`.prizes__item--codes .prizes__icon--desktop`);
  const additionalAwardCounterWrap = document.querySelector(`.prizes__item--codes .prizes__number--animate`);
  const additionalAwardCounter = new Counter(
      additionalAwardCounterWrap,
      ADDITIONAL_AWARD_OPTIONS.startNumber,
      ADDITIONAL_AWARD_OPTIONS.endNumber,
      ADDITIONAL_AWARD_OPTIONS.countSteps,
      COUNTER_FPS);
  const additionalAwardDelay = ADDITIONAL_AWARD_OPTIONS.animationMainDelay;
  const additionalAwardCounterDelay = ADDITIONAL_AWARD_OPTIONS.animationCounterDelay;
  const prizesItems = document.querySelectorAll(`.prizes__item`);
  if (isActivePrizesScreen && primaryAwardWrap.innerHTML === ``) {
    prizesItems.forEach((item) => {
      item.classList.add(`prizes__item--animate`);
    });
    primaryAwardWrap.innerHTML = `<img src="img/primary-award.svg?id=${Math.random()}">`;

    setTimeout(() => {
      secondaryAwardWrap.innerHTML = `<img src="img/secondary-award.svg?id=${Math.random()}">`;
    }, secondaryAwardDelay);

    setTimeout(() => {
      secondaryAwardCounter.initCounter();
    }, secondaryAwardCounterDelay);

    setTimeout(() => {
      additionalAwardWrap.innerHTML = `<img src="img/additional-award.svg?id=${Math.random()}">`;
    }, additionalAwardDelay);

    setTimeout(() => {
      additionalAwardCounter.initCounter();
    }, additionalAwardCounterDelay);
  } else {
    prizesItems.forEach((item) => {
      item.classList.remove(`prizes__item--animate`);
    });
  }
};

export {animatePrizes};
