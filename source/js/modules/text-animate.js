import AccentTypographyBuild from "./accent-typography-build";
import {screenNames} from "./utils";

const introTitleText = new AccentTypographyBuild(
    `.intro__title`,
    600,
    `active`,
    `transform`);
const introDateText = new AccentTypographyBuild(
    `.intro__date`,
    500,
    `active`,
    `transform`);
const storyTitleText = new AccentTypographyBuild(
    `.slider__item-title`,
    500,
    `active`,
    `transform`);
const prizesTitleText = new AccentTypographyBuild(
    `.prizes__title`,
    500,
    `active`,
    `transform`);
const rulesTitleText = new AccentTypographyBuild(
    `.rules__title`,
    500,
    `active`,
    `transform`);
const gameTitleText = new AccentTypographyBuild(
    `.game__title`,
    500,
    `active`,
    `transform`);

const destroyAllAnimation = () => {
  introTitleText.destroyAnimation();
  introDateText.destroyAnimation();
  storyTitleText.destroyAnimation();
  prizesTitleText.destroyAnimation();
  rulesTitleText.destroyAnimation();
  gameTitleText.destroyAnimation();
};

const animateText = (screenName) => {
  destroyAllAnimation();
  switch (screenName) {
    case screenNames.TOP:
      setTimeout(() => {
        introTitleText.runAnimation();
      }, 300);
      setTimeout(() => {
        introDateText.runAnimation();
      }, 900);
      break;
    case screenNames.STORY:
      setTimeout(() => {
        storyTitleText.runAnimation();
      }, 300);
      break;
    case screenNames.PRIZES:
      setTimeout(() => {
        prizesTitleText.runAnimation();
      }, 300);
      break;
    case screenNames.RULES:
      setTimeout(() => {
        rulesTitleText.runAnimation();
      }, 300);
      break;
    case screenNames.GAME:
      setTimeout(() => {
        gameTitleText.runAnimation();
      }, 300);
      break;
    default:
      destroyAllAnimation();
  }
};

export {animateText};
