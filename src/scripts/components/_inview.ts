import Alpine from 'alpinejs';

Alpine.data('inview', () => {
  let observer: IntersectionObserver;

  return {
    isInview: false,
    isInviewOnce: false,

    init() {
      const rootMargin = this.$el.dataset.rootMargin || '0px 0px -15% 0px';
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.isInview = true;
              this.isInviewOnce = true;
            } else {
              this.isInview = false;
            }
          }
        },
        {
          rootMargin: rootMargin,
        },
      );
      observer.observe(this.$el);
    },

    destroy() {
      if (observer) {
        observer.disconnect();
        observer = null!;
      }
    },

    // bind
    bindTarget() {
      return {
        [':data-inview']: () => {
          return this.isInviewOnce;
        },
      };
    },
  };
});
