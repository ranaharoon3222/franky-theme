<script setup>
import { ref } from 'vue'
import { defineProps } from 'vue';

const props = defineProps(['label', 'name', 'validation', 'type', 'options'])
const inputLabel = ref('')
const value = ref('')

const fillLabel = (val) => {
    const found = props.options.find((element) => element.value == val);
    if (found) {
        inputLabel.value = found.label
    }

}


</script>

<template>
    <FormKit :type="type" @input="fillLabel" :label="label" :name="name" :validation="validation" :options="options"
        v-model="value" />
    <FormKit type="hidden" :label="label" :name="name + '_label'" :validation="validation" :options="options"
        v-model="inputLabel" />
</template>