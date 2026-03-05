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

const storeKey = 'router';
const storevalue = {
  swup: null! as Swup,
  currentPath: window.location.pathname,
  currentHref: window.location.href,
  currentUrl: window.location.pathname + window.location.search,
  currentSearch: window.location.search,

  // init（自動実行）だと無限ループになるので手動で呼び出す
  onStart() {
    this.swup = new Swup({
      linkSelector: 'a[href]',
      linkToSelf: 'scroll',
      animationSelector: '[class*="swup-transition-"]',
      containers: ['#swup'],
      hooks: {
        'page:load': (visit) => {
          // https://swup.js.org/api/properties/#location
          this.currentHref = this.swup.location.href;
          this.currentUrl = this.swup.location.url;
          this.currentPath = this.swup.location.pathname;
          this.currentSearch = this.swup.location.search;
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
          scrollFunction: (_el, top, left, animate, start, end) => {
            if (!animate) {
              start();
              window.scrollTo(left, top);
              end();
              return;
            }
            start();
            Alpine.store('scroll').onScrollTo(top, {
              onComplete: () => {
                end();
              },
            });
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

Alpine.store(storeKey, storevalue);

declare module 'alpinejs' {
  interface Stores {
    [storeKey]: typeof storevalue;
  }
}
