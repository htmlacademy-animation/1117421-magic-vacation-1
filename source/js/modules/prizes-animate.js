const animatePrizes = (isActivePrizesScreen) => {
  const primaryAwardWrap = document.querySelector(`.prizes__item--journeys .prizes__icon--desktop`);
  const secondaryAwardWrap = document.querySelector(`.prizes__item--cases .prizes__icon--desktop`);
  const additionalAwardWrap = document.querySelector(`.prizes__item--codes .prizes__icon--desktop`);
  const prizesItems = document.querySelectorAll(`.prizes__item`);
  if (isActivePrizesScreen && primaryAwardWrap.innerHTML === ``) {
    prizesItems.forEach((item) => {
      item.classList.add(`prizes__item--animate`);
    });
    primaryAwardWrap.innerHTML = `<img src="img/primary-award.svg?id=${Math.random()}">`;
    setTimeout(() => {
      secondaryAwardWrap.innerHTML = `<img src="img/secondary-award.svg?id=${Math.random()}">`;
    }, 5200);
    setTimeout(() => {
      additionalAwardWrap.innerHTML = `<img src="img/additional-award.svg?id=${Math.random()}">`;
    }, 8500);
  } else {
    prizesItems.forEach((item) => {
      item.classList.remove(`prizes__item--animate`);
    });
  }
};

export {animatePrizes};
