const animatePrizes = (isActivePrizesScreen) => {
  const primaryAwardWrap = document.querySelector(`.prizes__item--journeys .prizes__icon`);
  const secondaryAwardWrap = document.querySelector(`.prizes__item--cases .prizes__icon`);
  const additionalAwardWrap = document.querySelector(`.prizes__item--codes .prizes__icon`);
  const prizesItems = document.querySelectorAll(`.prizes__item`);
  if (isActivePrizesScreen && primaryAwardWrap.innerHTML === ``) {
    prizesItems.forEach((item) => {
      item.classList.add(`prizes__item--animate`);
    });
    primaryAwardWrap.innerHTML = `<picture><source srcset="img/prize1-mob.svg?id=${Math.random()}" media="(orientation: portrait)"><img src="img/primary-award.svg?id=${Math.random()}"></picture>`;
    setTimeout(() => {
      secondaryAwardWrap.innerHTML = `<picture><source srcset="img/prize2-mob.svg?id=${Math.random()}" media="(orientation: portrait)"><img src="img/secondary-award.svg?id=${Math.random()}"></picture>`;
    }, 5200);
    setTimeout(() => {
      additionalAwardWrap.innerHTML = `<picture><source srcset="img/prize3-mob.svg?id=${Math.random()}" media="(orientation: portrait)"><img src="img/additional-award.svg?id=${Math.random()}"></picture>`;
    }, 8500);
  } else {
    prizesItems.forEach((item) => {
      item.classList.remove(`prizes__item--animate`);
    });
  }
};

export {animatePrizes};
