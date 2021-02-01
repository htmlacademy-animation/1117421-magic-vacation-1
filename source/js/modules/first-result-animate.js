import {runSerial, runSerialLoop} from "../helpers/promise";
import animate from "../helpers/animate";
import {bezierEasing} from "../helpers/cubic-bezier";
import AnimateBuilder from "../helpers/animate-builder";

const rotateObject = (ctx, angle, cx, cy) => {
  ctx.translate(cx, cy);
  ctx.rotate((Math.PI / 180) * angle);
  ctx.translate(-cx, -cy);
};
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const wFactorMin = 0.4;
const wFactor = Math.max(windowWidth / 1440, wFactorMin);
const hFactor = windowHeight / 760;
const sizes = {
  back: {
    width: 586 * wFactor,
    height: 324 * wFactor,
    deltaX: -18 * wFactor,
    deltaY: -183 * wFactor
  },
  airplane: {
    width: 82 * wFactor,
    height: 79 * wFactor,
    deltaX: 556 * wFactor,
    deltaY: -145 * wFactor
  },
  tree: {
    width: 50 * wFactor,
    height: 159 * wFactor,
    deltaX: 267 * wFactor,
    deltaY: -119 * wFactor
  },
  treeSecond: {
    width: 38 * wFactor,
    height: 101 * wFactor,
    deltaX: 313 * wFactor,
    deltaY: -61 * wFactor
  },
  ice: {
    width: 408 * wFactor,
    height: 167 * wFactor
  },
  seal: {
    width: 271 * wFactor,
    height: 212 * wFactor,
    deltaX: 86 * wFactor,
    deltaY: -106 * wFactor
  },
  snowflakeLeft: {
    width: 119 * wFactor,
    height: 141 * wFactor,
    deltaX: -103 * wFactor,
    deltaY: -101 * wFactor
  },
  snowflakeRight: {
    width: 94 * wFactor,
    height: 111 * wFactor,
    deltaX: 387 * wFactor,
    deltaY: -10 * wFactor
  },
};
const startPoint = {
  x: Math.round((windowWidth - sizes.ice.width) / 2),
  y: windowHeight - 300 * hFactor
};
const animations = [];
const bezierFunc = bezierEasing(0.33, 0, 0.67, 1);

// параметры анимации для следа от самолета
const backAnimateBuilder = new AnimateBuilder({
  opacityOffsets: [0, 1],
  scaleXOffsets: [0, 1],
  scaleYOffsets: [0, 1]}
);

// параметры анимации для самолета
const airplaneAnimateBuilder = new AnimateBuilder({
  rotateOffsets: [63, 74, 63, 0],
  translateYOffsets: [-63 * wFactor, 0],
  translateXOffsets: [-397 * wFactor, 0]}
);
const airplaneRotateAnimates = [
  () => animate.easing(airplaneAnimateBuilder.rotateAnimationTick(airplaneAnimateBuilder.rotateOffsets[0], airplaneAnimateBuilder.rotateOffsets[1]), 133, bezierFunc),
  () => animate.easing(airplaneAnimateBuilder.rotateAnimationTick(airplaneAnimateBuilder.rotateOffsets[1], airplaneAnimateBuilder.rotateOffsets[2]), 67, bezierFunc),
  () => animate.easing(airplaneAnimateBuilder.rotateAnimationTick(airplaneAnimateBuilder.rotateOffsets[2], airplaneAnimateBuilder.rotateOffsets[3]), 367, bezierFunc),
];

// параметры анимации для дерева
const treeAnimateBuilder = new AnimateBuilder({
  opacityOffsets: [0, 1],
  translateYOffsets: [200 * wFactor, 0]}
);
const treeSecondAnimateBuilder = new AnimateBuilder({
  opacityOffsets: [0, 1],
  translateYOffsets: [120 * wFactor, 0]}
);

// параметры анимации для снежинки
const snowflakeLeftAnimateBuilder = new AnimateBuilder({
  opacityOffsets: [0, 1],
  translateYOffsets: [-10, 10]}
);
const snowflakeRightAnimateBuilder = new AnimateBuilder({
  opacityOffsets: [0, 1],
  translateYOffsets: [10, -10]}
);
const snowflakeLeftOpacityDelay = 150;
const snowflakeRightOpacityDelay = 200;
const snowflakeLeftTranslateYAnimates = [
  () => animate.easing(snowflakeLeftAnimateBuilder.translateYAnimationTick(snowflakeLeftAnimateBuilder.translateYOffsets[0], snowflakeLeftAnimateBuilder.translateYOffsets[1]), 1167, bezierFunc),
  () => animate.easing(snowflakeLeftAnimateBuilder.translateYAnimationTick(snowflakeLeftAnimateBuilder.translateYOffsets[1], snowflakeLeftAnimateBuilder.translateYOffsets[0]), 1167, bezierFunc),
];
const snowflakeRightTranslateYAnimates = [
  () => animate.easing(snowflakeRightAnimateBuilder.translateYAnimationTick(snowflakeRightAnimateBuilder.translateYOffsets[0], snowflakeRightAnimateBuilder.translateYOffsets[1]), 1167, bezierFunc),
  () => animate.easing(snowflakeRightAnimateBuilder.translateYAnimationTick(snowflakeRightAnimateBuilder.translateYOffsets[1], snowflakeRightAnimateBuilder.translateYOffsets[0]), 1167, bezierFunc),
];
// параметры анимации для моржа на льдине
const sealAnimateBuilder = new AnimateBuilder({
  rotateOffsets: [20, -4, 5, -4, 1, 0],
  translateYOffsets: [560 * wFactor, -26, 21, -12, 11, -7, 0]}
);
const sealRotateDelay = 300;
const sealTranslateYAnimates = [
  () => animate.easing(sealAnimateBuilder.translateYAnimationTick(sealAnimateBuilder.translateYOffsets[0], sealAnimateBuilder.translateYOffsets[1]), 367, bezierFunc),
  () => animate.easing(sealAnimateBuilder.translateYAnimationTick(sealAnimateBuilder.translateYOffsets[1], sealAnimateBuilder.translateYOffsets[2]), 267, bezierFunc),
  () => animate.easing(sealAnimateBuilder.translateYAnimationTick(sealAnimateBuilder.translateYOffsets[2], sealAnimateBuilder.translateYOffsets[3]), 267, bezierFunc),
  () => animate.easing(sealAnimateBuilder.translateYAnimationTick(sealAnimateBuilder.translateYOffsets[3], sealAnimateBuilder.translateYOffsets[4]), 267, bezierFunc),
  () => animate.easing(sealAnimateBuilder.translateYAnimationTick(sealAnimateBuilder.translateYOffsets[4], sealAnimateBuilder.translateYOffsets[5]), 300, bezierFunc),
  () => animate.easing(sealAnimateBuilder.translateYAnimationTick(sealAnimateBuilder.translateYOffsets[5], sealAnimateBuilder.translateYOffsets[6]), 400, bezierFunc)
];
const sealRotateAnimates = [
  () => animate.easing(sealAnimateBuilder.rotateAnimationTick(sealAnimateBuilder.rotateOffsets[0], sealAnimateBuilder.rotateOffsets[1]), 267, bezierFunc),
  () => animate.easing(sealAnimateBuilder.rotateAnimationTick(sealAnimateBuilder.rotateOffsets[1], sealAnimateBuilder.rotateOffsets[2]), 267, bezierFunc),
  () => animate.easing(sealAnimateBuilder.rotateAnimationTick(sealAnimateBuilder.rotateOffsets[2], sealAnimateBuilder.rotateOffsets[3]), 267, bezierFunc),
  () => animate.easing(sealAnimateBuilder.rotateAnimationTick(sealAnimateBuilder.rotateOffsets[3], sealAnimateBuilder.rotateOffsets[4]), 300, bezierFunc),
  () => animate.easing(sealAnimateBuilder.rotateAnimationTick(sealAnimateBuilder.rotateOffsets[4], sealAnimateBuilder.rotateOffsets[5]), 400, bezierFunc),
];

const drawResultCanvas = (resultCanvas) => {
  const resultContext = resultCanvas.getContext(`2d`);
  resultCanvas.width = windowWidth;
  resultCanvas.height = windowHeight;
  resultContext.clearRect(0, 0, windowWidth, windowHeight);
  resultContext.save();

  // рисуем след от самолета
  resultContext.globalAlpha = backAnimateBuilder.opacity;
  resultContext.drawImage(
      backImg,
      startPoint.x + sizes.back.deltaX,
      startPoint.y + sizes.back.deltaY,
      sizes.back.width * backAnimateBuilder.scaleX,
      sizes.back.height * backAnimateBuilder.scaleY);

  // рисуем самолет
  rotateObject(
      resultContext,
      airplaneAnimateBuilder.rotate,
      startPoint.x + sizes.airplane.deltaX + airplaneAnimateBuilder.translateX,
      startPoint.y + sizes.airplane.deltaY + airplaneAnimateBuilder.translateY);
  resultContext.drawImage(
      airplaneImg,
      startPoint.x + sizes.airplane.deltaX + airplaneAnimateBuilder.translateX,
      startPoint.y + sizes.airplane.deltaY + airplaneAnimateBuilder.translateY,
      sizes.airplane.width,
      sizes.airplane.height);
  resultContext.restore();
  resultContext.save();

  // рисуем деревья
  resultContext.globalAlpha = treeAnimateBuilder.opacity;
  resultContext.drawImage(
      treeImg,
      startPoint.x + sizes.tree.deltaX,
      startPoint.y + sizes.tree.deltaY + treeAnimateBuilder.translateY,
      sizes.tree.width,
      sizes.tree.height);
  resultContext.restore();
  resultContext.save();

  resultContext.globalAlpha = treeSecondAnimateBuilder.opacity;
  resultContext.drawImage(
      treeSecondImg,
      startPoint.x + sizes.treeSecond.deltaX,
      startPoint.y + sizes.treeSecond.deltaY + treeSecondAnimateBuilder.translateY,
      sizes.treeSecond.width,
      sizes.treeSecond.height);
  resultContext.restore();
  resultContext.save();

  // рисуем моржа на льдине
  rotateObject(resultContext, sealAnimateBuilder.rotate, startPoint.x, startPoint.y);
  resultContext.drawImage(
      iceImg,
      startPoint.x,
      startPoint.y + sealAnimateBuilder.translateY,
      sizes.ice.width,
      sizes.ice.height);
  resultContext.drawImage(
      sealImg,
      startPoint.x + sizes.seal.deltaX,
      startPoint.y + sealAnimateBuilder.translateY + sizes.seal.deltaY,
      sizes.seal.width,
      sizes.seal.height);
  resultContext.restore();
  resultContext.save();

  // рисуем снежинки
  resultContext.globalAlpha = snowflakeLeftAnimateBuilder.opacity;
  resultContext.drawImage(
      snowflakeLeftImg,
      startPoint.x + sizes.snowflakeLeft.deltaX,
      startPoint.y + sizes.snowflakeLeft.deltaY + snowflakeLeftAnimateBuilder.translateY,
      sizes.snowflakeLeft.width,
      sizes.snowflakeLeft.height);
  resultContext.restore();
  resultContext.save();

  resultContext.globalAlpha = snowflakeRightAnimateBuilder.opacity;
  resultContext.drawImage(
      snowflakeRightImg,
      startPoint.x + sizes.snowflakeRight.deltaX,
      startPoint.y + sizes.snowflakeRight.deltaY + snowflakeRightAnimateBuilder.translateY,
      sizes.snowflakeRight.width,
      sizes.snowflakeRight.height);
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
      animate.easing(backAnimateBuilder.opacityAnimationTick(backAnimateBuilder.opacityOffsets[0], backAnimateBuilder.opacityOffsets[1]), 200, bezierFunc);
      animate.easing(backAnimateBuilder.scaleXAnimationTick(backAnimateBuilder.scaleXOffsets[0], backAnimateBuilder.scaleXOffsets[1]), 567, bezierFunc);
      animate.easing(backAnimateBuilder.scaleYAnimationTick(backAnimateBuilder.scaleYOffsets[0], backAnimateBuilder.scaleYOffsets[1]), 567, bezierFunc);
    }
    drawResultCanvas(resultCanvas);
  };
  const globalAirplaneAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`airplane`) === -1) {
      animations.push(`airplane`);
      runSerial(airplaneRotateAnimates);
      animate.easing(airplaneAnimateBuilder.translateYAnimationTick(airplaneAnimateBuilder.translateYOffsets[0], airplaneAnimateBuilder.translateYOffsets[1]), 567, bezierFunc);
      animate.easing(airplaneAnimateBuilder.translateXAnimationTick(airplaneAnimateBuilder.translateXOffsets[0], airplaneAnimateBuilder.translateXOffsets[1]), 567, bezierFunc);
    }
    drawResultCanvas(resultCanvas);
  };
  const globalTreeAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`tree`) === -1) {
      animations.push(`tree`);
      animate.easing(treeAnimateBuilder.opacityAnimationTick(treeAnimateBuilder.opacityOffsets[0], treeAnimateBuilder.opacityOffsets[1]), 567, bezierFunc);
      animate.easing(treeAnimateBuilder.translateYAnimationTick(treeAnimateBuilder.translateYOffsets[0], treeAnimateBuilder.translateYOffsets[1]), 567, bezierFunc);
      animate.easing(treeSecondAnimateBuilder.opacityAnimationTick(treeSecondAnimateBuilder.opacityOffsets[0], treeSecondAnimateBuilder.opacityOffsets[1]), 433, bezierFunc);
      animate.easing(treeSecondAnimateBuilder.translateYAnimationTick(treeSecondAnimateBuilder.translateYOffsets[0], treeSecondAnimateBuilder.translateYOffsets[1]), 433, bezierFunc);
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
  const globalSnowFlakeLeftOpacityAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`snowflake-left`) === -1) {
      animations.push(`snowflake-left`);
      setTimeout(() => {
        animate.easing(snowflakeLeftAnimateBuilder.opacityAnimationTick(snowflakeLeftAnimateBuilder.opacityOffsets[0], snowflakeLeftAnimateBuilder.opacityOffsets[1]), 633, bezierFunc);
      }, snowflakeLeftOpacityDelay);
    }
    drawResultCanvas(resultCanvas);
  };
  const globalSnowFlakeRightOpacityAnimationTick = (globalProgress) => {
    if (globalProgress >= 0 && animations.indexOf(`snowflake-right`) === -1) {
      animations.push(`snowflake-right`);
      setTimeout(() => {
        animate.easing(snowflakeRightAnimateBuilder.opacityAnimationTick(snowflakeRightAnimateBuilder.opacityOffsets[0], snowflakeRightAnimateBuilder.opacityOffsets[1]), 633, bezierFunc);
      }, snowflakeRightOpacityDelay);
    }
    drawResultCanvas(resultCanvas);
  };
  const globalSnowFlakeTranslateAnimationTick = (globalProgress) => {
    if (globalProgress >= 0) {
      runSerial(snowflakeRightTranslateYAnimates);
      runSerial(snowflakeLeftTranslateYAnimates);
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
      animate.duration(globalSnowFlakeLeftOpacityAnimationTick, 633);
      animate.duration(globalSnowFlakeRightOpacityAnimationTick, 633);
      const globalSnowflakeAnimates = [
        () => animate.duration(globalSnowFlakeTranslateAnimationTick, 2334)
      ];
      runSerialLoop(globalSnowflakeAnimates);
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
