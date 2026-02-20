/*
デバイス情報
*/
import Alpine from 'alpinejs';

const key = 'device';
const value = {
  // タッチデバイス
  isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  // iOS
  isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
  // Android
  isAndroid: /Android/.test(navigator.userAgent),
  // Safari
  isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
  // Firefox
  isFirefox: navigator.userAgent.toLowerCase().includes('firefox'),
  // Edge
  isEdge: /Edg/.test(navigator.userAgent),
  // Chrome
  isChrome: /Chrome/.test(navigator.userAgent) && !/Edg/.test(navigator.userAgent),

  init() {
    const classNameList = {
      'is-touch-device': this.isTouchDevice,
      'is-ios': this.isIOS,
      'is-android': this.isAndroid,
      'is-safari': this.isSafari,
      'is-firefox': this.isFirefox,
      'is-edge': this.isEdge,
      'is-chrome': this.isChrome,
    };

    for (const [className, isActive] of Object.entries(classNameList)) {
      if (isActive) {
        document.documentElement.classList.add(className);
      }
    }
  },
};

Alpine.store(key, value);

declare module 'alpinejs' {
  interface Stores {
    [key]: typeof value;
  }
}
