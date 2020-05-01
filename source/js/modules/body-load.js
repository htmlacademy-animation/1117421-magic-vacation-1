export default () => {
  const bodyWrap = document.querySelector(`body`);
  window.addEventListener(`load`, function () {
    bodyWrap.classList.add(`loaded`);
  });
};
