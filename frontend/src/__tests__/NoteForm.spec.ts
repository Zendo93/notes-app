import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import NoteForm from '@/components/notes/NoteForm.vue'
import { ref } from 'vue'

function getFirstEmit<T>(wrapper: any, event: string): T {
  const events = wrapper.emitted(event)

  if (!events || !events.length) {
    throw new Error(`${event} not emitted`)
  }

  return events[0][0] as T
}

// mock useForm composable
const validateMock = vi.fn()
const resetMock = vi.fn()

vi.mock('@/composables/useForm', () => ({
  useForm: () => ({
    form: ref(),
    validate: validateMock,
    reset: resetMock
  })
}))

// stub child components (we don't test them here)
const globalStubs = {
  AppTextField: {
    template: `<input @input="$emit('update:modelValue', $event.target.value)" />`
  },
  AppSelect: {
    template: `<select @change="$emit('update:modelValue', $event.target.value)" />`
  },
  AppTextarea: {
    template: `<textarea @input="$emit('update:modelValue', $event.target.value)" />`
  },
  AppButton: {
    template: `<button @click="$emit('click')"><slot /></button>`
  },
  VForm: {
    template: `<form @submit="$emit('submit.prevent')"><slot /></form>`,
  }
}

describe('NoteForm.vue', () => {
  const defaultProps = {
    modelValue: {
      title: 'Test title',
      category: 'work',
      description: 'Test desc'
    },
    submitLabel: 'Save'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders initial state', () => {
    const wrapper = mount(NoteForm, {
      props: defaultProps,
      global: { stubs: globalStubs }
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('updates local state on input', async () => {
    const wrapper = mount(NoteForm, {
      props: defaultProps,
      global: { stubs: globalStubs }
    })

    const input = wrapper.find('input')
    await input.setValue('New title')
    
    // internal state is not directly exposed → test via submit
     validateMock.mockResolvedValue(true)
   

    await wrapper.find('form').trigger('submit')

    const payload = getFirstEmit<{ title: string }>(wrapper, 'submit')
    expect(payload.title).toBe('New title')
  })

  it('does NOT submit when validation fails', async () => {
    validateMock.mockResolvedValue(false)

    const wrapper = mount(NoteForm, {
      props: defaultProps,
      global: { stubs: globalStubs }
    })

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')).toBeFalsy()
  })

  it('emits submit with correct data when valid', async () => {
    validateMock.mockResolvedValue(true)

    const wrapper = mount(NoteForm, {
      props: defaultProps,
      global: { stubs: globalStubs }
    })

    await wrapper.find('form').trigger('submit')

    const payload = getFirstEmit<{ title: string, category: string, description: string }>(wrapper, 'submit')
    expect(payload).toEqual({
      title: 'Test title',
      category: 'work',
      description: 'Test desc'
    })
  })

  it('calls reset after successful submit', async () => {
    validateMock.mockResolvedValue(true)

    const wrapper = mount(NoteForm, {
      props: defaultProps,
      global: { stubs: globalStubs }
    })

    await wrapper.find('form').trigger('submit')

    expect(resetMock).toHaveBeenCalled()
  })
})