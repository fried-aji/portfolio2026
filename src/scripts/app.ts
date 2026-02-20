import Alpine from 'alpinejs';
import '@/scripts/store';
import '@/scripts/bind';
import '@/scripts/components';
import '@/scripts/pages';

window.Alpine = Alpine;

document.addEventListener('DOMContentLoaded', () => {
  Alpine.start();
});
