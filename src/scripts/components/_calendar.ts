import Alpine from 'alpinejs';

Alpine.data('calendar', () => {
  let timer: ReturnType<typeof setInterval>;

  return {
    meridiem: 'AM',
    hour: '12:00',
    sec: '.00',
    date: '01.01',
    week: 'Mon',
    datetime: '',

    init() {
      this.update();
      timer = setInterval(() => this.update(), 1000);
    },

    destroy() {
      clearInterval(timer);
    },

    update() {
      const now = new Date();
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Tokyo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23',
        weekday: 'short',
      }).formatToParts(now);

      const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';

      const h = Number.parseInt(get('hour'));
      const m = get('minute');
      const s = get('second');
      const month = get('month');
      const day = get('day');
      const year = get('year');
      const weekday = get('weekday');
      const h12 = String(h % 12 || 12).padStart(2, '0');

      this.meridiem = h < 12 ? 'AM' : 'PM';
      this.hour = `${h12}:${m}`;
      this.sec = `.${s}`;
      this.date = `${month}.${day}`;
      this.week = weekday;
      this.datetime = `${year}-${month}-${day} ${String(h).padStart(2, '0')}:${m}:${s}`;
    },
  };
});
