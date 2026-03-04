/*
スクロール制御
*/

import Alpine from 'alpinejs';
import type { ScrollToOptions } from 'lenis';
import Lenis from 'lenis';
import { Power4 } from 'gsap';
import { linear, easeInOutQuad } from '@/scripts/utils/easing';

const storeKey = 'scroll';
const storeValue = {
  isFixed: false,
  lenis: null! as Lenis,

  // init() {}

  // destroy() {},

  onStart() {
    Alpine.effect(() => {
      const anime = Alpine.store('config').anime;
      const speedFactor = Alpine.store('config').scroll.speed;

      requestAnimationFrame(() => {
        if (this.lenis) {
          this.lenis.destroy();
          this.lenis = null!;
        }
        this.lenis = new Lenis({
          autoRaf: true,
          duration: anime ? speedFactor : 0,
          easing: anime ? Power4.easeOut : linear,
          smoothWheel: anime,
        });
      });
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
        offset: options.offset || 0,
        duration: options.duration || 0.8,
        easing: options.easing || easeInOutQuad,
        lock: options.lock || true,
        ...options,
      });
    }
  },
};

Alpine.store(storeKey, storeValue);

declare module 'alpinejs' {
  interface Stores {
    [storeKey]: typeof storeValue;
  }
}
