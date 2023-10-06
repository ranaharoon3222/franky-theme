<script setup>
import { ref, computed } from 'vue';
import { defineProps } from 'vue';
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

const breeds = [
  { label: 'Great Dane', value: '200' },
  { label: 'Newfoundland', value: '105' },
  { label: 'German Boxer', value: '113' },
  { label: 'Small Musterlander', value: '113' },
  { label: 'Magyar Viszla', value: '113' },
  { label: 'English Foxhound', value: '113' },
  { label: 'Rhodesian Ridgeback', value: '113' },
  { label: 'Flat-Coated Retriever', value: '113' },
  { label: 'Dalmatian', value: '113' },
  { label: 'Sight hounds', value: '113' },
  { label: 'Jack Russel Terrier', value: '113' },
  { label: 'Bearded Collie', value: '113' },
  { label: 'Golden Retriever', value: '82' },
  { label: 'Bischon Frise', value: '82' },
  { label: 'Westhighland Terrier', value: '82' },
  { label: 'Collies', value: '82' },
  { label: 'Daschunds', value: '82' },
  { label: 'Airedale Terrier', value: '82' },
  { label: 'Staffordshire Terrier', value: '82' },
  { label: 'Other', value: '1' },
];
const selected = ref(breeds[0]);
const query = ref('');

const filteredPeople = computed(() =>
  query.value === ''
    ? breeds
    : breeds.filter((breed) => {
        return breed.label.toLowerCase().includes(query.value.toLowerCase());
      })
);

const props = defineProps(['label', 'name', 'validation']);
</script>

<template>
  <div class="increase-z">
    <Combobox v-model="selected">
      <div class="relative mt-1 mb-5">
        <label for="" class="mt-4 mb-2"> {{ label }} </label>

        <div
          class="relative w-full overflow-hidden text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
        >
          <ComboboxInput
            class="w-full py-6 pl-10 pr-10 text-2xl leading-5 text-gray-900 border-none focus:ring-0"
            :displayValue="(breed) => breed.label"
            @change="query = $event.target.value"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="w-10 h-10 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute w-full py-1 mt-1 overflow-auto text-2xl bg-white rounded-md shadow-lg max-h-80 ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div
              v-if="filteredPeople.length === 0 && query !== ''"
              class="relative px-4 py-2 text-gray-700 cursor-default select-none"
            >
              {{ $('message.nothing_found') }}
            </div>

            <ComboboxOption
              v-for="breed in filteredPeople"
              as="template"
              :key="breed.id"
              :value="breed"
              v-slot="{ selected, active }"
            >
              <li
                class="relative py-2 pl-10 pr-4 cursor-default select-none"
                :class="{
                  'bg-[#f48f86] text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ breed.label }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-1"
                  :class="{ 'text-white': active, 'text-[#f48f86]': !active }"
                >
                  <CheckIcon class="h-7 w-7" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>

    <FormKit
      type="hidden"
      disabled="true"
      v-model="selected.label"
      :label="label"
      :name="name + '_label'"
      :validation="validation"
    />

    <FormKit
      type="hidden"
      disabled="true"
      v-model="selected.value"
      :label="label"
      :name="name"
      :validation="validation"
    />
  </div>
</template>
