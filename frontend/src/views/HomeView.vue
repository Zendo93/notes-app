<script setup lang="ts">
import AppCard from '@/components/common/AppCard.vue';
import Filters from '@/components/layout/Filters.vue';

</script>
<template>
    <Filters />
    <v-container fluid>
        <v-row density="comfortable">
            <v-col v-for="n in 8" :key="n" cols="3">
                <AppCard :subtitle="`Subtitle for Content ${n}`" :title="`Content ${n}`"
                    description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.?"
                    title-class="pb-0" />
            </v-col>
        </v-row>
    </v-container>
</template>