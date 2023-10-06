<template>
  <FormKit
    :type="type"
    :label="label"
    :name="name"
    :validation="validation"
    :suffix-icon="icon"
    @suffix-icon-click="$emit('removeDog', index)"
  />
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  label: String,
  name: String,
  validation: String,
  type: String,
  icon: String,
  removeDog: Function,
  index: Number,
});
</script>
