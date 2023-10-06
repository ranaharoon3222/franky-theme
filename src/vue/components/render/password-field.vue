<script setup>
import { defineProps } from 'vue';

const props = defineProps(['label', 'name', 'validation']);

const handleIconClick = (node, e) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye';
  node.props.type = node.props.type === 'password' ? 'text' : 'password';
};
</script>

<template>
  <FormKit
    type="password"
    :label="label"
    :name="name"
    :validation="validation"
    prefix-icon="password"
    suffix-icon="eyeClosed"
    @suffix-icon-click="handleIconClick"
  />
</template>

<style>
.formkit-suffix-icon:hover {
  color: var(--fk-color-primary);
}
</style>
