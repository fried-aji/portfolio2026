/*
スクロール制御
*/

import Alpine from 'alpinejs';
import type { ScrollToOptions } from 'lenis';
import Lenis from 'lenis';
import { Power4 } from 'gsap';
import { linear, easeInOutQuad } from '@/scripts/utils/easing';

const key = 'scroll';
const value = {
  isFixed: false,
  lenis: null! as Lenis,

  // init() {}

  destroy() {
    //
  },

  onStart() {
    this._initLenis();
    Alpine.store('mql').reducedMotion.addEventListener('change', () => {
      this.destroy();
      requestAnimationFrame(() => {
        this._initLenis();
      });
    });
  },

  _initLenis() {
    this.lenis = new Lenis({
      autoRaf: true,
      duration: Alpine.store('mql').isReducedMotion ? 0 : 0.5,
      easing: Alpine.store('mql').isReducedMotion ? linear : Power4.easeOut,
      smoothWheel: Alpine.store('mql').isReducedMotion ? false : true,
    });
  },

  // 背景固定
  onFixed(enable: boolean) {
    this.isFixed = enable;
    document.body.classList.toggle('is-fixed', enable);
  },

  onScrollTo(target: number | string | HTMLElement, options: ScrollToOptions = {}) {
    if (this.lenis) {
      this.lenis.scrollTo(target, {
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
