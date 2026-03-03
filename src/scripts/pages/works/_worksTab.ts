import Alpine from 'alpinejs';
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from 'embla-carousel';

Alpine.data('worksTab', (id: string) => {
  let emblaApi: EmblaCarouselType;

  return {
    currentIndex: 0,

    init() {
      // クエリパラメータをチェックしてcurrentIndexを設定
      //   const params = new URLSearchParams(window.location.search);
      //   const tabParam = params.get('tab');
      //   const indexParam = params.get('index');
      //   if (tabParam === id && indexParam !== null) {
      //     const index = Number.parseInt(indexParam, 10);
      //     if (!Number.isNaN(index) && index >= 0) {
      //       this.currentIndex = index;
      //     }
      //   }

      this._initCarousel();

      this.$watch('$store.mql.isMD', (mql) => {
        if (mql) {
          this._destroyCarousel();
        } else {
          this._initCarousel();
        }
      });

      // 視差効果
      this.$watch('$store.config.anime', () => {
        this._destroyCarousel();
        requestAnimationFrame(() => {
          this._initCarousel();
        });
      });
    },

    destroy() {
      this._destroyCarousel();
    },

    _initCarousel() {
      if (emblaApi) return;
      if (this.$store.mql.isMD) return;
      const option: EmblaOptionsType = {
        active: true,
        align: 'center',
        loop: true,
        duration: this.$store.config.anime ? 20 : 0,
        breakpoints: {
          '(width >= 800px)': {
            active: false,
          },
        },
      };

      emblaApi = EmblaCarousel(this.$refs.tabControl, option);
    },

    _destroyCarousel() {
      if (emblaApi) {
        emblaApi.destroy();
        emblaApi = null!;
      }
    },

    async onTabChange(index: number) {
      if (this.currentIndex === index) return;
      this.currentIndex = index;
      if (emblaApi) {
        emblaApi.scrollTo(this.currentIndex);
      }

      // クエリパラメータを更新
      //   const params = new URLSearchParams(window.location.search);
      //   params.set('tab', id);
      //   params.set('index', index.toString());
      //   const newUrl = `${window.location.pathname}?${params.toString()}`;
      //   window.history.pushState({}, '', newUrl);
    },

    // x-bind
    tab(index: number) {
      return {
        [':aria-selected']: () => {
          return this.currentIndex === index;
        },

        [':tabindex']: () => {
          return this.currentIndex === index ? '0' : '-1';
        },

        ['@click']: () => {
          this.onTabChange(index);
          this.$store.config.playSoundDecide();
        },

        ['@keyup']: (event: KeyboardEvent) => {
          const parentEl = (this.$el as Element).parentElement;
          if (!parentEl) return;

          switch (event.key) {
            case 'ArrowRight': {
              const nextIndex = (index + 1) % parentEl.children.length;
              (parentEl.children[nextIndex] as HTMLElement).focus();
              this.onTabChange(nextIndex);
              break;
            }
            case 'ArrowLeft': {
              const prevIndex = (index - 1 + parentEl.children.length) % parentEl.children.length;
              (parentEl.children[prevIndex] as HTMLElement).focus();
              this.onTabChange(prevIndex);
              break;
            }
            case 'Home': {
              (parentEl.children[0] as HTMLElement).focus();
              this.onTabChange(0);
              break;
            }
            case 'End': {
              const lastIndex = parentEl.children.length - 1;
              (parentEl.children[lastIndex] as HTMLElement).focus();
              this.onTabChange(lastIndex);
              break;
            }
            default: {
              break;
            }
          }
        },

        '@mouseenter': () => {
          if (this.$store.device.isTouchDevice) return;
          this.$store.config.playSoundSelect();
        },
      };
    },

    tabpanel(index: number) {
      return {
        ['x-show']: () => {
          return this.currentIndex == index;
        },
        ['x-transition:enter-start']: () => {
          return 'is-hidden';
        },
        ['x-transition:enter-end']: () => {
          return 'is-show';
        },
        ['x-transition:leave-start']: () => {
          return 'is-show';
        },
        ['x-transition:leave-end']: () => {
          return 'is-hidden';
        },
      };
    },
  };
});
