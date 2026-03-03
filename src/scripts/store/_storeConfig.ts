/*
コンフィグ
*/
import Alpine from 'alpinejs';

const defaults = {
  sound: {
    bgm: 0.5,
    effect: 0.5,
  },
  scroll: {
    speed: 0.5,
  },
} as const;

const soundBgmEl = document.getElementById('sound-bgm') as HTMLAudioElement;
const soundSelectEl = document.getElementById('sound-effect-select') as HTMLAudioElement;
const soundDecideEl = document.getElementById('sound-effect-decide') as HTMLAudioElement;

const storeKey = 'config';
const storeValue = {
  theme: 'light',
  anime: true,
  sound: {
    mute: true,
    bgm: defaults.sound.bgm,
    effect: defaults.sound.effect,
  },
  mouse: {
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
      if (this.sound.mute) {
        soundBgmEl.pause();
      } else {
        soundBgmEl.volume = this.sound.bgm;
        soundBgmEl.play();
      }
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
      case 'scroll.speed': {
        this.scroll.speed = defaults.scroll.speed;
        break;
      }
    }
  },

  playSoundSelect() {
    if (this.sound.mute) return;
    soundSelectEl.volume = this.sound.effect;
    soundSelectEl.currentTime = 0;
    soundSelectEl.play();
  },

  playSoundDecide() {
    if (this.sound.mute) return;
    soundDecideEl.volume = this.sound.effect;
    soundDecideEl.currentTime = 0;
    soundDecideEl.play();
  },
};

Alpine.store(storeKey, storeValue);

declare module 'alpinejs' {
  interface Stores {
    [storeKey]: typeof storeValue;
  }
}
