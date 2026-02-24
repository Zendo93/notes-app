<script setup lang="ts">
import Card from '@/components/common/Card.vue';
import NavBar from '@/components/layout/NavBar.vue';
import Filters from '@/components/layout/Filters.vue';

</script>

<template>
    <v-card class="mx-auto" color="grey-lighten-3" >
        <v-layout>
            <NavBar />
            <v-main>
                <Filters />
                <v-container fluid>
                    <v-row density="comfortable">
                        <v-col v-for="n in 8" :key="n" cols="3">
                            <Card :category="`Subtitle for Content ${n}`" :title="`Content ${n}`"
                                description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.?"></Card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </v-layout>
    </v-card>
</template>