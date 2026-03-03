<script setup lang="ts">
import AppCard from '@/components/common/AppCard.vue';
import NavBar from '@/components/layout/NavBar.vue';
</script>

<template>
    <!-- <v-card class="mx-auto w-100" color="grey-lighten-3" >
        <v-layout>
            <NavBar />
            <v-main>
                <RouterView />
            </v-main>
        </v-layout>
    </v-card> -->
    <!-- <AppCard class="mx-auto w-100" color="grey-lighten-3" > -->
    <v-sheet height="100vh" color="grey-lighten-3" class="min-h-screen">
        <v-layout>
            <NavBar />
            <v-main>
                <RouterView />
            </v-main>
        </v-layout>
    </v-sheet>
    <!-- </AppCard> -->
</template>