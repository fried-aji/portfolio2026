import Alpine from 'alpinejs';
import { waitAnimation } from '@/scripts/utils/waitAnimation';

Alpine.data('sound', () => {
  let dialogEl: HTMLDialogElement;

  return {
    isOpen: true,

    init() {
      dialogEl = this.$refs.dialog as HTMLDialogElement;
      dialogEl.showModal();
      this.$store.scroll.onFixed(true);
    },

    destroy() {
      if (dialogEl) {
        dialogEl = null!;
      }
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
          this.isOpen = false;
          this.$store.scroll.onFixed(false);
          requestAnimationFrame(async () => {
            await waitAnimation(dialogEl);
            dialogEl.close();
            this.$store.page.isSettingSound = true;
            this.$store.config.sound.mute = enable;
            dialogEl.remove();
          });
        },
      };
    },
  };
});
