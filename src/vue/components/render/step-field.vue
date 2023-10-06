<template>
  <FormKit type="step" :name="step">
    <slot name="content" />
    <slot name="fields" />

  </FormKit>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['step'])

</script>

