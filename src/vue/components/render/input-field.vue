<template>
  <FormKit
    :type="type"
    :label="label"
    :name="name"
    :validation="validation"
    :options="options"
    :number="number"
    step="any"
  />
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps([
  'label',
  'name',
  'validation',
  'type',
  'options',
  'number',
]);
</script>
