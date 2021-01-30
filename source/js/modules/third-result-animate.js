import {runSerial, runSerialLoop} from "../helpers/promise";
import animate from "../helpers/animate";
import {bezierEasing} from "../helpers/cubic-bezier";
import AnimateBuilder from "../helpers/animate-builder";

const rotateObject = (ctx, angle, cx, cy) => {
  ctx.translate(cx, cy);
  ctx.rotate((Math.PI / 180) * angle);
  ctx.translate(-cx, -cy);
};
const scaleObject = (ctx, scaleX, scaleY, cx, cy) => {
  ctx.translate(cx, cy);
  ctx.scale(scaleX, scaleY);
  ctx.translate(-cx, -cy);
};
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const wFactorMin = 0.4;
const wFactor = Math.max(windowWidth / 1440, wFactorMin);
const hFactor = windowHeight / 760;
const sizes = {
  key: {
    width: 171 * wFactor,
    height: 292 * wFactor
  },
  leaf: {
    width: 89 * wFactor,
    height: 109 * wFactor,
    deltaX: 398 * wFactor,
    deltaY: -51 * wFactor
  },
  saturn: {
    width: 119 * wFactor,
    height: 76 * wFactor,
    deltaX: 360 * wFactor,
    deltaY: 288 * wFactor
  },
  flamingo: {
    width: 99 * wFactor,
    height: 111 * wFactor,
    deltaX: -192 * wFactor,
    deltaY: 31 * wFactor
  },
  watermelon: {
    width: 80 * wFactor,
    height: 65 * wFactor,
    deltaX: -283 * wFactor,
    deltaY: 250 * wFactor
  },
  snowflake: {
    width: 67 * wFactor,
    height: 79 * wFactor,
    deltaX: 230 * wFactor,
    deltaY: 126 * wFactor
  },
  crocodile: {
    width: 535 * wFactor,
    height: 170 * wFactor,
    deltaX: -164 * wFactor,
    deltaY: 147 * wFactor
  },
  drop: {
    width: 39 * wFactor,
    height: 59 * wFactor,
    deltaX: 40 * wFactor,
    deltaY: 205 * wFactor
  },
};

const startPoint = {
  x: Math.round((windowWidth - sizes.key.width) / 2),
  y: Math.round((windowHeight - sizes.key.height) / 2 + 70)
};

const animations = [];
const bezierFunc = bezierEasing(0.33, 0, 0.67, 1);
const bezierFlyFunc = bezierEasing(0.11, 0, 0, 1);
const bezierFlyAddFunc = bezierEasing(0.87, 0, 0.83, 0.83);
const bezierCrocodileFunc = bezierEasing(0.15, 0, 0.82, 1);
const delayFromKey = 100;

// параметры анимации для замочной скважины
const keyAnimateBuilder = new AnimateBuilder({
  opacityOffsets: [0, 1],
  scaleXOffsets: [0.8, 1],
  scaleYOffsets: [0.8, 1]}
);

// параметры анимации для слезы
const dropAnimateBuilder = new AnimateBuilder({
  opacityOffsets: [1, 0],
  scaleXOffsets: [0, 0.5, 1, 0.5],
  scaleYOffsets: [0, 0.4, 1, 0.5],
  translateYOffsets: [5 * wFactor, 61 * wFactor]}
);
const dropDelay = 1200;
const dropTranslateYAnimates = [
  () => animate.easing(dropAnimateBuilder.translateYAnimationTick(dropAnimateBuilder.translateYOffsets[0], 0), 330, bezierFunc),
  () => animate.easing(dropAnimateBuilder.translateYAnimationTick(0, dropAnimateBuilder.translateYOffsets[0]), 253, bezierFunc),
  () => animate.easing(dropAnimateBuilder.translateYAnimationTick(dropAnimateBuilder.translateYOffsets[0], dropAnimateBuilder.translateYOffsets[0]), 127, bezierFunc),
  () => animate.easing(dropAnimateBuilder.translateYAnimationTick(dropAnimateBuilder.translateYOffsets[0], dropAnimateBuilder.translateYOffsets[1]), 507, bezierFunc),
];
const dropScaleXAnimates = [
  () => animate.easing(dropAnimateBuilder.scaleXAnimationTick(dropAnimateBuilder.scaleXOffsets[0], dropAnimateBuilder.scaleXOffsets[1]), 330, bezierFunc),
  () => animate.easing(dropAnimateBuilder.scaleXAnimationTick(dropAnimateBuilder.scaleXOffsets[1], dropAnimateBuilder.scaleXOffsets[2]), 253, bezierFunc),
  () => animate.easing(dropAnimateBuilder.scaleXAnimationTick(dropAnimateBuilder.scaleXOffsets[2], dropAnimateBuilder.scaleXOffsets[2]), 431, bezierFunc),
  () => animate.easing(dropAnimateBuilder.scaleXAnimationTick(dropAnimateBuilder.scaleXOffsets[2], dropAnimateBuilder.scaleXOffsets[3]), 203, bezierFunc),
];
const dropScaleYAnimates = [
  () => animate.easing(dropAnimateBuilder.scaleYAnimationTick(dropAnimateBuilder.scaleYOffsets[0], dropAnimateBuilder.scaleYOffsets[1]), 330, bezierFunc),
  () => animate.easing(dropAnimateBuilder.scaleYAnimationTick(dropAnimateBuilder.scaleYOffsets[1], dropAnimateBuilder.scaleYOffsets[2]), 253, bezierFunc),
  () => animate.easing(dropAnimateBuilder.scaleYAnimationTick(dropAnimateBuilder.scaleYOffsets[2], dropAnimateBuilder.scaleYOffsets[2]), 431, bezierFunc),
  () => animate.easing(dropAnimateBuilder.scaleYAnimationTick(dropAnimateBuilder.scaleYOffsets[2], dropAnimateBuilder.scaleYOffsets[3]), 203, bezierFunc),
];
const dropOpacityAnimates = [
  () => animate.easing(dropAnimateBuilder.opacityAnimationTick(dropAnimateBuilder.opacityOffsets[0], dropAnimateBuilder.opacityOffsets[0]), 330, bezierFunc),
  () => animate.easing(dropAnimateBuilder.opacityAnimationTick(dropAnimateBuilder.opacityOffsets[0], dropAnimateBuilder.opacityOffsets[0]), 253, bezierFunc),
  () => animate.easing(dropAnimateBuilder.opacityAnimationTick(dropAnimateBuilder.opacityOffsets[0], dropAnimateBuilder.opacityOffsets[0]), 431, bezierFunc),
  () => animate.easing(dropAnimateBuilder.opacityAnimationTick(dropAnimateBuilder.opacityOffsets[0], dropAnimateBuilder.opacityOffsets[1]), 203, bezierFunc),
];

// параметры анимации для листа
const leafAnimateBuilder = new AnimateBuilder({
  rotateOffsets: [-40, 0],
  scaleXOffsets: [0, 1],
  scaleYOffsets: [0, 1],
  translateXOffsets: [(-300 - (sizes.key.width / 2 - sizes.leaf.width / 2)) * wFactor, 0, 0],
  translateYOffsets: [(228 - (sizes.key.height / 2 - sizes.leaf.height / 2)) * hFactor, 0, 678 * hFactor]}
);
const leafTranslateYAnimates = [
  () => animate.easing(leafAnimateBuilder.translateYAnimationTick(leafAnimateBuilder.translateYOffsets[0], leafAnimateBuilder.translateYOffsets[1]), 533, bezierFlyFunc),
  () => animate.easing(leafAnimateBuilder.translateYAnimationTick(leafAnimateBuilder.translateYOffsets[1], leafAnimateBuilder.translateYOffsets[2]), 583, bezierFlyAddFunc),
];
const leafTranslateXAnimates = [
  () => animate.easing(leafAnimateBuilder.translateXAnimationTick(leafAnimateBuilder.translateXOffsets[0], leafAnimateBuilder.translateXOffsets[1]), 533, bezierFlyFunc),
  () => animate.easing(leafAnimateBuilder.translateXAnimationTick(leafAnimateBuilder.translateXOffsets[1], leafAnimateBuilder.translateXOffsets[2]), 583, bezierFlyAddFunc),
];

// параметры анимации для сатурна
const saturnAnimateBuilder = new AnimateBuilder({
  rotateOffsets: [50, 0],
  scaleXOffsets: [0, 1],
  scaleYOffsets: [0, 1],
  translateXOffsets: [(-336 + (sizes.key.width / 2 - sizes.saturn.width / 2)) * wFactor, 0, 0],
  translateYOffsets: [(-182 + (sizes.key.height / 2 - sizes.saturn.height / 2)) * hFactor, 0, 414 * hFactor]}
);
const saturnTranslateYAnimates = [
  () => animate.easing(saturnAnimateBuilder.translateYAnimationTick(saturnAnimateBuilder.translateYOffsets[0], saturnAnimateBuilder.translateYOffsets[1]), 617, bezierFlyFunc),
  () => animate.easing(saturnAnimateBuilder.translateYAnimationTick(saturnAnimateBuilder.translateYOffsets[1], saturnAnimateBuilder.translateYOffsets[2]), 583, bezierFlyAddFunc),
];
const saturnTranslateXAnimates = [
  () => animate.easing(saturnAnimateBuilder.translateXAnimationTick(saturnAnimateBuilder.translateXOffsets[0], saturnAnimateBuilder.translateXOffsets[1]), 617, bezierFlyFunc),
  () => animate.easing(saturnAnimateBuilder.translateXAnimationTick(saturnAnimateBuilder.translateXOffsets[1], saturnAnimateBuilder.translateXOffsets[2]), 583, bezierFlyAddFunc),
];

// параметры анимации для фламинго
const flamingoAnimateBuilder = new AnimateBuilder({
  rotateOffsets: [60, 0],
  scaleXOffsets: [0, 1],
  scaleYOffsets: [0, 1],
  translateXOffsets: [(206 - (sizes.key.width / 2 - sizes.flamingo.width / 2)) * wFactor, 0, 0],
  translateYOffsets: [(-44 + (sizes.key.height / 2 - sizes.flamingo.height / 2)) * hFactor, 0, 590 * hFactor]}
);
const flamingoTranslateYAnimates = [
  () => animate.easing(flamingoAnimateBuilder.translateYAnimationTick(flamingoAnimateBuilder.translateYOffsets[0], flamingoAnimateBuilder.translateYOffsets[1]), 617, bezierFlyFunc),
  () => animate.easing(flamingoAnimateBuilder.translateYAnimationTick(flamingoAnimateBuilder.translateYOffsets[1], flamingoAnimateBuilder.translateYOffsets[2]), 583, bezierFlyAddFunc),
];
const flamingoTranslateXAnimates = [
  () => animate.easing(flamingoAnimateBuilder.translateXAnimationTick(flamingoAnimateBuilder.translateXOffsets[0], flamingoAnimateBuilder.translateXOffsets[1]), 617, bezierFlyFunc),
  () => animate.easing(flamingoAnimateBuilder.translateXAnimationTick(flamingoAnimateBuilder.translateXOffsets[1], flamingoAnimateBuilder.translateXOffsets[2]), 583, bezierFlyAddFunc),
];

// параметры анимации для арбуза
const watermelonAnimateBuilder = new AnimateBuilder({
  rotateOffsets: [60, 0],
  scaleXOffsets: [0, 1],
  scaleYOffsets: [0, 1],
  translateXOffsets: [(318 - (sizes.key.width / 2 - sizes.watermelon.width / 2)) * wFactor, 0, 0],
  translateYOffsets: [(-140 + (sizes.key.height / 2 - sizes.watermelon.height / 2)) * hFactor, 0, 428 * hFactor]}
);
const watermelonTranslateYAnimates = [
  () => animate.easing(watermelonAnimateBuilder.translateYAnimationTick(watermelonAnimateBuilder.translateYOffsets[0], watermelonAnimateBuilder.translateYOffsets[1]), 533, bezierFlyFunc),
  () => animate.easing(watermelonAnimateBuilder.translateYAnimationTick(watermelonAnimateBuilder.translateYOffsets[1], watermelonAnimateBuilder.translateYOffsets[2]), 583, bezierFlyAddFunc),
];
const watermelonTranslateXAnimates = [
  () => animate.easing(watermelonAnimateBuilder.translateXAnimationTick(watermelonAnimateBuilder.translateXOffsets[0], watermelonAnimateBuilder.translateXOffsets[1]), 533, bezierFlyFunc),
  () => animate.easing(watermelonAnimateBuilder.translateXAnimationTick(watermelonAnimateBuilder.translateXOffsets[1], watermelonAnimateBuilder.translateXOffsets[2]), 583, bezierFlyAddFunc),
];

// параметры анимации для снежинки
const snowflakeAnimateBuilder = new AnimateBuilder({
  rotateOffsets: [-60, 0],
  scaleXOffsets: [0, 1],
  scaleYOffsets: [0, 1],
  translateXOffsets: [(-184 + (sizes.key.width / 2 + sizes.snowflake.width / 2)) * wFactor, 0, 0],
  translateYOffsets: [(100 - (sizes.key.height / 2 - sizes.snowflake.height / 2)) * hFactor, 0, 532 * hFactor]}
);
const snowflakeTranslateYAnimates = [
  () => animate.easing(snowflakeAnimateBuilder.translateYAnimationTick(snowflakeAnimateBuilder.translateYOffsets[0], snowflakeAnimateBuilder.translateYOffsets[1]), 683, bezierFlyFunc),
  () => animate.easing(snowflakeAnimateBuilder.translateYAnimationTick(snowflakeAnimateBuilder.translateYOffsets[1], snowflakeAnimateBuilder.translateYOffsets[2]), 583, bezierFlyAddFunc),
];
const snowflakeTranslateXAnimates = [
  () => animate.easing(snowflakeAnimateBuilder.translateXAnimationTick(snowflakeAnimateBuilder.translateXOffsets[0], snowflakeAnimateBuilder.translateXOffsets[1]), 683, bezierFlyFunc),
  () => animate.easing(snowflakeAnimateBuilder.translateXAnimationTick(snowflakeAnimateBuilder.translateXOffsets[1], snowflakeAnimateBuilder.translateXOffsets[2]), 583, bezierFlyAddFunc),
];

// параметры анимации для крокодила
const crocodileAnimateBuilder = new AnimateBuilder({
  translateXOffsets: [334 * wFactor, 0],
  translateYOffsets: [-104 * hFactor, 0]}
);
const crocodileDelay = 617;

const drawResultCanvas = (resultCanvas) => {
  const resultContext = resultCanvas.getContext(`2d`);
  resultCanvas.width = windowWidth;
  resultCanvas.height = windowHeight;
  resultContext.clearRect(0, 0, windowWidth, windowHeight);
  resultContext.save();

  // рисуем скважину
  scaleObject(
      resultContext,
      keyAnimateBuilder.scaleX,
      keyAnimateBuilder.scaleY,
      startPoint.x + sizes.key.width / 2,
      startPoint.y + sizes.key.height / 2);
  resultContext.globalAlpha = keyAnimateBuilder.opacity;
  resultContext.drawImage(keyImg, startPoint.x, startPoint.y, sizes.key.width, sizes.key.height);
  resultContext.restore();
  resultContext.save();

  // рисуем крокодила
  resultContext.drawImage(
      crocodileImg,
      startPoint.x + sizes.crocodile.deltaX + crocodileAnimateBuilder.translateX,
      startPoint.y + sizes.crocodile.deltaY + crocodileAnimateBuilder.translateY,
      sizes.crocodile.width,
      sizes.crocodile.height);
  resultContext.beginPath();
  resultContext.moveTo(startPoint.x + sizes.key.width, startPoint.y + sizes.key.height);
  resultContext.lineTo(windowWidth, startPoint.y + sizes.key.height);
  resultContext.lineTo(windowWidth, 0);
  resultContext.lineTo(startPoint.x + sizes.key.width / 2, 0);
  resultContext.lineTo(startPoint.x + sizes.key.width / 2, startPoint.y);
  resultContext.arc(startPoint.x + 84 * wFactor, startPoint.y + 84 * wFactor, 84 * wFactor, Math.PI * 1.5, Math.PI * 0.26);
  resultContext.closePath();
  resultContext.fillStyle = `#5f458c`;
  resultContext.fill();
  resultContext.restore();
  resultContext.save();

  // рисуем слезу
  scaleObject(
      resultContext,
      dropAnimateBuilder.scaleX,
      dropAnimateBuilder.scaleY,
      startPoint.x + sizes.drop.deltaX + sizes.drop.width / 2,
      startPoint.y + sizes.drop.deltaY + dropAnimateBuilder.translateY);
  resultContext.globalAlpha = dropAnimateBuilder.opacity;
  resultContext.drawImage(
      dropImg,
      startPoint.x + sizes.drop.deltaX,
      startPoint.y + sizes.drop.deltaY + dropAnimateBuilder.translateY,
      sizes.drop.width, sizes.drop.height);
  resultContext.restore();
  resultContext.save();

  // рисуем лист
  rotateObject(
      resultContext,
      leafAnimateBuilder.rotate,
      startPoint.x + sizes.key.width / 2,
      startPoint.y + sizes.key.height / 2);
  scaleObject(
      resultContext,
      leafAnimateBuilder.scaleX,
      leafAnimateBuilder.scaleY,
      startPoint.x + sizes.leaf.deltaX + sizes.leaf.width / 2 + leafAnimateBuilder.translateX,
      startPoint.y + sizes.leaf.deltaY + sizes.leaf.height / 2 + leafAnimateBuilder.translateY);
  resultContext.drawImage(
      leafImg,
      startPoint.x + sizes.leaf.deltaX + leafAnimateBuilder.translateX,
      startPoint.y + sizes.leaf.deltaY + leafAnimateBuilder.translateY,
      sizes.leaf.width,
      sizes.leaf.height);
  resultContext.restore();
  resultContext.save();

  // рисуем сатурн
  rotateObject(
      resultContext,
      saturnAnimateBuilder.rotate,
      startPoint.x + sizes.key.width / 2,
      startPoint.y + sizes.key.height / 2);
  scaleObject(
      resultContext,
      saturnAnimateBuilder.scaleX,
      saturnAnimateBuilder.scaleY,
      startPoint.x + sizes.saturn.deltaX + sizes.saturn.width / 2 + saturnAnimateBuilder.translateX,
      startPoint.y + sizes.saturn.deltaY + sizes.saturn.height / 2 + saturnAnimateBuilder.translateY);
  resultContext.drawImage(
      saturnImg,
      startPoint.x + sizes.saturn.deltaX + saturnAnimateBuilder.translateX,
      startPoint.y + sizes.saturn.deltaY + saturnAnimateBuilder.translateY,
      sizes.saturn.width,
      sizes.saturn.height);
  resultContext.restore();
  resultContext.save();

  // рисуем фламинго
  rotateObject(
      resultContext,
      flamingoAnimateBuilder.rotate,
      startPoint.x + sizes.key.width / 2,
      startPoint.y + sizes.key.height / 2);
  scaleObject(
      resultContext,
      flamingoAnimateBuilder.scaleX,
      flamingoAnimateBuilder.scaleY,
      startPoint.x + sizes.flamingo.deltaX + sizes.flamingo.width / 2 + flamingoAnimateBuilder.translateX,
      startPoint.y + sizes.flamingo.deltaY + sizes.flamingo.height / 2 + flamingoAnimateBuilder.translateY);
  resultContext.drawImage(
      flamingoImg,
      startPoint.x + sizes.flamingo.deltaX + flamingoAnimateBuilder.translateX,
      startPoint.y + sizes.flamingo.deltaY + flamingoAnimateBuilder.translateY,
      sizes.flamingo.width,
      sizes.flamingo.height);
  resultContext.restore();
  resultContext.save();

  // рисуем арбуз
  rotateObject(
      resultContext,
      watermelonAnimateBuilder.rotate,
      startPoint.x + sizes.key.width / 2,
      startPoint.y + sizes.key.height / 2);
  scaleObject(
      resultContext,
      watermelonAnimateBuilder.scaleX,
      watermelonAnimateBuilder.scaleY,
      startPoint.x + sizes.watermelon.deltaX + sizes.watermelon.width / 2 + watermelonAnimateBuilder.translateX,
      startPoint.y + sizes.watermelon.deltaY + sizes.watermelon.height / 2 + watermelonAnimateBuilder.translateY);
  resultContext.drawImage(
      watermelonImg,
      startPoint.x + sizes.watermelon.deltaX + watermelonAnimateBuilder.translateX,
      startPoint.y + sizes.watermelon.deltaY + watermelonAnimateBuilder.translateY,
      sizes.watermelon.width,
      sizes.watermelon.height);
  resultContext.restore();
  resultContext.save();

  // рисуем снежинку
  rotateObject(
      resultContext,
      snowflakeAnimateBuilder.rotate,
      startPoint.x + sizes.key.width / 2,
      startPoint.y + sizes.key.height / 2);
  scaleObject(
      resultContext,
      snowflakeAnimateBuilder.scaleX,
      snowflakeAnimateBuilder.scaleY,
      startPoint.x + sizes.snowflake.deltaX + sizes.snowflake.width / 2 + snowflakeAnimateBuilder.translateX,
      startPoint.y + sizes.snowflake.deltaY + sizes.snowflake.height / 2 + snowflakeAnimateBuilder.translateY);
  resultContext.drawImage(
      snowflakeImg,
      startPoint.x + sizes.snowflake.deltaX + snowflakeAnimateBuilder.translateX,
      startPoint.y + sizes.snowflake.deltaY + snowflakeAnimateBuilder.translateY,
      sizes.snowflake.width,
      sizes.snowflake.height);
  resultContext.restore();
  resultContext.save();
};

const keyImg = new Image();
const leafImg = new Image();
const saturnImg = new Image();
const flamingoImg = new Image();
const watermelonImg = new Image();
const snowflakeImg = new Image();
const crocodileImg = new Image();
const dropImg = new Image();
const allImages = [
  keyImg,
  leafImg,
  saturnImg,
  flamingoImg,
  watermelonImg,
  snowflakeImg,
  crocodileImg,
  dropImg
];

const thirdResultAnimate = (resultCanvas) => {
  const globalKeyAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`key`) === -1) {
      animations.push(`key`);
      animate.easing(keyAnimateBuilder.opacityAnimationTick(keyAnimateBuilder.opacity, keyAnimateBuilder.opacityOffsets[1]), 183, bezierFunc);
      animate.easing(keyAnimateBuilder.scaleXAnimationTick(keyAnimateBuilder.scaleX, keyAnimateBuilder.scaleXOffsets[1]), 183, bezierFunc);
      animate.easing(keyAnimateBuilder.scaleYAnimationTick(keyAnimateBuilder.scaleY, keyAnimateBuilder.scaleYOffsets[1]), 183, bezierFunc);
    }
    drawResultCanvas(resultCanvas);
  };

  const globalLeafAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`leaf`) === -1) {
      animations.push(`leaf`);
      runSerial(leafTranslateXAnimates);
      runSerial(leafTranslateYAnimates);
      animate.easing(leafAnimateBuilder.scaleXAnimationTick(leafAnimateBuilder.scaleXOffsets[0], leafAnimateBuilder.scaleXOffsets[1]), 533, bezierFlyFunc);
      animate.easing(leafAnimateBuilder.scaleYAnimationTick(leafAnimateBuilder.scaleYOffsets[0], leafAnimateBuilder.scaleYOffsets[1]), 533, bezierFlyFunc);
      animate.easing(leafAnimateBuilder.rotateAnimationTick(leafAnimateBuilder.rotateOffsets[0], leafAnimateBuilder.rotateOffsets[1]), 533, bezierFlyFunc);
    }
    drawResultCanvas(resultCanvas);
  };

  const globalSaturnAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`saturn`) === -1) {
      animations.push(`saturn`);
      runSerial(saturnTranslateXAnimates);
      runSerial(saturnTranslateYAnimates);
      animate.easing(saturnAnimateBuilder.scaleXAnimationTick(saturnAnimateBuilder.scaleXOffsets[0], saturnAnimateBuilder.scaleXOffsets[1]), 617, bezierFlyFunc);
      animate.easing(saturnAnimateBuilder.scaleYAnimationTick(saturnAnimateBuilder.scaleYOffsets[0], saturnAnimateBuilder.scaleYOffsets[1]), 617, bezierFlyFunc);
      animate.easing(saturnAnimateBuilder.rotateAnimationTick(saturnAnimateBuilder.rotateOffsets[0], saturnAnimateBuilder.rotateOffsets[1]), 617, bezierFlyFunc);
    }
    drawResultCanvas(resultCanvas);
  };

  const globalFlamingoAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`flamingo`) === -1) {
      animations.push(`flamingo`);
      runSerial(flamingoTranslateXAnimates);
      runSerial(flamingoTranslateYAnimates);
      animate.easing(flamingoAnimateBuilder.scaleYAnimationTick(flamingoAnimateBuilder.scaleYOffsets[0], flamingoAnimateBuilder.scaleYOffsets[1]), 617, bezierFlyFunc);
      animate.easing(flamingoAnimateBuilder.scaleXAnimationTick(flamingoAnimateBuilder.scaleXOffsets[0], flamingoAnimateBuilder.scaleXOffsets[1]), 617, bezierFlyFunc);
      animate.easing(flamingoAnimateBuilder.rotateAnimationTick(flamingoAnimateBuilder.rotateOffsets[0], flamingoAnimateBuilder.rotateOffsets[1]), 617, bezierFlyFunc);
    }
    drawResultCanvas(resultCanvas);
  };

  const globalWatermelonAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`watermelon`) === -1) {
      animations.push(`watermelon`);
      runSerial(watermelonTranslateXAnimates);
      runSerial(watermelonTranslateYAnimates);
      animate.easing(watermelonAnimateBuilder.scaleYAnimationTick(watermelonAnimateBuilder.scaleYOffsets[0], watermelonAnimateBuilder.scaleYOffsets[1]), 533, bezierFlyFunc);
      animate.easing(watermelonAnimateBuilder.scaleXAnimationTick(watermelonAnimateBuilder.scaleXOffsets[0], watermelonAnimateBuilder.scaleXOffsets[1]), 533, bezierFlyFunc);
      animate.easing(watermelonAnimateBuilder.rotateAnimationTick(watermelonAnimateBuilder.rotateOffsets[0], watermelonAnimateBuilder.rotateOffsets[1]), 533, bezierFlyFunc);
    }
    drawResultCanvas(resultCanvas);
  };

  const globalSnowflakeAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`snowflake`) === -1) {
      animations.push(`snowflake`);
      runSerial(snowflakeTranslateXAnimates);
      runSerial(snowflakeTranslateYAnimates);
      animate.easing(snowflakeAnimateBuilder.scaleYAnimationTick(snowflakeAnimateBuilder.scaleYOffsets[0], snowflakeAnimateBuilder.scaleYOffsets[1]), 683, bezierFlyFunc);
      animate.easing(snowflakeAnimateBuilder.scaleXAnimationTick(snowflakeAnimateBuilder.scaleXOffsets[0], snowflakeAnimateBuilder.scaleXOffsets[1]), 683, bezierFlyFunc);
      animate.easing(snowflakeAnimateBuilder.rotateAnimationTick(snowflakeAnimateBuilder.rotateOffsets[0], snowflakeAnimateBuilder.rotateOffsets[1]), 683, bezierFlyFunc);
    }
    drawResultCanvas(resultCanvas);
  };

  const globalCrocodileAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`crocodile`) === -1) {
      animations.push(`crocodile`);
      animate.easing(
          crocodileAnimateBuilder.translateXAnimationTick(crocodileAnimateBuilder.translateXOffsets[0], crocodileAnimateBuilder.translateXOffsets[1]),
          600,
          bezierCrocodileFunc);
      animate.easing(
          crocodileAnimateBuilder.translateYAnimationTick(crocodileAnimateBuilder.translateYOffsets[0], crocodileAnimateBuilder.translateYOffsets[1]),
          600,
          bezierCrocodileFunc);
    }
    drawResultCanvas(resultCanvas);
  };

  const globalDropAnimationTick = (globalProgress) => {
    if (globalProgress >= 0) {
      runSerial(dropTranslateYAnimates);
      runSerial(dropScaleXAnimates);
      runSerial(dropScaleYAnimates);
      runSerial(dropOpacityAnimates);
    }
    drawResultCanvas(resultCanvas);
  };

  allImages.forEach((img) => {
    img.onload = () => {
      drawResultCanvas(resultCanvas);
      animate.duration(globalKeyAnimationTick, 183);
      setTimeout(() => {
        animate.duration(globalLeafAnimationTick, 1116);
        animate.duration(globalSaturnAnimationTick, 1200);
        animate.duration(globalFlamingoAnimationTick, 1200);
        animate.duration(globalWatermelonAnimationTick, 1116);
        animate.duration(globalSnowflakeAnimationTick, 1266);
      }, delayFromKey);
      setTimeout(() => {
        animate.duration(globalCrocodileAnimationTick, 600);
      }, crocodileDelay);
      const globalDropAnimates = [
        () => animate.duration(globalDropAnimationTick, 1217)
      ];
      setTimeout(() => {
        runSerialLoop(globalDropAnimates);
      }, dropDelay);
    };
  });

  keyImg.src = `img/key.png`;
  leafImg.src = `img/leaf.png`;
  saturnImg.src = `img/saturn.png`;
  flamingoImg.src = `img/flamingo.png`;
  watermelonImg.src = `img/watermelon.png`;
  snowflakeImg.src = `img/snowflake2.png`;
  crocodileImg.src = `img/crocodile.png`;
  dropImg.src = `img/drop.png`;
};

export {thirdResultAnimate};
