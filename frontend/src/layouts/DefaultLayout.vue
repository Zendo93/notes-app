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
                <ConfirmDialog
                    v-model="isOpen"
                    :title="options.title"
                    :confirm-text="options.confirmText as string"
                    :cancel-text="options.cancelText"
                    :color="options.color"
                    :message="options.message"
                    :loading="loading"
                    @close="cancel"
                    @confirm="accept"
                />
            </v-main>
        </v-layout>
    </v-sheet>
</template>
<script setup lang="ts">
import AppButton from '@/components/common/AppButton.vue';
import NavBar from '@/components/layout/NavBar.vue';
import AppSnackbar from '@/components/common/AppSnackbar.vue';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue';
import { useSnackbar } from '@/composables/useSnackbar';
import { useConfirmDialog } from '@/composables/useConfirmDialog';

const { show } = useSnackbar()
const {
  isOpen,
  accept,
  cancel,
  loading,
  options
} = useConfirmDialog()
</script>