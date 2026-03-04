import Alpine from 'alpinejs';
import { waitAnimation } from '@/scripts/utils/waitAnimation';

Alpine.data('sound', () => {
  return {
    isOpen: true,

    init() {
      const dialog = this.$refs.dialog as HTMLDialogElement;
      dialog.showModal();
      this.$store.scroll.onFixed(true);
    },

    destroy() {
      //
    },

    // bind

    bindDialog() {
      return {
        [':data-toggle']: () => {
          return this.isOpen ? 'open' : 'close';
        },

        ['@keydown.escape']: (e: KeyboardEvent) => {
          e.preventDefault();
        },
      };
    },

    bindButton(enable: boolean) {
      return {
        ['@click']: () => {
          const dialog = this.$refs.dialog as HTMLDialogElement;
          this.isOpen = false;
          requestAnimationFrame(async () => {
            await waitAnimation(dialog);
            dialog.close();
            this.$store.scroll.onFixed(false);
            this.$store.page.isSettingSound = true;
            this.$store.config.sound.mute = enable;
            dialog.remove();
          });
        },
      };
    },
  };
});
