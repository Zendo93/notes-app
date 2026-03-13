<template>
     <div class="mx-auto mt-5 my-container">
  <v-form ref="form" @submit.prevent="createNote">
    <app-text-field
      v-model="state.title"
      :counter="30"
      label="Title"
      required
      :rules="[required, maxLength(30)]"
    />
    <app-select
      v-model="state.category"
      :items="[...categories]"
      label="Category"
      variant="underlined"
      required
      :rules="[required]"
    />
    <app-textarea
      v-model="state.description"
      label="Description"
      :counter="100"
      :rules="[required, maxLength(100)]"
    />

    <app-button class="mt-2" type="submit" block>Submit</app-button>
    <app-button class="mt-2" block>Cancel</app-button>
  </v-form>
</div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import AppTextField from '@/components/common/AppTextField.vue'
import AppSelect from '@/components/common/AppSelect.vue'
import AppTextarea from '@/components/common/AppTextarea.vue'
import AppButton from '@/components/common/AppButton.vue'
import { maxLength, required } from '@/utils/validation'
import { categories } from '@/constants/categories'
import { useNotesStore } from '@/stores/notes'
import { useForm } from '@/composables/useForm'

const { form, validate, reset } = useForm()
const notesStore = useNotesStore()
const { addNote } = notesStore

  const initialState = {
    title: '',
    category: '',
    description: '',
  }

  const state = reactive({
    ...initialState,
  })

  async function createNote() {
    const isValid = await validate()
    if (!isValid) return
  const newNote = {
    title: state.title,
    category: state.category,
    description: state.description
  }

  addNote(newNote)

  console.log("Created note:", newNote)

  // reset form
   reset()
}
</script>
<style scoped>
.my-container {
  width: 300px;
}
</style>