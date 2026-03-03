<template>
     <div class="mx-auto mt-5 my-container">
  <form>
    <app-text-field
      v-model="state.title"
      :counter="10"
      label="Title"
      required
      
    />

    <app-select
      v-model="state.category"
      :items="items"
      label="Category"
      variant="underlined"
      required
    ></app-select>
    <app-textarea
      v-model="state.description"
      label="Description"
    />

    <app-button class="mt-2" type="submit" block>Submit</app-button>
    <app-button class="mt-2" block>Cancel</app-button>
  </form>
</div>
</template>
<script setup lang="ts">
  import { reactive } from 'vue'
  import AppTextField from '@/components/common/AppTextField.vue'
  import AppSelect from '@/components/common/AppSelect.vue'
import AppTextarea from '@/components/common/AppTextarea.vue'
import AppButton from '@/components/common/AppButton.vue'
//   import { useVuelidate } from '@vuelidate/core'
//   import { email, required } from '@vuelidate/validators'

  const initialState = {
    title: '',
    category: '',
    description: null,
  }

  const state = reactive({
    ...initialState,
  })

  const items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
  ]

//   const rules = {
//     name: { required },
//     email: { required, email },
//     select: { required },
//     items: { required },
//     checkbox: { required },
//   }

//   const v$ = useVuelidate(rules, state)

//   function clear () {
//     v$.value.$reset()

//     for (const [key, value] of Object.entries(initialState)) {
//       state[key] = value
//     }
//   }
</script>
<style scoped>
.my-container {
  width: 300px;
}
</style>