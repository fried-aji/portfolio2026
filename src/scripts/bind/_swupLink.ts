import Alpine from 'alpinejs';

Alpine.bind('swupLink', () => ({
  ':aria-current': function (this: { $el: HTMLElement }) {
    const href = this.$el.getAttribute('href');
    if (href) {
      const currentPathArray = Alpine.store('router').currentPath.split('/').filter(Boolean);
      const hrefArray = href.split('/').filter(Boolean);

      if (Alpine.store('router').currentPath === href) {
        return 'page';
      }
      if (hrefArray.length > 0 && hrefArray.every((item: string, i: number) => currentPathArray[i] === item)) {
        return 'true';
      }
    }
    return null;
  },
}));
