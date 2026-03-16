<template>
  <div class="mx-auto mt-5 my-container">
    <v-form ref="formRef" @submit.prevent="handleSubmit">
      <app-text-field
        v-model="localState.title"
        :counter="30"
        label="Title"
        required
        :rules="[required, maxLength(30)]"
      />

      <app-select
        v-model="localState.category"
        :items="[...categories]"
        label="Category"
        variant="underlined"
        required
        :rules="[required]"
      />

      <app-textarea
        v-model="localState.description"
        label="Description"
        :counter="100"
        :rules="[required, maxLength(100)]"
      />

      <app-button class="mt-2" type="submit" block>
        {{ submitLabel }}
      </app-button>

      <app-button
        class="mt-2"
        block
        variant="outlined"
        to="/"
      >
        Cancel
      </app-button>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue"

import AppTextField from "@/components/common/AppTextField.vue"
import AppSelect from "@/components/common/AppSelect.vue"
import AppTextarea from "@/components/common/AppTextarea.vue"
import AppButton from "@/components/common/AppButton.vue"

import { maxLength, required } from "@/utils/validation"
import { categories } from "@/constants/categories"
import { useForm } from "@/composables/useForm"

const props = defineProps<{
  modelValue: {
    title: string
    category: string
    description: string
  }
  submitLabel?: string
}>()

const emit = defineEmits(["submit"])

const { form: formRef, validate, reset } = useForm()

const localState = reactive({ ...props.modelValue })

watch(
  () => props.modelValue,
  (val) => Object.assign(localState, val)
)

async function handleSubmit() {
  const isValid = await validate()
  if (!isValid) return

  emit("submit", { ...localState })
  resetForm()
}

function resetForm() {
  reset()
}
</script>

<style scoped>
.my-container {
  width: 300px;
}
</style>