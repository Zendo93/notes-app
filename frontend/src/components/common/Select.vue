<template>
    <v-select :class="['select', props.class]" :label="label" :items="items"
        :variant="variant" v-bind="$attrs"></v-select>
</template>
<script setup lang="ts">
    interface Props {
        class?: "w-auto" | "w-0" | "w-33" | "w-25" | "w-50" | "w-66" | "w-75" | "w-100" | string
        label?: string
        items: string[]
        variant?: "filled" | "outlined" | "plain" | "solo" | "solo-filled" | "solo-inverted" | "underlined" | undefined
    }

   const props = withDefaults(defineProps<Props>(), {
       label: "",
       variant: undefined,
       class: "w-auto" 
   })

   const { label, items, variant } = props
</script>