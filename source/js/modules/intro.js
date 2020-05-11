import AccentTypographyBuild from "./accent-typography-build";

export default () => {
  const animationTitleText = new AccentTypographyBuild(
      `.intro__title`,
      600,
      `active`,
      `transform`,
      [
        [100, 50, 0, 50, 100, 50, 0, 150, 100, 0, 100, 0],
        [250, 350, 300, 150, 250, 200]
      ]);
  const animationDateText = new AccentTypographyBuild(
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
  setTimeout(() => {
    animationTitleText.runAnimation();
  }, 500);
  setTimeout(() => {
    animationDateText.runAnimation();
  }, 1400);
};
