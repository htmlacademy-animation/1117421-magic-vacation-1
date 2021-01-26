import {firstResultAnimate} from "./first-result-animate";
import {thirdResultAnimate} from "./third-result-animate";

export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);
  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        let targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });
        targetEl[0].classList.add(`screen--show`);
        targetEl[0].classList.remove(`screen--hidden`);

        const targetTitle = document.querySelector(`.screen--show .result__title`);
        const targetSvg = targetTitle.querySelector(`svg`);
        const copySvg = targetSvg.cloneNode(true);
        const targetTitlePathList = copySvg.querySelectorAll(`path`);

        targetTitlePathList.forEach((path) => {
          const pathLength = path.getTotalLength();
          path.setAttribute(`stroke-dasharray`, `0 ${pathLength / 3} ${pathLength / 6} ${pathLength / 9} ${pathLength / 3} ${pathLength / 6} ${pathLength / 9}`);

          const pathAnimate = path.querySelector(`.result__anim`);
          pathAnimate.setAttribute(`from`, `0 ${pathLength / 3} ${pathLength / 6} ${pathLength / 9} ${pathLength / 3} ${pathLength / 6} ${pathLength / 9}`);
          pathAnimate.setAttribute(`to`, `0 0 ${pathLength / 2} 0 ${pathLength / 2} 0 ${pathLength / 2}`);
        });

        targetSvg.remove();
        targetTitle.appendChild(copySvg);

        const firstResultPic = targetEl[0].querySelector(`#firstResultPic`);
        const thirdResultPic = targetEl[0].querySelector(`#thirdResultPic`);
        if (firstResultPic) {
          const firstResultAnimateDelay = 300;
          setTimeout(() => {
            firstResultAnimate(firstResultPic);
          }, firstResultAnimateDelay);
        }
        if (thirdResultPic) {
          thirdResultAnimate(thirdResultPic);
        }
      });
    }

    let playBtn = document.querySelector(`.js-play`);
    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }
};
