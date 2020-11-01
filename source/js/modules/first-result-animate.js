import {runSerial} from "../helpers/promise";
import animate from "../helpers/animate";
import {bezierEasing} from "../helpers/cubicBezier";

const rotateObject = (ctx, angle, cx, cy) => {
  ctx.translate(cx, cy);
  ctx.rotate((Math.PI / 180) * angle);
  ctx.translate(-cx, -cy);
};
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const sizes = {
  back: {
    width: 586,
    height: 324,
    deltaX: -18,
    deltaY: -183
  },
  airplane: {
    width: 82,
    height: 79,
    deltaX: 556,
    deltaY: -145
  },
  tree: {
    width: 50,
    height: 159,
    deltaX: 267,
    deltaY: -119
  },
  treeSecond: {
    width: 38,
    height: 101,
    deltaX: 313,
    deltaY: -61
  },
  ice: {
    width: 408,
    height: 167
  },
  seal: {
    width: 271,
    height: 212,
    deltaX: 86,
    deltaY: -106
  },
  snowflakeLeft: {
    width: 119,
    height: 141,
    deltaX: -103,
    deltaY: -101
  },
  snowflakeRight: {
    width: 94,
    height: 111,
    deltaX: 387,
    deltaY: -10
  },
};
const startPoint = {
  x: Math.round((windowWidth - sizes.ice.width) / 2),
  y: windowHeight - 330
};
const animations = [];
const bezierFunc = bezierEasing(0.33, 0, 0.67, 1);

// параметры анимации для следа от самолета
let backOpacity = 0;
let backScale = 0;
let backOpacityTo = 1;
let backScaleTo = 1;
const backOpacityAnimationTick = (from, to) => (progress) => {
  backOpacity = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const backScaleAnimationTick = (from, to) => (progress) => {
  backScale = from + progress * Math.sign(to - from) * Math.abs(to - from);
};

// параметры анимации для самолета
const airplaneTranslateYOffsets = [-63, 0];
const airplaneTranslateXOffsets = [-397, 0];
const airplaneRotateOffsets = [63, 74, 63, 0];
let airplaneTranslateY = airplaneTranslateYOffsets[0];
let airplaneTranslateX = airplaneTranslateXOffsets[0];
let airplaneRotateAngle = airplaneRotateOffsets[0];
const airplaneTranslateYAnimationTick = (from, to) => (progress) => {
  airplaneTranslateY = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const airplaneTranslateXAnimationTick = (from, to) => (progress) => {
  airplaneTranslateX = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const airplaneRotateAnimationTick = (from, to) => (progress) => {
  airplaneRotateAngle = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const airplaneRotateAnimates = [
  () => animate.easing(airplaneRotateAnimationTick(airplaneRotateOffsets[0], airplaneRotateOffsets[1]), 133, bezierFunc),
  () => animate.easing(airplaneRotateAnimationTick(airplaneRotateOffsets[1], airplaneRotateOffsets[2]), 67, bezierFunc),
  () => animate.easing(airplaneRotateAnimationTick(airplaneRotateOffsets[2], airplaneRotateOffsets[3]), 367, bezierFunc),
];

// параметры анимации для дерева
let treeOpacity = 0;
let treeSecondOpacity = 1;
let treeTranslateY = 200;
let treeSecondTranslateY = 120;
let treeOpacityTo = 1;
const treeOpacityAnimationTick = (from, to) => (progress) => {
  treeOpacity = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const treeTranslateYAnimationTick = (from, to) => (progress) => {
  treeTranslateY = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const treeSecondOpacityAnimationTick = (from, to) => (progress) => {
  treeSecondOpacity = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const treeSecondTranslateYAnimationTick = (from, to) => (progress) => {
  treeSecondTranslateY = from + progress * Math.sign(to - from) * Math.abs(to - from);
};

// параметры анимации для снежинки
const snowflakeTranslateYOffset = 10;
const snowflakeLeftOpacityDelay = 150;
const snowflakeRightOpacityDelay = 200;
let snowflakeLeftOpacity = 0;
let snowflakeLeftOpacityTo = 1;
let snowflakeRightOpacity = 0;
let snowflakeRightOpacityTo = 1;
let snowflakeLeftTranslateY = -snowflakeTranslateYOffset;
let snowflakeRightTranslateY = snowflakeTranslateYOffset;
const snowflakeLeftTranslateYAnimationTick = (from, to) => (progress) => {
  snowflakeLeftTranslateY = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const snowflakeRightTranslateYAnimationTick = (from, to) => (progress) => {
  snowflakeRightTranslateY = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const snowflakeLeftOpacityAnimationTick = (from, to) => (progress) => {
  snowflakeLeftOpacity = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const snowflakeRightOpacityAnimationTick = (from, to) => (progress) => {
  snowflakeRightOpacity = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const snowflakeLeftTranslateYAnimates = [
  () => animate.easing(snowflakeLeftTranslateYAnimationTick(snowflakeLeftTranslateY, snowflakeTranslateYOffset), 1167, bezierFunc),
  () => animate.easing(snowflakeLeftTranslateYAnimationTick(snowflakeTranslateYOffset, -snowflakeTranslateYOffset), 1167, bezierFunc),
  () => animate.easing(snowflakeLeftTranslateYAnimationTick(-snowflakeTranslateYOffset, snowflakeTranslateYOffset), 1167, bezierFunc),
  () => animate.easing(snowflakeLeftTranslateYAnimationTick(snowflakeTranslateYOffset, -snowflakeTranslateYOffset), 1167, bezierFunc),
  () => animate.easing(snowflakeLeftTranslateYAnimationTick(-snowflakeTranslateYOffset, snowflakeTranslateYOffset), 1167, bezierFunc),
];
const snowflakeRightTranslateYAnimates = [
  () => animate.easing(snowflakeRightTranslateYAnimationTick(snowflakeRightTranslateY, -snowflakeTranslateYOffset), 1167, bezierFunc),
  () => animate.easing(snowflakeRightTranslateYAnimationTick(-snowflakeTranslateYOffset, snowflakeTranslateYOffset), 1167, bezierFunc),
  () => animate.easing(snowflakeRightTranslateYAnimationTick(snowflakeTranslateYOffset, -snowflakeTranslateYOffset), 1167, bezierFunc),
  () => animate.easing(snowflakeRightTranslateYAnimationTick(-snowflakeTranslateYOffset, snowflakeTranslateYOffset), 1167, bezierFunc),
  () => animate.easing(snowflakeRightTranslateYAnimationTick(snowflakeTranslateYOffset, -snowflakeTranslateYOffset), 1167, bezierFunc),
];

// параметры анимации для моржа на льдине
const sealTranslateYOffsets = [560, -26, 21, -12, 11, -7, 0];
const sealRotateOffsets = [20, -4, 5, -4, 1, 0];
let sealTranslateY = sealTranslateYOffsets[0];
let sealRotateAngle = sealRotateOffsets[0];
const sealTranslateYAnimationTick = (from, to) => (progress) => {
  sealTranslateY = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const sealRotateAnimationTick = (from, to) => (progress) => {
  sealRotateAngle = from + progress * Math.sign(to - from) * Math.abs(to - from);
};
const sealRotateDelay = 300;
const sealTranslateYAnimates = [
  () => animate.easing(sealTranslateYAnimationTick(sealTranslateYOffsets[0], sealTranslateYOffsets[1]), 367, bezierFunc),
  () => animate.easing(sealTranslateYAnimationTick(sealTranslateYOffsets[1], sealTranslateYOffsets[2]), 267, bezierFunc),
  () => animate.easing(sealTranslateYAnimationTick(sealTranslateYOffsets[2], sealTranslateYOffsets[3]), 267, bezierFunc),
  () => animate.easing(sealTranslateYAnimationTick(sealTranslateYOffsets[3], sealTranslateYOffsets[4]), 267, bezierFunc),
  () => animate.easing(sealTranslateYAnimationTick(sealTranslateYOffsets[4], sealTranslateYOffsets[5]), 300, bezierFunc),
  () => animate.easing(sealTranslateYAnimationTick(sealTranslateYOffsets[5], sealTranslateYOffsets[6]), 400, bezierFunc)
];
const sealRotateAnimates = [
  () => animate.easing(sealRotateAnimationTick(sealRotateOffsets[0], sealRotateOffsets[1]), 267, bezierFunc),
  () => animate.easing(sealRotateAnimationTick(sealRotateOffsets[1], sealRotateOffsets[2]), 267, bezierFunc),
  () => animate.easing(sealRotateAnimationTick(sealRotateOffsets[2], sealRotateOffsets[3]), 267, bezierFunc),
  () => animate.easing(sealRotateAnimationTick(sealRotateOffsets[3], sealRotateOffsets[4]), 300, bezierFunc),
  () => animate.easing(sealRotateAnimationTick(sealRotateOffsets[4], sealRotateOffsets[5]), 400, bezierFunc),
];

const drawResultCanvas = (resultCanvas) => {
  const resultContext = resultCanvas.getContext(`2d`);
  resultCanvas.width = windowWidth;
  resultCanvas.height = windowHeight;
  resultContext.clearRect(0, 0, windowWidth, windowHeight);
  resultContext.save();

  resultContext.globalAlpha = backOpacity;
  resultContext.drawImage(backImg, startPoint.x + sizes.back.deltaX, startPoint.y + sizes.back.deltaY, sizes.back.width * backScale, sizes.back.height * backScale);
  rotateObject(resultContext, airplaneRotateAngle, startPoint.x + sizes.airplane.deltaX + airplaneTranslateX, startPoint.y + sizes.airplane.deltaY + airplaneTranslateY);
  resultContext.drawImage(airplaneImg, startPoint.x + sizes.airplane.deltaX + airplaneTranslateX, startPoint.y + sizes.airplane.deltaY + airplaneTranslateY, sizes.airplane.width, sizes.airplane.height);
  resultContext.restore();
  resultContext.save();

  resultContext.globalAlpha = treeOpacity;
  resultContext.drawImage(treeImg, startPoint.x + sizes.tree.deltaX, startPoint.y + sizes.tree.deltaY + treeTranslateY, sizes.tree.width, sizes.tree.height);
  resultContext.restore();
  resultContext.save();

  resultContext.globalAlpha = treeSecondOpacity;
  resultContext.drawImage(treeSecondImg, startPoint.x + sizes.treeSecond.deltaX, startPoint.y + sizes.treeSecond.deltaY + treeSecondTranslateY, sizes.treeSecond.width, sizes.treeSecond.height);
  resultContext.restore();
  resultContext.save();

  rotateObject(resultContext, sealRotateAngle, startPoint.x, startPoint.y);
  resultContext.drawImage(iceImg, startPoint.x, startPoint.y + sealTranslateY, sizes.ice.width, sizes.ice.height);
  resultContext.drawImage(sealImg, startPoint.x + sizes.seal.deltaX, startPoint.y + sealTranslateY + sizes.seal.deltaY, sizes.seal.width, sizes.seal.height);
  resultContext.restore();
  resultContext.save();

  resultContext.globalAlpha = snowflakeLeftOpacity;
  resultContext.drawImage(snowflakeLeftImg, startPoint.x + sizes.snowflakeLeft.deltaX, startPoint.y + sizes.snowflakeLeft.deltaY + snowflakeLeftTranslateY, sizes.snowflakeLeft.width, sizes.snowflakeLeft.height);
  resultContext.restore();
  resultContext.save();

  resultContext.globalAlpha = snowflakeRightOpacity;
  resultContext.drawImage(snowflakeRightImg, startPoint.x + sizes.snowflakeRight.deltaX, startPoint.y + sizes.snowflakeRight.deltaY + snowflakeRightTranslateY, sizes.snowflakeRight.width, sizes.snowflakeRight.height);
  resultContext.restore();
  resultContext.save();
};

const backImg = new Image();
const airplaneImg = new Image();
const treeImg = new Image();
const treeSecondImg = new Image();
const sealImg = new Image();
const iceImg = new Image();
const snowflakeRightImg = new Image();
const snowflakeLeftImg = new Image();
const allImages = [
  backImg,
  airplaneImg,
  treeImg,
  treeSecondImg,
  sealImg,
  iceImg,
  snowflakeLeftImg,
  snowflakeRightImg
];

const firstResultAnimate = (resultCanvas) => {
  const globalBackAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`back`) === -1) {
      animations.push(`back`);
      animate.easing(backOpacityAnimationTick(backOpacity, backOpacityTo), 200, bezierFunc);
      animate.easing(backScaleAnimationTick(backScale, backScaleTo), 567, bezierFunc);
    }
    drawResultCanvas(resultCanvas);
  };
  const globalAirplaneAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`airplane`) === -1) {
      animations.push(`airplane`);
      runSerial(airplaneRotateAnimates);
      animate.easing(airplaneTranslateYAnimationTick(airplaneTranslateYOffsets[0], airplaneTranslateYOffsets[1]), 567, bezierFunc);
      animate.easing(airplaneTranslateXAnimationTick(airplaneTranslateXOffsets[0], airplaneTranslateXOffsets[1]), 567, bezierFunc);
    }
    drawResultCanvas(resultCanvas);
  };
  const globalTreeAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`tree`) === -1) {
      animations.push(`tree`);
      animate.easing(treeOpacityAnimationTick(treeOpacity, treeOpacityTo), 567, bezierFunc);
      animate.easing(treeTranslateYAnimationTick(treeTranslateY, 0), 567, bezierFunc);
      animate.easing(treeSecondOpacityAnimationTick(treeSecondOpacity, treeOpacityTo), 433, bezierFunc);
      animate.easing(treeSecondTranslateYAnimationTick(treeSecondTranslateY, 0), 433, bezierFunc);
    }
    drawResultCanvas(resultCanvas);
  };
  const globalSealTranslateAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`seal-translate`) === -1) {
      animations.push(`seal-translate`);
      runSerial(sealTranslateYAnimates);
    }
    drawResultCanvas(resultCanvas);
  };
  const globalSealRotateAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`seal-rotate`) === -1) {
      animations.push(`seal-rotate`);
      setTimeout(() => {
        runSerial(sealRotateAnimates);
      }, sealRotateDelay);
    }
    drawResultCanvas(resultCanvas);
  };
  const globalSnowFlakeTranslateAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`snowflake`) === -1) {
      animations.push(`snowflake`);
      runSerial(snowflakeLeftTranslateYAnimates);
      runSerial(snowflakeRightTranslateYAnimates);
      setTimeout(() => {
        animate.easing(snowflakeLeftOpacityAnimationTick(snowflakeLeftOpacity, snowflakeLeftOpacityTo), 633, bezierFunc);
      }, snowflakeLeftOpacityDelay);
      setTimeout(() => {
        animate.easing(snowflakeRightOpacityAnimationTick(snowflakeRightOpacity, snowflakeRightOpacityTo), 633, bezierFunc);
      }, snowflakeRightOpacityDelay);
    }
    drawResultCanvas(resultCanvas);
  };

  allImages.forEach((img) => {
    img.onload = () => {
      drawResultCanvas(resultCanvas);
      animate.duration(globalBackAnimationTick, 567);
      animate.duration(globalAirplaneAnimationTick, 567);
      animate.duration(globalTreeAnimationTick, 567);
      animate.duration(globalSealTranslateAnimationTick, 1867);
      animate.duration(globalSealRotateAnimationTick, 1867);
      animate.duration(globalSnowFlakeTranslateAnimationTick, 7000);
    };
  });

  backImg.src = `img/back.png`;
  airplaneImg.src = `img/airplane.png`;
  treeImg.src = `img/tree.png`;
  treeSecondImg.src = `img/tree2.png`;
  sealImg.src = `img/sea-calf.png`;
  iceImg.src = `img/ice.png`;
  snowflakeLeftImg.src = `img/snowflake.png`;
  snowflakeRightImg.src = `img/snowflake.png`;
};

export {firstResultAnimate};
