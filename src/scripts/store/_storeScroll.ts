/*
スクロール制御
*/

import Alpine from 'alpinejs';
import gsap from 'gsap';

const key = 'scroll';
const value = {
  isFixed: false,

  // init() {}

  destroy() {
    //
  },

  // 背景固定
  onFixed(enable: boolean) {
    this.isFixed = enable;
    document.body.classList.toggle('is-fixed', enable);
  },
};

Alpine.store(key, value);

declare module 'alpinejs' {
  interface Stores {
    [key]: typeof value;
  }
}
