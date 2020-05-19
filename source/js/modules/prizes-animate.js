const animatePrizes = (isActivePrizesScreen) => {
  const primaryAwardWrap = document.querySelector(`.prizes__item--journeys .prizes__icon`);
  const secondaryAwardWrap = document.querySelector(`.prizes__item--cases .prizes__icon`);
  if (isActivePrizesScreen) {
    primaryAwardWrap.innerHTML = `<picture><source srcset="img/prize1-mob.svg?id=${Math.random()}" media="(orientation: portrait)"><img src="img/primary-award.svg?id=${Math.random()}"></picture>`;
    secondaryAwardWrap.innerHTML = `<picture><source srcset="img/prize2-mob.svg?id=${Math.random()}" media="(orientation: portrait)"><img src="img/secondary-award.svg?id=${Math.random()}"></picture>`;
  } else {
    primaryAwardWrap.innerHTML = ``;
  }
};

export {animatePrizes};
