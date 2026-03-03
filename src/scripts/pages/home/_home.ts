import Alpine from 'alpinejs';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
gsap.registerPlugin(CustomEase);

Alpine.data('home', () => {
  let timeline: gsap.core.Timeline;

  return {
    init() {
      const itemEl = this.$el.querySelectorAll('[data-item]');
      timeline = gsap.timeline({
        paused: true,
      });

      timeline
        // .fromTo(
        //   this.$refs.vi,
        //   {
        //     scale: 0,
        //   },
        //   {
        //     scale: 1,
        //     duration: 0.6,
        //     ease: CustomEase.create(
        //       'custom',
        //       'M0,0 C0,0 0.06,0.394 0.085,0.518 0.105,0.623 0.149,0.823 0.175,0.914 0.195,0.987 0.241,1.119 0.265,1.175 0.278,1.205 0.301,1.249 0.315,1.269 0.326,1.288 0.35,1.32 0.365,1.332 0.384,1.349 0.428,1.374 0.45,1.378 0.472,1.381 0.517,1.391 0.54,1.381 0.562,1.371 0.702,1.408 0.789,1.339 0.81,1.321 0.922,1.042 0.94,1.035 0.955,1.029 1,1 1,1 ',
        //     ),
        //   },
        // )
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
                (this.targets()[0] as Element).classList.add('is-show');
              },
            },
            onComplete: () => {
              gsap.set(itemEl, {
                clearProps: 'clipPath',
              });
            },
          },
        );
      if (timeline) {
        const isSettingSound = sessionStorage.getItem('isSettingSound');

        if (isSettingSound) {
          timeline.play();
        } else {
          this.$watch('$store.page.isSettingSound', (isSettingSound) => {
            if (isSettingSound) {
              timeline.play();
            }
          });
        }
      }
    },

    destroy() {
      if (timeline) {
        timeline.kill();
        timeline = null!;
      }
    },
  };
});
