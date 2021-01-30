export default class AnimateBuilder {
  constructor({opacityOffsets, scaleXOffsets, scaleYOffsets, translateXOffsets, translateYOffsets, rotateOffsets}) {
    this.opacityOffsets = opacityOffsets || [];
    this.scaleXOffsets = scaleXOffsets || [];
    this.scaleYOffsets = scaleYOffsets || [];
    this.translateXOffsets = translateXOffsets || [];
    this.translateYOffsets = translateYOffsets || [];
    this.rotateOffsets = rotateOffsets || [];
    this.opacity = this.opacityOffsets[0] || 0;
    this.scaleX = this.scaleXOffsets[0] || 0;
    this.scaleY = this.scaleYOffsets[0] || 0;
    this.translateX = this.translateXOffsets[0] || 0;
    this.translateY = this.translateYOffsets[0] || 0;
    this.rotate = this.rotateOffsets[0] || 0;
  }

  opacityAnimationTick(from, to) {
    return (progress) => {
      this.opacity = from + progress * Math.sign(to - from) * Math.abs(to - from);
    };
  }
  rotateAnimationTick(from, to) {
    return (progress) => {
      this.rotate = from + progress * Math.sign(to - from) * Math.abs(to - from);
    };
  }
  scaleXAnimationTick(from, to) {
    return (progress) => {
      this.scaleX = from + progress * Math.sign(to - from) * Math.abs(to - from);
    };
  }
  scaleYAnimationTick(from, to) {
    return (progress) => {
      this.scaleY = from + progress * Math.sign(to - from) * Math.abs(to - from);
    };
  }
  translateXAnimationTick(from, to) {
    return (progress) => {
      this.translateX = from + progress * Math.sign(to - from) * Math.abs(to - from);
    };
  }
  translateYAnimationTick(from, to) {
    return (progress) => {
      this.translateY = from + progress * Math.sign(to - from) * Math.abs(to - from);
    };
  }
}
