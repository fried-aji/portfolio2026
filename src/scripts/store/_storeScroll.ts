/*
スクロール制御
*/

import Alpine from 'alpinejs';
import type { ScrollToOptions } from 'lenis';
import Lenis from 'lenis';
import { Power1, Power4 } from 'gsap';
import { linear } from '@/scripts/utils/easing';

const storeKey = 'scroll';
const storeValue = {
  isFixed: false,
  lenis: null! as Lenis,

  // init() {}

  // destroy() {},

  onStart() {
    this._initLenis();

    if (this.lenis) {
      Alpine.effect(() => {
        const anime = Alpine.store('config').anime;
        const speedFactor = Alpine.store('config').scroll.speed;

        requestAnimationFrame(() => {
          if (this.lenis) {
            this.lenis.destroy();
            this.lenis = null!;
          }
          this._initLenis(anime, speedFactor);
        });
      });
    }
  },

  _initLenis(
    //
    anime: boolean = Alpine.store('config').anime,
    speedFactor: number = Alpine.store('config').scroll.speed,
  ) {
    this.lenis = new Lenis({
      autoRaf: true,
      duration: anime ? speedFactor : 0,
      easing: anime ? Power4.easeOut : linear,
      smoothWheel: anime,
    });
  },

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
        duration: options.duration || 0.5,
        easing: options.easing || Power1.easeInOut,
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
