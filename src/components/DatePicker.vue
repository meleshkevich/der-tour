<script setup lang="ts">
import { ref } from 'vue';
import { useDateStore } from '../stores/useDateStore';
import VueDatePicker from '@vuepic/vue-datepicker';
import type { DatePickerInstance } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const dateStore = useDateStore();
const datepicker = ref<DatePickerInstance>(null);

const handleButtonClick = (action: string, payload?: any) => {
  if (typeof dateStore[action] === 'function') {
    dateStore[action](payload);
  } else {
    console.warn(`Action "${action}" not found in dateStore.`);
  }
  if (datepicker) datepicker.value?.openMenu();
};

const handleDate = (modelData: Date[] | null) => {
  console.log('Date changed:', modelData);
};
</script>

<template>
  <h1>Date picker</h1>
  <!-- <p>https://vue3datepicker.com/installation/</p> -->
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
  />
  <div>
    <v-btn
      v-for="button in dateStore.buttons"
      :key="button.label"
      @click="handleButtonClick(button.action, button.payload)"
    >
      {{ button.label.toUpperCase() }}
    </v-btn>
  </div>
</template>

<style scoped></style>
