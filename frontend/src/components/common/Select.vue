<template>
    <v-select :label="label" :items="items"
        :variant="variant"></v-select>
</template>
<script setup lang="ts">
    interface Props {
        label?: string
        items: string[]
        variant?: "filled" | "outlined" | "plain" | "solo" | "solo-filled" | "solo-inverted" | "underlined" | undefined
    }

   const props = withDefaults(defineProps<Props>(), {
       label: "",
       variant: undefined 
   })

   const { label, items, variant } = props
</script>