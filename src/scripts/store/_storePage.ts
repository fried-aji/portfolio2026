/*
ページ情報
*/
import Alpine from 'alpinejs';

const storeKey = 'page';
const storeValue = {
  isSettingSound: false,

  init() {
    //
  },
};

Alpine.store(storeKey, storeValue);

declare module 'alpinejs' {
  interface Stores {
    [storeKey]: typeof storeValue;
  }
}
