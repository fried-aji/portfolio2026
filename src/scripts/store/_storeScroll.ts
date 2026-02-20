/*
スクロール制御
*/

import Alpine from 'alpinejs';
import Lenis, { type ScrollToOptions } from 'lenis';
import { linear, easeOutExpo, easeInOutQuad } from '@/scripts/utils/easing';

const key = 'scroll';
const value = {
  lenis: null! as Lenis,
  isFixed: false,

  // init() {}

  destroy() {
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null!;
    }
  },

  onStart() {
    this._initLenis();
    Alpine.store('mql').reducedMotion.addEventListener('change', (e) => {
      this.destroy();
      requestAnimationFrame(() => {
        this._initLenis();
      });
    });
  },

  _initLenis() {
    this.lenis = new Lenis({
      autoRaf: true,
      duration: Alpine.store('mql').isReducedMotion ? 0 : 1.1,
      easing: Alpine.store('mql').isReducedMotion ? linear : easeOutExpo,
      smoothWheel: Alpine.store('mql').isReducedMotion ? false : true,
    });
  },

  // 背景固定
  onFixed(enable: boolean) {
    this.isFixed = enable;
    document.body.classList.toggle('is-fixed', enable);
    if (enable) {
      this.lenis.stop();
    } else {
      this.lenis.start();
    }
  },

  onScrollTo(target: number | string | HTMLElement, options: ScrollToOptions = {}) {
    if (this.lenis) {
      this.lenis.scrollTo(target, {
        // offset: options.offset || -Alpine.store("vars").headerHeight,
        offset: options.offset || 0,
        duration: options.duration || 0.8,
        easing: options.easing || easeInOutQuad,
        lock: options.lock || true,
        ...options,
      });
    }
  },
};

Alpine.store(key, value);

declare module 'alpinejs' {
  interface Stores {
    [key]: typeof value;
  }
}
