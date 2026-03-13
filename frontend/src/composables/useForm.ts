import { ref } from "vue"

export function useForm() {
  const form = ref()

  async function validate() {
    if (!form.value) return false
    const { valid } = await form.value.validate()
    
    return valid
  }

  function reset() {
    form.value.reset()
  }

  return {
    form,
    validate,
    reset
  }
}