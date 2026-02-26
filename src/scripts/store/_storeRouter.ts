/*
ルーター
https://swup.js.org/getting-started/
*/

import type { Visit } from 'swup';
import Alpine from 'alpinejs';
import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupScrollPlugin from '@swup/scroll-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';

const key = 'router';
const value = {
  swup: null! as Swup,
  // URL
  currentPath: window.location.pathname,
  currentHref: window.location.href,
  currentUrl: window.location.pathname + window.location.search,
  // 遷移状態
  isTransitioning: false,

  // init（自動実行）だと無限ループになるので手動で呼び出す
  onStart() {
    this.swup = new Swup({
      linkSelector: 'a[href]',
      linkToSelf: 'scroll',
      animationSelector: '[class*="swup-transition-"]',
      containers: ['#swup'],
      /*
      フック呼び出し
      https://swup.js.org/hooks/
      */
      hooks: {
        'visit:start': () => {
          this.isTransitioning = true;
        },
        'visit:end': () => {
          this.isTransitioning = false;
        },
        'page:load': (visit) => {
          // https://swup.js.org/api/properties/#location
          this.currentHref = this.swup.location.href;
          this.currentUrl = this.swup.location.url;
          this.currentPath = this.swup.location.pathname;
        },
      },
      plugins: [
        new SwupHeadPlugin({
          awaitAssets: true,
        }),
        new SwupScrollPlugin({
          doScrollingRightAway: true,
          offset: () => 0,
          animateScroll: {
            betweenPages: false,
            samePageWithHash: !Alpine.store('mql').isReducedMotion,
            samePage: !Alpine.store('mql').isReducedMotion,
          },
        }),
        new SwupPreloadPlugin(),
      ],
    });
  },

  // aria-current属性管理用メソッド
  onAriaCurrent(href: string) {
    const currentPathArray = this.currentPath.split('/').filter(Boolean);
    const hrefPath = new URL(href, window.location.origin).pathname;
    const hrefArray = hrefPath.split('/').filter(Boolean);

    if (this.currentPath === hrefPath) {
      return 'page';
    } else if (hrefArray.length > 0 && hrefArray.every((item, i) => currentPathArray[i] === item)) {
      return 'true';
    } else {
      return;
    }
  },
};

Alpine.store(key, value);

declare module 'alpinejs' {
  interface Stores {
    [key]: typeof value;
  }
}
