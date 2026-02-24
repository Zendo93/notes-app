<template>
    <v-text-field :class="['search-input', props.class]" :density="density" :prepend-inner-icon="prependInnerIcon" v-model="search" :clear-icon="clearIcon" :label="label" :variant="variant"
        clearable single-line flat hide-details></v-text-field>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { JSXComponent } from 'vuetify';

interface Props {
        label?: string,
        class?: "mb-5" | "w-auto" | "w-0" | "w-33" | "w-25" | "w-50" | "w-66" | "w-75" | "w-100" | string
        density?: null | 'default' | 'comfortable' | 'compact'
        variant?: "filled" | "outlined" | "plain" | "solo" | "solo-filled" | "solo-inverted" | "underlined" | undefined,
        clearIcon?: string | (string | [path: string, opacity: number])[] | JSXComponent | undefined
        prependInnerIcon?: string | (string | [path: string, opacity: number])[] | JSXComponent | undefined
    }

    const props = withDefaults(defineProps<Props>(), {
       label: "",
       density: null,
       variant: undefined,
       class: "w-auto",
       clearIcon: undefined,
       prependInnerIcon: undefined 
   })
   
   const { label, density, variant, clearIcon, prependInnerIcon } = props

    const search  = ref<string>("")
</script>