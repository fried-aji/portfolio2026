/*
コンフィグ
*/
import Alpine from 'alpinejs';

const key = 'config';
const value = {
  theme: 'light',
  anime: true,
  sound: {
    bgm: '0.5',
    effect: '0.5',
    mute: false,
  },
  mouse: {
    speed: '0.5',
    design: 'normal',
  },
  scroll: {
    speed: '0.5',
  },

  init() {
    const html = document.documentElement;

    Alpine.effect(() => {
      html.dataset['theme'] = this.theme;
    });
  },
};

Alpine.store(key, value);

declare module 'alpinejs' {
  interface Stores {
    [key]: typeof value;
  }
}
