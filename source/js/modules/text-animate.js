import AccentTypographyBuild from "./accent-typography-build";
import {screenNames} from "./utils";

const introTitleText = new AccentTypographyBuild(
    `.intro__title`,
    600,
    `active`,
    `transform`,
    [
      [100, 50, 0, 50, 100, 50, 0, 150, 100, 0, 100, 0],
      [250, 350, 300, 150, 250, 200]
    ]);
const introDateText = new AccentTypographyBuild(
    `.intro__date`,
    500,
    `active`,
    `transform`,
    [
      [150, 100],
      [100],
      [200, 50, 50, 100, 250],
      [100],
      [0, 200, 150, 50]
    ]);
const storyTitleText = new AccentTypographyBuild(
    `.slider__item-title`,
    500,
    `active`,
    `transform`,
    [
      [80, 50, 0, 50, 80, 50, 0],
    ]);
const prizesTitleText = new AccentTypographyBuild(
    `.prizes__title`,
    500,
    `active`,
    `transform`,
    [
      [60, 30, 0, 30, 60],
    ]);
const rulesTitleText = new AccentTypographyBuild(
    `.rules__title`,
    500,
    `active`,
    `transform`,
    [
      [100, 60, 40, 30, 80, 60, 0],
    ]);
const gameTitleText = new AccentTypographyBuild(
    `.game__title`,
    500,
    `active`,
    `transform`,
    [
      [80, 40, 0, 20],
    ]);
const animateText = (screenName) => {
  switch (screenName) {
    case screenNames.TOP:
      setTimeout(() => {
        introTitleText.runAnimation();
      }, 300);
      setTimeout(() => {
        introDateText.runAnimation();
      }, 900);
      storyTitleText.destroyAnimation();
      prizesTitleText.destroyAnimation();
      rulesTitleText.destroyAnimation();
      gameTitleText.destroyAnimation();
      break;
    case screenNames.STORY:
      setTimeout(() => {
        storyTitleText.runAnimation();
      }, 300);
      introTitleText.destroyAnimation();
      introDateText.destroyAnimation();
      prizesTitleText.destroyAnimation();
      rulesTitleText.destroyAnimation();
      gameTitleText.destroyAnimation();
      break;
    case screenNames.PRIZES:
      setTimeout(() => {
        prizesTitleText.runAnimation();
      }, 300);
      introTitleText.destroyAnimation();
      introDateText.destroyAnimation();
      storyTitleText.destroyAnimation();
      rulesTitleText.destroyAnimation();
      gameTitleText.destroyAnimation();
      break;
    case screenNames.RULES:
      setTimeout(() => {
        rulesTitleText.runAnimation();
      }, 300);
      introTitleText.destroyAnimation();
      introDateText.destroyAnimation();
      storyTitleText.destroyAnimation();
      prizesTitleText.destroyAnimation();
      gameTitleText.destroyAnimation();
      break;
    case screenNames.GAME:
      setTimeout(() => {
        gameTitleText.runAnimation();
      }, 300);
      introTitleText.destroyAnimation();
      introDateText.destroyAnimation();
      storyTitleText.destroyAnimation();
      prizesTitleText.destroyAnimation();
      rulesTitleText.destroyAnimation();
      break;
    default:
      introTitleText.destroyAnimation();
      introDateText.destroyAnimation();
      storyTitleText.destroyAnimation();
      prizesTitleText.destroyAnimation();
      rulesTitleText.destroyAnimation();
      gameTitleText.destroyAnimation();
  }
};

export {animateText};
