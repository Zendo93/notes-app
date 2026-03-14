<template>
    <v-sheet height="100vh" color="grey-lighten-3" class="min-h-screen">
        <v-layout>
            <NavBar />
            <v-main>
                <RouterView />
                <app-snackbar>
                    <template v-slot:actions>
                        <app-button
                        class="px-3"
                        density="comfortable"
                        rounded="lg"
                        label="Got it!"
                        variant="tonal"
                        @click="show = false"
                        />
                    </template>
                </app-snackbar>
            </v-main>
        </v-layout>
    </v-sheet>
</template>
<script setup lang="ts">
import AppButton from '@/components/common/AppButton.vue';
import NavBar from '@/components/layout/NavBar.vue';
import AppSnackbar from '@/components/common/AppSnackbar.vue';
import { useSnackbar } from '@/composables/useSnackbar';

const { show } = useSnackbar()
</script>