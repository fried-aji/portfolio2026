import Alpine from 'alpinejs';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
gsap.registerPlugin(CustomEase);

Alpine.data('home', () => {
  let viImage: HTMLElement;
  let timeline: gsap.core.Timeline;
  let xTo: gsap.QuickToFunc;
  let yTo: gsap.QuickToFunc;
  let cachedRect: DOMRect;
  const maxRot = 4;

  return {
    isMagnetReady: false,

    init() {
      const itemEl = this.$el.querySelectorAll<HTMLElement>('[data-item]');
      if (!this.$store.config.anime) {
        for (const item of itemEl) {
          item.dataset.show = '';
        }
        this.$refs.viTransitionMd.remove();
        this.$refs.viTransitionSm.remove();
        return;
      }
      const lineMd = this.$refs.viTransitionMd.querySelectorAll('[data-line]');
      const lineSm = this.$refs.viTransitionSm.querySelectorAll('[data-line]');
      const bg = document.getElementById('bg') as HTMLElement;
      const bgAnime = bg.querySelector('[data-anime]');
      const bgBase = bg.querySelector('[data-base]');
      const header = document.getElementById('header');
      const calendar = document.getElementById('home-calendar');

      const lineKeyframes = {
        '0%': {
          scaleX: 0,
          xPercent: -100,
          opacity: 1,
        },
        '50%': {
          scaleX: 1,
          xPercent: 0,
          opacity: 1,
          ease: 'power1.out',
        },
        '100%': {
          scaleX: 0,
          xPercent: 100,
          opacity: 0,
          ease: 'power1.in',
        },
      };

      timeline = gsap.timeline({
        paused: true,
      });

      if (this.$store.page.isHomeLoading) {
        timeline.fromTo(
          itemEl,
          {
            clipPath: (index: number) => (index % 2 === 0 ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)'),
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.65,
            ease: 'power4.out',
            stagger: {
              each: 0.03,
              onStart(this: gsap.core.Tween) {
                (this.targets()[0] as HTMLElement).dataset.show = '';
              },
            },
            onComplete: () => {
              gsap.set(itemEl, {
                clearProps: 'clipPath',
              });
            },
          },
        );
        this._setupMagnet();
        this.$refs.viTransitionMd.remove();
        this.$refs.viTransitionSm.remove();
      } else {
        timeline
          .to(lineMd, {
            keyframes: lineKeyframes,
            duration: 0.45,
            stagger: {
              each: 0.04,
              from: 'random',
            },
            onComplete: () => {
              this.$refs.viTransitionMd.remove();
            },
          })
          .to(
            lineSm,
            {
              keyframes: lineKeyframes,
              duration: 0.5,
              stagger: {
                each: 0.04,
                from: 'random',
              },
              onComplete: () => {
                this.$refs.viTransitionSm.remove();
              },
            },
            '<',
          )
          .fromTo(
            this.$refs.viImage,
            {
              opacity: 0,
              clipPath: 'inset(0% 100% 0% 0%)',
            },
            {
              opacity: 1,
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.45,
              ease: 'power4.out',
            },
            '>-=0.65',
          )
          .fromTo(
            this.$refs.viImage,
            {
              scale: 0.5,
              clipPath: 'inset(0% 100% 0% 0%)',
            },
            {
              scale: 1,
              duration: 0.6,
              ease: CustomEase.create(
                'custom',
                'M0,0 C0,0 0.06,0.394 0.085,0.518 0.105,0.623 0.149,0.823 0.175,0.914 0.195,0.987 0.241,1.119 0.265,1.175 0.278,1.205 0.301,1.249 0.315,1.269 0.326,1.288 0.35,1.32 0.365,1.332 0.384,1.349 0.428,1.374 0.45,1.378 0.472,1.381 0.517,1.391 0.54,1.381 0.562,1.371 0.702,1.408 0.789,1.339 0.81,1.321 0.922,1.042 0.94,1.035 0.955,1.029 1,1 1,1 ',
              ),
              onComplete: () => {
                gsap.set(this.$refs.viImage, {
                  clearProps: 'all',
                });
                this._setupMagnet();
              },
            },
            '<',
          )
          .fromTo(
            itemEl,
            {
              clipPath: (index: number) => (index % 2 === 0 ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)'),
            },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.65,
              ease: 'power4.out',
              stagger: {
                each: 0.03,
                onStart(this: gsap.core.Tween) {
                  (this.targets()[0] as HTMLElement).dataset.show = '';
                },
              },
              onComplete: () => {
                gsap.set(itemEl, {
                  clearProps: 'clipPath',
                });
              },
            },
            '>-=0.1',
          )
          .fromTo(
            bgAnime,
            {
              scale: 0,
              rotate: 180,
            },
            {
              scale: 1,
              rotate: 0,
              duration: 1.5,
              ease: 'power4.out',
              onComplete: () => {
                gsap.set(bgAnime, {
                  clearProps: 'all',
                });
              },
            },
            '<-=0.1',
          )
          .fromTo(
            bgBase,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.65,
              ease: 'power2.out',
              onComplete: () => {
                gsap.set(bgBase, {
                  clearProps: 'opacity',
                });
              },
            },
            '<',
          )
          .fromTo(
            [header, calendar, this.$refs.title, this.$refs.copyright],
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.3,
              ease: 'power4.out',
              onComplete: () => {
                gsap.set([header, calendar, this.$refs.title, this.$refs.copyright], {
                  clearProps: 'opacity',
                });
                this.$store.page.isHomeLoading = true;
              },
            },
            '<',
          );
      }

      if (this.$store.page.isSettingSound) {
        timeline?.play();
      } else {
        this.$watch('$store.page.isSettingSound', (isSettingSound) => {
          if (isSettingSound) {
            timeline?.play();
          }
        });
      }
    },

    destroy() {
      if (timeline) {
        timeline.kill();
        timeline = null!;
      }
      if (xTo) {
        xTo.tween.kill();
        xTo = null!;
      }
      if (yTo) {
        yTo.tween.kill();
        yTo = null!;
      }
    },

    _setupMagnet() {
      if (this.$store.device.isTouchDevice) return;
      this.isMagnetReady = true;
    },

    // x-bind
    bindMagnetMouse() {
      return {
        '@mouseenter': (e: MouseEvent) => {
          if (!this.isMagnetReady) return;
          cachedRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
          gsap.killTweensOf(this.$refs.viImage, 'rotationX,rotationY');
          xTo = gsap.quickTo(this.$refs.viImage, 'rotationX', {
            duration: 0.4,
            ease: 'power1.out',
          });
          yTo = gsap.quickTo(this.$refs.viImage, 'rotationY', {
            duration: 0.4,
            ease: 'power1.out',
          });
        },

        '@mousemove': (e: MouseEvent) => {
          if (!this.isMagnetReady || !xTo || !yTo || !cachedRect) return;
          const normalX = (e.clientX - cachedRect.left - cachedRect.width / 2) / (cachedRect.width / 2);
          const normalY = (e.clientY - cachedRect.top - cachedRect.height / 2) / (cachedRect.height / 2);
          xTo(-normalY * maxRot);
          yTo(normalX * maxRot);
        },

        '@mouseleave': () => {
          if (!this.isMagnetReady) return;
          gsap.to(this.$refs.viImage, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.6,
            ease: 'power2.out',
            overwrite: true,
          });
        },
      };
    },
  };
});
