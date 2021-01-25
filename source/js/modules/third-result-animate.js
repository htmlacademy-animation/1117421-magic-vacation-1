import {runSerial, runSerialLoop} from "../helpers/promise";
import animate from "../helpers/animate";
import {bezierEasing} from "../helpers/cubicBezier";

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
let keyOpacity = 0;
let keyOpacityTo = 1;
let keyScale = 0.8;
let keyScaleTo = 1;
const keyOpacityAnimationTick = (from, to) => (progress) => {
  keyOpacity = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const keyScaleAnimationTick = (from, to) => (progress) => {
  keyScale = from + progress * Math.sign(to - from) * Math.abs(to - from);
};

// параметры анимации для слезы
const dropTranslateYOffsets = [5 * wFactor, 61 * wFactor];
const dropScaleXOffsets = [0, 0.5, 1, 0.5];
const dropScaleYOffsets = [0, 0.4, 1, 0.5];
const dropOpacityOffsets = [1, 0];
const dropDelay = 1200;
let dropOpacity = dropOpacityOffsets[0];
let dropTranslateY = dropTranslateYOffsets[0];
let dropScaleX = dropScaleXOffsets[0];
let dropScaleY = dropScaleYOffsets[0];
const dropOpacityAnimationTick = (from, to) => (progress) => {
  dropOpacity = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const dropTranslateYAnimationTick = (from, to) => (progress) => {
  dropTranslateY = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const dropScaleXAnimationTick = (from, to) => (progress) => {
  dropScaleX = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const dropScaleYAnimationTick = (from, to) => (progress) => {
  dropScaleY = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const dropTranslateYAnimates = [
  () => animate.easing(dropTranslateYAnimationTick(dropTranslateYOffsets[0], 0), 330, bezierFunc),
  () => animate.easing(dropTranslateYAnimationTick(0, dropTranslateYOffsets[0]), 253, bezierFunc),
  () => animate.easing(dropTranslateYAnimationTick(dropTranslateYOffsets[0], dropTranslateYOffsets[0]), 127, bezierFunc),
  () => animate.easing(dropTranslateYAnimationTick(dropTranslateYOffsets[0], dropTranslateYOffsets[1]), 507, bezierFunc),
];
const dropScaleXAnimates = [
  () => animate.easing(dropScaleXAnimationTick(dropScaleXOffsets[0], dropScaleXOffsets[1]), 330, bezierFunc),
  () => animate.easing(dropScaleXAnimationTick(dropScaleXOffsets[1], dropScaleXOffsets[2]), 253, bezierFunc),
  () => animate.easing(dropScaleXAnimationTick(dropScaleXOffsets[2], dropScaleXOffsets[2]), 431, bezierFunc),
  () => animate.easing(dropScaleXAnimationTick(dropScaleXOffsets[2], dropScaleXOffsets[3]), 203, bezierFunc),
];
const dropScaleYAnimates = [
  () => animate.easing(dropScaleYAnimationTick(dropScaleYOffsets[0], dropScaleYOffsets[1]), 330, bezierFunc),
  () => animate.easing(dropScaleYAnimationTick(dropScaleYOffsets[1], dropScaleYOffsets[2]), 253, bezierFunc),
  () => animate.easing(dropScaleYAnimationTick(dropScaleYOffsets[2], dropScaleYOffsets[2]), 431, bezierFunc),
  () => animate.easing(dropScaleYAnimationTick(dropScaleYOffsets[2], dropScaleYOffsets[3]), 203, bezierFunc),
];
const dropOpacityAnimates = [
  () => animate.easing(dropOpacityAnimationTick(dropOpacityOffsets[0], dropOpacityOffsets[0]), 330, bezierFunc),
  () => animate.easing(dropOpacityAnimationTick(dropOpacityOffsets[0], dropOpacityOffsets[0]), 253, bezierFunc),
  () => animate.easing(dropOpacityAnimationTick(dropOpacityOffsets[0], dropOpacityOffsets[0]), 431, bezierFunc),
  () => animate.easing(dropOpacityAnimationTick(dropOpacityOffsets[0], dropOpacityOffsets[1]), 203, bezierFunc),
];

// параметры анимации для листа
const leafTranslateXOffsets = [-300 * wFactor, 0, 0];
const leafTranslateYOffsets = [228 * hFactor, 0, 678 * hFactor];
let leafScale = 0;
let leafScaleTo = 1;
let leafRotate = -40;
let leafRotateTo = 0;
let leafTranslateX = leafTranslateXOffsets[0];
let leafTranslateY = leafTranslateYOffsets[0];
const leafScaleAnimationTick = (from, to) => (progress) => {
  leafScale = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const leafRotateAnimationTick = (from, to) => (progress) => {
  leafRotate = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const leafTranslateYAnimationTick = (from, to) => (progress) => {
  leafTranslateY = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const leafTranslateXAnimationTick = (from, to) => (progress) => {
  leafTranslateX = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const leafTranslateYAnimates = [
  () => animate.easing(leafTranslateYAnimationTick(leafTranslateYOffsets[0], leafTranslateYOffsets[1]), 533, bezierFlyFunc),
  () => animate.easing(leafTranslateYAnimationTick(leafTranslateYOffsets[1], leafTranslateYOffsets[2]), 583, bezierFlyAddFunc),
];
const leafTranslateXAnimates = [
  () => animate.easing(leafTranslateXAnimationTick(leafTranslateXOffsets[0], leafTranslateXOffsets[1]), 533, bezierFlyFunc),
  () => animate.easing(leafTranslateXAnimationTick(leafTranslateXOffsets[1], leafTranslateXOffsets[2]), 583, bezierFlyAddFunc),
];

// параметры анимации для сатурна
const saturnTranslateXOffsets = [-336 * wFactor, 0, 0];
const saturnTranslateYOffsets = [-182 * hFactor, 0, 414 * hFactor];
let saturnScale = 0;
let saturnScaleTo = 1;
let saturnRotate = 50;
let saturnRotateTo = 0;
let saturnTranslateX = saturnTranslateXOffsets[0];
let saturnTranslateY = saturnTranslateYOffsets[0];
const saturnScaleAnimationTick = (from, to) => (progress) => {
  saturnScale = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const saturnRotateAnimationTick = (from, to) => (progress) => {
  saturnRotate = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const saturnTranslateYAnimationTick = (from, to) => (progress) => {
  saturnTranslateY = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const saturnTranslateXAnimationTick = (from, to) => (progress) => {
  saturnTranslateX = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const saturnTranslateYAnimates = [
  () => animate.easing(saturnTranslateYAnimationTick(saturnTranslateYOffsets[0], saturnTranslateYOffsets[1]), 617, bezierFlyFunc),
  () => animate.easing(saturnTranslateYAnimationTick(saturnTranslateYOffsets[1], saturnTranslateYOffsets[2]), 583, bezierFlyAddFunc),
];
const saturnTranslateXAnimates = [
  () => animate.easing(saturnTranslateXAnimationTick(saturnTranslateXOffsets[0], saturnTranslateXOffsets[1]), 617, bezierFlyFunc),
  () => animate.easing(saturnTranslateXAnimationTick(saturnTranslateXOffsets[1], saturnTranslateXOffsets[2]), 583, bezierFlyAddFunc),
];

// параметры анимации для фламинго
const flamingoTranslateXOffsets = [206 * wFactor, 0, 0];
const flamingoTranslateYOffsets = [-44 * hFactor, 0, 590 * hFactor];
let flamingoScale = 0;
let flamingoScaleTo = 1;
let flamingoRotate = 60;
let flamingoRotateTo = 0;
let flamingoTranslateX = flamingoTranslateXOffsets[0];
let flamingoTranslateY = flamingoTranslateYOffsets[0];
const flamingoScaleAnimationTick = (from, to) => (progress) => {
  flamingoScale = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const flamingoRotateAnimationTick = (from, to) => (progress) => {
  flamingoRotate = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const flamingoTranslateYAnimationTick = (from, to) => (progress) => {
  flamingoTranslateY = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const flamingoTranslateXAnimationTick = (from, to) => (progress) => {
  flamingoTranslateX = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const flamingoTranslateYAnimates = [
  () => animate.easing(flamingoTranslateYAnimationTick(flamingoTranslateYOffsets[0], flamingoTranslateYOffsets[1]), 617, bezierFlyFunc),
  () => animate.easing(flamingoTranslateYAnimationTick(flamingoTranslateYOffsets[1], flamingoTranslateYOffsets[2]), 583, bezierFlyAddFunc),
];
const flamingoTranslateXAnimates = [
  () => animate.easing(flamingoTranslateXAnimationTick(flamingoTranslateXOffsets[0], flamingoTranslateXOffsets[1]), 617, bezierFlyFunc),
  () => animate.easing(flamingoTranslateXAnimationTick(flamingoTranslateXOffsets[1], flamingoTranslateXOffsets[2]), 583, bezierFlyAddFunc),
];

// параметры анимации для арбуза
const watermelonTranslateXOffsets = [318 * wFactor, 0, 0];
const watermelonTranslateYOffsets = [-140 * hFactor, 0, 428 * hFactor];
let watermelonScale = 0;
let watermelonScaleTo = 1;
let watermelonRotate = 60;
let watermelonRotateTo = 0;
let watermelonTranslateX = watermelonTranslateXOffsets[0];
let watermelonTranslateY = watermelonTranslateYOffsets[0];
const watermelonScaleAnimationTick = (from, to) => (progress) => {
  watermelonScale = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const watermelonRotateAnimationTick = (from, to) => (progress) => {
  watermelonRotate = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const watermelonTranslateYAnimationTick = (from, to) => (progress) => {
  watermelonTranslateY = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const watermelonTranslateXAnimationTick = (from, to) => (progress) => {
  watermelonTranslateX = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const watermelonTranslateYAnimates = [
  () => animate.easing(watermelonTranslateYAnimationTick(watermelonTranslateYOffsets[0], watermelonTranslateYOffsets[1]), 533, bezierFlyFunc),
  () => animate.easing(watermelonTranslateYAnimationTick(watermelonTranslateYOffsets[1], watermelonTranslateYOffsets[2]), 583, bezierFlyAddFunc),
];
const watermelonTranslateXAnimates = [
  () => animate.easing(watermelonTranslateXAnimationTick(watermelonTranslateXOffsets[0], watermelonTranslateXOffsets[1]), 533, bezierFlyFunc),
  () => animate.easing(watermelonTranslateXAnimationTick(watermelonTranslateXOffsets[1], watermelonTranslateXOffsets[2]), 583, bezierFlyAddFunc),
];

// параметры анимации для снежинки
const snowflakeTranslateXOffsets = [-184 * wFactor, 0, 0];
const snowflakeTranslateYOffsets = [-30 * hFactor, 0, 532 * hFactor];
let snowflakeScale = 0;
let snowflakeScaleTo = 1;
let snowflakeRotate = -60;
let snowflakeRotateTo = 0;
let snowflakeTranslateX = snowflakeTranslateXOffsets[0];
let snowflakeTranslateY = snowflakeTranslateYOffsets[0];
const snowflakeScaleAnimationTick = (from, to) => (progress) => {
  snowflakeScale = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const snowflakeRotateAnimationTick = (from, to) => (progress) => {
  snowflakeRotate = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const snowflakeTranslateYAnimationTick = (from, to) => (progress) => {
  snowflakeTranslateY = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const snowflakeTranslateXAnimationTick = (from, to) => (progress) => {
  snowflakeTranslateX = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const snowflakeTranslateYAnimates = [
  () => animate.easing(snowflakeTranslateYAnimationTick(snowflakeTranslateYOffsets[0], snowflakeTranslateYOffsets[1]), 683, bezierFlyFunc),
  () => animate.easing(snowflakeTranslateYAnimationTick(snowflakeTranslateYOffsets[1], snowflakeTranslateYOffsets[2]), 583, bezierFlyAddFunc),
];
const snowflakeTranslateXAnimates = [
  () => animate.easing(snowflakeTranslateXAnimationTick(snowflakeTranslateXOffsets[0], snowflakeTranslateXOffsets[1]), 683, bezierFlyFunc),
  () => animate.easing(snowflakeTranslateXAnimationTick(snowflakeTranslateXOffsets[1], snowflakeTranslateXOffsets[2]), 583, bezierFlyAddFunc),
];

// параметры анимации для крокодила
const crocodileDelay = 617;
let crocodileTranslateY = -104 * wFactor;
let crocodileTranslateX = 334 * wFactor;
const crocodileTranslateYAnimationTick = (from, to) => (progress) => {
  crocodileTranslateY = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const crocodileTranslateXAnimationTick = (from, to) => (progress) => {
  crocodileTranslateX = from + progress * Math.sign(to - from) * Math.abs(to - from);
};


const drawResultCanvas = (resultCanvas) => {
  const resultContext = resultCanvas.getContext(`2d`);
  resultCanvas.width = windowWidth;
  resultCanvas.height = windowHeight;
  resultContext.clearRect(0, 0, windowWidth, windowHeight);
  resultContext.save();

  scaleObject(resultContext, keyScale, keyScale, startPoint.x + sizes.key.width / 2, startPoint.y + sizes.key.height / 2);
  resultContext.globalAlpha = keyOpacity;
  resultContext.drawImage(keyImg, startPoint.x, startPoint.y, sizes.key.width, sizes.key.height * keyScale);
  resultContext.restore();
  resultContext.save();

  resultContext.drawImage(crocodileImg, startPoint.x + sizes.crocodile.deltaX + crocodileTranslateX, startPoint.y + sizes.crocodile.deltaY + crocodileTranslateY, sizes.crocodile.width, sizes.crocodile.height);
  resultContext.beginPath();
  resultContext.moveTo(startPoint.x + sizes.key.width, startPoint.y + sizes.key.height);
  resultContext.lineTo(windowWidth, startPoint.y + sizes.key.height);
  resultContext.lineTo(windowWidth, startPoint.y);
  resultContext.lineTo(startPoint.x + sizes.key.width / 2, startPoint.y);
  resultContext.arc(startPoint.x + 84 * wFactor, startPoint.y + 84 * wFactor, 84 * wFactor, Math.PI * 1.5, Math.PI * 0.3);
  resultContext.closePath();
  resultContext.fillStyle = `#5f458c`;
  resultContext.fill();
  resultContext.restore();
  resultContext.save();

  scaleObject(resultContext, dropScaleX, dropScaleY, startPoint.x + sizes.drop.deltaX + sizes.drop.width / 2, startPoint.y + sizes.drop.deltaY + dropTranslateY);
  resultContext.globalAlpha = dropOpacity;
  resultContext.drawImage(dropImg, startPoint.x + sizes.drop.deltaX, startPoint.y + sizes.drop.deltaY + dropTranslateY, sizes.drop.width, sizes.drop.height);
  resultContext.restore();
  resultContext.save();

  rotateObject(resultContext, leafRotate, startPoint.x, startPoint.y);
  resultContext.drawImage(leafImg, startPoint.x + sizes.leaf.deltaX + leafTranslateX, startPoint.y + sizes.leaf.deltaY + leafTranslateY, sizes.leaf.width * leafScale, sizes.leaf.height * leafScale);
  resultContext.restore();
  resultContext.save();

  rotateObject(resultContext, saturnRotate, startPoint.x, startPoint.y);
  resultContext.drawImage(saturnImg, startPoint.x + sizes.saturn.deltaX + saturnTranslateX, startPoint.y + sizes.saturn.deltaY + saturnTranslateY, sizes.saturn.width * saturnScale, sizes.saturn.height * saturnScale);
  resultContext.restore();
  resultContext.save();

  rotateObject(resultContext, flamingoRotate, startPoint.x, startPoint.y);
  resultContext.drawImage(flamingoImg, startPoint.x + sizes.flamingo.deltaX + flamingoTranslateX, startPoint.y + sizes.flamingo.deltaY + flamingoTranslateY, sizes.flamingo.width * flamingoScale, sizes.flamingo.height * flamingoScale);
  resultContext.restore();
  resultContext.save();

  rotateObject(resultContext, watermelonRotate, startPoint.x, startPoint.y);
  resultContext.drawImage(watermelonImg, startPoint.x + sizes.watermelon.deltaX + watermelonTranslateX, startPoint.y + sizes.watermelon.deltaY + watermelonTranslateY, sizes.watermelon.width * watermelonScale, sizes.watermelon.height * watermelonScale);
  resultContext.restore();
  resultContext.save();

  rotateObject(resultContext, snowflakeRotate, startPoint.x, startPoint.y);
  resultContext.drawImage(snowflakeImg, startPoint.x + sizes.snowflake.deltaX + snowflakeTranslateX, startPoint.y + sizes.snowflake.deltaY + snowflakeTranslateY, sizes.snowflake.width * snowflakeScale, sizes.snowflake.height * snowflakeScale);
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
      animate.easing(keyOpacityAnimationTick(keyOpacity, keyOpacityTo), 183, bezierFunc);
      animate.easing(keyScaleAnimationTick(keyScale, keyScaleTo), 183, bezierFunc);
    }
    drawResultCanvas(resultCanvas);
  };

  const globalLeafAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`leaf`) === -1) {
      animations.push(`leaf`);
      runSerial(leafTranslateXAnimates);
      runSerial(leafTranslateYAnimates);
      animate.easing(leafScaleAnimationTick(leafScale, leafScaleTo), 533, bezierFlyFunc);
      animate.easing(leafRotateAnimationTick(leafRotate, leafRotateTo), 533, bezierFlyFunc);
    }
    drawResultCanvas(resultCanvas);
  };

  const globalSaturnAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`saturn`) === -1) {
      animations.push(`saturn`);
      runSerial(saturnTranslateXAnimates);
      runSerial(saturnTranslateYAnimates);
      animate.easing(saturnScaleAnimationTick(saturnScale, saturnScaleTo), 617, bezierFlyFunc);
      animate.easing(saturnRotateAnimationTick(saturnRotate, saturnRotateTo), 617, bezierFlyFunc);
    }
    drawResultCanvas(resultCanvas);
  };

  const globalFlamingoAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`flamingo`) === -1) {
      animations.push(`flamingo`);
      runSerial(flamingoTranslateXAnimates);
      runSerial(flamingoTranslateYAnimates);
      animate.easing(flamingoScaleAnimationTick(flamingoScale, flamingoScaleTo), 617, bezierFlyFunc);
      animate.easing(flamingoRotateAnimationTick(flamingoRotate, flamingoRotateTo), 617, bezierFlyFunc);
    }
    drawResultCanvas(resultCanvas);
  };

  const globalWatermelonAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`watermelon`) === -1) {
      animations.push(`watermelon`);
      runSerial(watermelonTranslateXAnimates);
      runSerial(watermelonTranslateYAnimates);
      animate.easing(watermelonScaleAnimationTick(watermelonScale, watermelonScaleTo), 533, bezierFlyFunc);
      animate.easing(watermelonRotateAnimationTick(watermelonRotate, watermelonRotateTo), 533, bezierFlyFunc);
    }
    drawResultCanvas(resultCanvas);
  };

  const globalSnowflakeAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`snowflake`) === -1) {
      animations.push(`snowflake`);
      runSerial(snowflakeTranslateXAnimates);
      runSerial(snowflakeTranslateYAnimates);
      animate.easing(snowflakeScaleAnimationTick(snowflakeScale, snowflakeScaleTo), 683, bezierFlyFunc);
      animate.easing(snowflakeRotateAnimationTick(snowflakeRotate, snowflakeRotateTo), 683, bezierFlyFunc);
    }
    drawResultCanvas(resultCanvas);
  };

  const globalCrocodileAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`crocodile`) === -1) {
      animations.push(`crocodile`);
      animate.easing(crocodileTranslateXAnimationTick(crocodileTranslateX, 0), 600, bezierCrocodileFunc);
      animate.easing(crocodileTranslateYAnimationTick(crocodileTranslateY, 0), 600, bezierCrocodileFunc);
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
