import Alpine from 'alpinejs';

Alpine.data('config', () => {
  return {
    // init() {
    //   //
    // },

    // destroy() {
    //   //
    // },

    // bind
    bindReset(key: string) {
      return {
        ['@click']: () => {
          this.$store.config.reset(key);
          this.$store.config.playSoundDecide();
        },

        '@mouseenter': () => {
          if (this.$store.device.isTouchDevice) return;
          this.$store.config.playSoundSelect();
        },
      };
    },

    bindInput() {
      return {
        ['@click']: () => {
          this.$store.config.playSoundDecide();
        },

        '@mouseenter': () => {
          if (this.$store.device.isTouchDevice) return;
          this.$store.config.playSoundSelect();
        },
      };
    },
  };
});
