import Alpine from 'alpinejs';
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from 'embla-carousel';

Alpine.data('carousel', () => {
  let emblaApi: EmblaCarouselType;
  let slideNodes: HTMLElement[];

  return {
    currentIndex: 0,
    slidesNotInView: [] as number[],
    originalSlideCount: 0,

    init() {
      this._initCarousel();

      // 視差効果
      this.$watch('$store.config.anime', () => {
        this.destroy();
        requestAnimationFrame(() => {
          this._initCarousel();
        });
      });
    },

    destroy() {
      if (emblaApi) {
        emblaApi.destroy();
        emblaApi = null!;
        slideNodes = [];
        this.currentIndex = 0;
        this.slidesNotInView = [];
      }
    },

    _initCarousel() {
      if (!this.$refs.viewport) return;

      const option: EmblaOptionsType = {
        loop: true,
        duration: this.$store.config.anime ? 20 : 0,
      };

      emblaApi = EmblaCarousel(this.$refs.viewport, option);
      slideNodes = emblaApi.slideNodes();
      this.originalSlideCount = slideNodes.length;

      emblaApi?.on('select', () => {
        const selectedIndex = emblaApi?.selectedScrollSnap() || 0;
        this.currentIndex = this.originalSlideCount > 0 ? selectedIndex % this.originalSlideCount : 0;
      });
      emblaApi?.on('slidesInView', () => {
        this.slidesNotInView = emblaApi?.slidesNotInView() || [];
      });
    },

    onPrev() {
      emblaApi?.scrollPrev();
    },

    onNext() {
      emblaApi?.scrollNext();
    },

    // bind
    bindPagenation(index: number) {
      return {
        ['@click']: (e: MouseEvent) => {
          e.preventDefault();
          emblaApi?.scrollTo(index);
        },

        [':aria-selected']: () => {
          return this.currentIndex === index;
        },

        [':tabindex']: () => {
          return this.currentIndex === index ? '0' : '-1';
        },

        ['@keyup']: (e: KeyboardEvent) => {
          e.preventDefault();
          switch (e.key) {
            case 'ArrowRight': {
              this.onNext();
              break;
            }
            case 'ArrowLeft': {
              this.onPrev();
              break;
            }
            case 'Home': {
              emblaApi?.scrollTo(0);
              break;
            }
            case 'End': {
              emblaApi?.scrollTo(emblaApi.scrollSnapList().length - 1);
              break;
            }
            default: {
              break;
            }
          }
        },
      };
    },

    bindSlide(index: number) {
      return {
        [':aria-hidden']: () => {
          return this.slidesNotInView.includes(index);
        },
      };
    },
  };
});
