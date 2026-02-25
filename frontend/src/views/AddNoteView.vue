<!--///TODO-->
<template>
     <div class="mx-auto my-container">
  <form>
    <v-text-field
      v-model="state.name"
      :counter="10"
      label="Title"
      required
      
    ></v-text-field>

    <Select
      v-model="state.select"
      :items="items"
      label="Category"
      variant="underlined"
      required
    ></Select>
    <v-textarea
      v-model="text"
      label="Description"
    ></v-textarea>

    <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    <v-btn class="mt-2" block>Cancel</v-btn>
  </form>
</div>
</template>
<script setup lang="ts">
  import { reactive } from 'vue'
  import Select from '@/components/common/Select.vue'
//   import { useVuelidate } from '@vuelidate/core'
//   import { email, required } from '@vuelidate/validators'

  const initialState = {
    name: '',
    email: '',
    select: null,
    checkbox: null,
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