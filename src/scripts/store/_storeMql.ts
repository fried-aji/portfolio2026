/*
メディアクエリ
*/
import Alpine from 'alpinejs';

const key = 'mql';
const value = {
  // ブレイクポイント
  XXL: window.matchMedia('(width >= 1440px)'),
  XL: window.matchMedia('(width >= 1280px)'),
  LG: window.matchMedia('(width >= 1024px)'),
  MD: window.matchMedia('(width >= 768px)'),
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
    this.XXL.addEventListener('change', this.onMatch.bind(this));
    this.XL.addEventListener('change', this.onMatch.bind(this));
    this.LG.addEventListener('change', this.onMatch.bind(this));
    this.MD.addEventListener('change', this.onMatch.bind(this));
    this.XS.addEventListener('change', this.onMatch.bind(this));
    this.reducedMotion.addEventListener('change', this.onMatch.bind(this));
  },

  onMatch() {
    this.isXXL = this.XXL.matches;
    this.isXL = this.XL.matches;
    this.isLG = this.LG.matches;
    this.isMD = this.MD.matches;
    this.isXS = this.XS.matches;
    this.isReducedMotion = this.reducedMotion.matches;
  },
};

Alpine.store(key, value);

declare module 'alpinejs' {
  interface Stores {
    [key]: typeof value;
  }
}
