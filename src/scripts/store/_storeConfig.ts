/*
コンフィグ
*/
import Alpine from 'alpinejs';

const defaults = {
  sound: {
    bgm: 0.5,
    effect: 0.5,
  },
  mouse: {
    speed: 0.5,
  },
  scroll: {
    speed: 0.5,
  },
} as const;

const storeKey = 'config';

const storeValue = {
  theme: 'light',
  anime: true,
  sound: {
    bgm: defaults.sound.bgm,
    effect: defaults.sound.effect,
    mute: false,
  },
  mouse: {
    speed: defaults.mouse.speed,
    design: 'normal',
  },
  scroll: {
    speed: defaults.scroll.speed,
  },

  init() {
    const html = document.documentElement;

    Alpine.effect(() => {
      html.dataset['theme'] = this.theme;
      html.dataset['animation'] = `${this.anime}`;
      html.dataset['cursor'] = `${this.mouse.design}`;
    });
  },

  reset(key: string) {
    switch (key) {
      case 'sound.bgm': {
        this.sound.bgm = defaults.sound.bgm;
        break;
      }
      case 'sound.effect': {
        this.sound.effect = defaults.sound.effect;
        break;
      }
      case 'mouse.speed': {
        this.mouse.speed = defaults.mouse.speed;
        break;
      }
      case 'scroll.speed': {
        this.scroll.speed = defaults.scroll.speed;
        break;
      }
    }
  },
};

Alpine.store(storeKey, storeValue);

declare module 'alpinejs' {
  interface Stores {
    [storeKey]: typeof storeValue;
  }
}
