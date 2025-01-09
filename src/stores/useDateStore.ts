import { defineStore } from 'pinia';

const startDate = new Date();
const endDate = new Date(new Date().setDate(startDate.getDate() + 7));

export const useDateStore = defineStore('dateStore', {
  state: () => ({
    //DatePicker configs
    i18n: {
      locale: 'cs-CS',
      cancelText: 'Zavřít',
      selectText: 'Vybrat',
    },
    date: [startDate, endDate] as Date[],
    minDate: new Date(),
    range: { maxRange: 30 },

    // Dynamically generated buttons
    buttons: [
      {
        label: 'Last minute',
        action: 'setSelectedRange',
        payload: {
          minDate: new Date(),
        },
      },
      {
        label: 'březen/duben 2025',
        action: 'setSelectedRange',
        payload: {
          minDate: new Date(2025, 3, 1),
        },
      },
      {
        label: 'květen/červen 2025',
        action: 'setSelectedRange',
        payload: {
          minDate: new Date(2025, 4, 1),
        },
      },
      {
        label: 'Letní prázdniny 2025',
        action: 'setSelectedRange',
        payload: {
          minDate: new Date(2025, 5, 1),
        },
      },
    ] as Array<{ label: string; action: string; payload: any }>,
  }),
  actions: {
    updateI18n(newI18n: {
      locale: string;
      cancelText: string;
      selectText: string;
    }) {
      this.i18n = newI18n;
    },
    resetI18n() {
      this.i18n = {
        locale: 'cs-CS',
        cancelText: 'Zavřít',
        selectText: 'Vybrat',
      };
    },
    updateDate(newDate: [Date, Date]) {
      this.date = newDate;
    },
    resetDate() {
      this.date = [
        new Date(),
        new Date(new Date().setDate(new Date().getDate() + 7)), // Reset to default range
      ];
    },
    updateMinDate(newDate: Date) {
      this.minDate = newDate;
    },
    updateRange(newRange: { maxRange: number }) {
      this.range = newRange;
    },

    setSelectedRange(payload: { minDate: Date }) {
      this.updateMinDate(payload.minDate);

      this.updateDate([
        payload.minDate,
        new Date(payload.minDate.getTime() + 7 * 24 * 60 * 60 * 1000),
      ]);
    },
  },
});
