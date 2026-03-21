import { ref } from 'vue'

type ConfirmOptions = {
  title?: string
  message?: string,
  confirmText?: string
  cancelText?: string
  color?: string
}

const isOpen = ref(false)
const loading = ref(false)
const options = ref<ConfirmOptions>({})
let resolveFn: ((value: boolean) => void) | null = null

export function useConfirmDialog() {
  function confirm(opts: ConfirmOptions) {
    options.value = opts
    isOpen.value = true

    return new Promise<boolean>((resolve) => {
      resolveFn = resolve
    })
  }

  function accept() {
    // isOpen.value = false
    resolveFn?.(true)
  }

  function cancel() {
    isOpen.value = false
    resolveFn?.(false)
  }

  function setLoading(val: boolean) {
    loading.value = val
  }

  return {
    isOpen,
    options,
    loading,
    confirm,
    accept,
    cancel,
    setLoading
  }
}