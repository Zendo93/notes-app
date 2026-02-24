<template>
    <v-card
        :subtitle="category"
        :text="description"
        :title="title"
    />
</template>
<script setup lang="ts">
    interface Props {
        title?: string
        category?: string
        description?: string
    }

   const {title, category, description} = defineProps<Props>()
</script>