import Alpine from 'alpinejs';
import { waitAnimation } from '@/scripts/utils/waitAnimation';

Alpine.data('globalMenu', () => {
  let dialogEl: HTMLDialogElement;
  let linkEl: NodeListOf<HTMLAnchorElement>;
  let abortController: AbortController;

  return {
    isOpen: false,
    isAnimating: false,

    init() {
      dialogEl = this.$el.querySelector('dialog') as HTMLDialogElement;
      // デバッグ用
      // this.onOpen();

      abortController = new AbortController();
      if (dialogEl) {
        linkEl = dialogEl.querySelectorAll("a:not([target='_blank'])");
        for (const link of linkEl) {
          link.addEventListener(
            'click',
            (e) => {
              this.onClose();
            },
            {
              signal: abortController?.signal,
            },
          );
        }
      }

      // this.$watch('$store.mql.isMD', (mql: boolean) => {
      //   if (mql && this.isOpen) {
      //     this.onClose();
      //   }
      // });
    },

    destroy() {
      if (dialogEl) {
        dialogEl.close();
        dialogEl = null!;
        this.isOpen = false;
        this.isAnimating = false;
      }
      if (abortController) {
        abortController.abort();
        abortController = null!;
      }
    },

    onOpen() {
      if (this.isAnimating) return;
      this.isAnimating = true;
      this.$store.scroll.onFixed(true);
      dialogEl?.showModal();
      requestAnimationFrame(() => {
        this.isOpen = true;
        requestAnimationFrame(async () => {
          await waitAnimation(dialogEl);
          this.isAnimating = false;
        });
      });
    },

    onClose() {
      if (this.isAnimating) return;
      this.isAnimating = true;
      this.$store.scroll.onFixed(false);
      this.isOpen = false;
      requestAnimationFrame(async () => {
        if (dialogEl) {
          await waitAnimation(dialogEl);
          dialogEl.scrollTop = 0;
          dialogEl.close();
          this.isAnimating = false;
        }
      });
    },

    // bind
    bindDialog() {
      return {
        [':class']: () => {
          return [this.isAnimating ? 'is-animating' : ''];
        },

        [':data-toggle']: () => {
          return this.isOpen ? 'open' : 'close';
        },

        ['@keydown.escape']: (e: KeyboardEvent) => {
          e.preventDefault();
          if (this.isAnimating) return;
          if (this.isOpen) {
            this.onClose();
          }
        },
      };
    },

    bindOpen() {
      return {
        ['@click']: () => {
          this.onOpen();
        },
        [':aria-expanded']: () => {
          return this.isOpen ? 'true' : 'false';
        },
      };
    },

    bindClose() {
      return {
        ['@click']: () => {
          this.onClose();
        },
        [':aria-expanded']: () => {
          return this.isOpen ? 'true' : 'false';
        },
      };
    },
  };
});
