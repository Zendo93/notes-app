<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue';
</script>

<template>
    <v-card class="mx-auto" color="grey-lighten-3" >
        <v-layout>
            <NavBar />
            <v-main>
                <RouterView />
            </v-main>
        </v-layout>
    </v-card>
</template>