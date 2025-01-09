<script setup lang="ts">
import { ref } from 'vue';
import { useDateStore } from '../stores/useDateStore';
import VueDatePicker from '@vuepic/vue-datepicker';
import type { DatePickerInstance } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const dateStore = useDateStore();
const datepicker = ref<DatePickerInstance>(null);

type ActionKey =
  | 'updateI18n'
  | 'resetI18n'
  | 'updateDate'
  | 'resetDate'
  | 'updateMinDate'
  | 'updateRange'
  | 'setSelectedRange';

const handleButtonClick = (action: ActionKey, payload?: any) => {
  if (typeof dateStore[action] === 'function') {
    (dateStore[action] as (payload?: any) => void)(payload);
  } else {
    console.warn(`Action "${action}" is not valid in dateStore.`);
  }
  if (datepicker) datepicker.value?.openMenu();
};

const handleDate = (modelData: Date[] | null) => {
  console.log('Vybrany termin:', modelData);
};
</script>

<template>
  <div class="flex flex-col items-center justify-center p-2">
    <div
      class="flex flex-col md:flex-row justify-center items-start gap-20 w-full max-w-4xl"
    >
      <div class="datePicker bg-white shadow-lg rounded-lg p-4 flex-2 max-w-md">
        <VueDatePicker
          v-model="dateStore.date"
          ref="datepicker"
          :enable-time-picker="false"
          :min-date="dateStore.minDate"
          :range="dateStore.range"
          :locale="dateStore.i18n.locale"
          :cancelText="dateStore.i18n.cancelText"
          :selectText="dateStore.i18n.selectText"
          multi-calendars
          @update:model-value="handleDate"
          class="w-full"
        />
      </div>

      <!-- Popular Dates Section -->
      <div
        class="popularDates bg-gray-50 shadow-lg rounded-lg p-4 flex-1 w-full max-w-md"
      >
        <h2 class="text-lg font-semibold text-gray-700 mb-4">
          Oblíbené termíny
        </h2>
        <div class="space-y-2">
          <button
            v-for="button in dateStore.buttons"
            :key="button.label"
            @click="
              handleButtonClick(button.action as ActionKey, button.payload)
            "
            class="block w-full p-4 bg-blue-400 hover:bg-blue-600 text-white font-semibold text-sm py-2 rounded-lg shadow-lg transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          >
            {{ button.label.toUpperCase() }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
