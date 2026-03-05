/*
CSS変数
*/

import Alpine from 'alpinejs';
import { debounce } from '@/scripts/utils/debounce';

const header = document.getElementById('header');
let headerResizeObserver: ResizeObserver;

const storeKey = 'vars';
const storeValue = {
  scrollBarWidth: 0,

  init() {
    this.onSetScrollBarWidth();
  },

  onSetScrollBarWidth() {
    this.scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${this.scrollBarWidth}px`);
  },
};

Alpine.store(storeKey, storeValue);

declare module 'alpinejs' {
  interface Stores {
    [storeKey]: typeof storeValue;
  }
}
