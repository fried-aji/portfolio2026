import Alpine from 'alpinejs';
import { waitAnimation } from '@/scripts/utils/waitAnimation';

Alpine.data('sound', () => {
  return {
    isOpen: true,

    init() {
      //
      (this.$refs.dialog as HTMLDialogElement).showModal();
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
            dialog.remove();
            this.$store.scroll.onFixed(false);
            this.$store.config.sound.mute = enable;
          });
        },
      };
    },
  };
});
