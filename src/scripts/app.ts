import Alpine from 'alpinejs';
import '@/scripts/store';
import '@/scripts/bind';
import '@/scripts/components';
import '@/scripts/pages';

window.Alpine = Alpine;

Alpine.store('scroll').onStart();
Alpine.store('router').onStart();

window.addEventListener('load', () => {
  Alpine.start();
});
