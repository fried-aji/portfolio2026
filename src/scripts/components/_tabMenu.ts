import Alpine from 'alpinejs';

Alpine.data('tabMenu', (id: string) => {
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
    },

    // destroy() {
    // },

    async onTabChange(index: number) {
      if (this.currentIndex === index) return;

      this.currentIndex = index;

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
