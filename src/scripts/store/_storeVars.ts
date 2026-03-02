/*
CSS変数
*/

import Alpine from 'alpinejs';
import { debounce } from '@/scripts/utils/debounce';

const header = document.getElementById('header');
let headerResizeObserver: ResizeObserver;

const storeKey = 'vars';
const storeValue = {
  vw: 0,
  vh: 0,
  scrollBarWidth: 0,
  headerHeight: 0,

  init() {
    // this.onSetViewportWidth();
    // this.onSetViewportHeight();
    this.onSetScrollBarWidth();
    // this.onSetHeaderHeight();
    // window.addEventListener(
    //   "resize",
    //   debounce(() => {
    //     this.onSetViewportWidth();
    //     this.onSetViewportHeight();
    //   })
    // );
    // if (header) {
    //   headerResizeObserver = new ResizeObserver(
    //     debounce(() => {
    //       this.onSetHeaderHeight();
    //     }),
    //   );
    //   headerResizeObserver.observe(header);
    // }
  },

  //   onSetViewportWidth() {
  //     this.vw = window.innerWidth;
  //     document.documentElement.style.setProperty("--vw", `${this.vw * 0.01}px`);
  //   },

  //   onSetViewportHeight() {
  //     this.vh = window.innerHeight;
  //     document.documentElement.style.setProperty("--vh", `${this.vh * 0.01}px`);
  //   },

  onSetScrollBarWidth() {
    this.scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${this.scrollBarWidth}px`);
  },

  // onSetHeaderHeight() {
  //   this.headerHeight = header ? header.clientHeight : 0;
  //   document.documentElement.style.setProperty('--header-height', `${this.headerHeight}px`);
  // },
};

Alpine.store(storeKey, storeValue);

declare module 'alpinejs' {
  interface Stores {
    [storeKey]: typeof storeValue;
  }
}
