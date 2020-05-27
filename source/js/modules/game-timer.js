import Timer from "./timer";

const gameMinCounter = document.querySelector(`.game__counter span:first-child`);
const gameSecCounter = document.querySelector(`.game__counter span:last-child`);
const timer = new Timer(gameMinCounter, gameSecCounter, 5);

const startGameTimer = () => {
  timer.startTimer();
};

const resetGameTimer = () => {
  timer.resetTimer();
};

export {startGameTimer, resetGameTimer};
