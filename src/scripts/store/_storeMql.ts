/*
メディアクエリ
*/
import Alpine from 'alpinejs';

const storeKey = 'mql';
const storeValue = {
  // ブレイクポイント
  XL: window.matchMedia('(width >= 1280px)'),
  LG: window.matchMedia('(width >= 1024px)'),
  MD: window.matchMedia('(width >= 800px)'),
  XS: window.matchMedia('(width >= 400px)'),
  // 視差効果
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
  // フラグ
  isXXL: false,
  isXL: false,
  isLG: false,
  isMD: false,
  isXS: false,
  isReducedMotion: false,

  init() {
    this.onMatch();
    this.XL.addEventListener('change', () => {
      this.isXL = this.XL.matches;
    });
    this.LG.addEventListener('change', () => {
      this.isLG = this.LG.matches;
    });
    this.MD.addEventListener('change', () => {
      this.isMD = this.MD.matches;
    });
    this.XS.addEventListener('change', () => {
      this.isXS = this.XS.matches;
    });
    this.reducedMotion.addEventListener('change', () => {
      this.isReducedMotion = this.reducedMotion.matches;
      Alpine.store('config').anime = !this.reducedMotion.matches;
    });
  },

  onMatch() {
    this.isXL = this.XL.matches;
    this.isLG = this.LG.matches;
    this.isMD = this.MD.matches;
    this.isXS = this.XS.matches;
    this.isReducedMotion = this.reducedMotion.matches;
    Alpine.store('config').anime = !this.reducedMotion.matches;
  },
};

Alpine.store(storeKey, storeValue);

declare module 'alpinejs' {
  interface Stores {
    [storeKey]: typeof storeValue;
  }
}
