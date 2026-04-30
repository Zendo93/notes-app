import { mount } from "@vue/test-utils"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { createPinia, setActivePinia } from 'pinia'
import Filters from '@/components/layout/Filters.vue'
import { nextTick } from "vue"


// Mock debounce to run instantly
vi.mock('@vueuse/core', () => ({
  useDebounceFn: (fn: any) => fn
}))

// Mock store
const getNotesMock = vi.fn()

vi.mock('@/stores/notes', () => ({
  useNotesStore: () => ({
    getNotes: getNotesMock
  })
}))

const globalStubs = {
  VSheet: {
    template: `<div><slot /></div>`
  },
  AppSearchInput: {
    template: `<input data-test="search" @input="$emit('update:modelValue', $event.target.value)" />`
  },
  AppSelect: {
    template: `<select data-test="select" @change="$emit('update:modelValue', $event.target.value)" >
                <option value="a">A</option>
                <option value="b">B</option>
              </select>`
  }
}

describe('Filters.vue', () => {
  beforeEach(() => {
     setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('renders inputs', () => {
    const wrapper = mount(Filters, {
      global: { stubs: globalStubs }
    })

    expect(wrapper.find('[data-test="search"]').exists()).toBe(true)
    expect(wrapper.findAll('[data-test="select"]').length).toBe(2)
  })

  it('calls getNotes when search changes (debounced)', async () => {
    const wrapper = mount(Filters, {
      global: { stubs: globalStubs }
    })

    const input = wrapper.find('[data-test="search"]')
    await input.setValue('test')

    await nextTick()

    expect(getNotesMock).toHaveBeenCalledWith({
      search: 'test',
      category: null,
      sort: null
    })
  })

  it('calls getNotes when sort changes', async () => {
    const wrapper = mount(Filters, {
      global: { stubs: globalStubs }
    })

    const selects = wrapper.findAll('[data-test="select"]')
    const sortSelect = selects[0]

    await sortSelect!.setValue('a')
    await nextTick()

    expect(getNotesMock).toHaveBeenCalledWith({
      search: '',
      category: null,
      sort: 'a'
    })
  })

  it('calls getNotes when category changes', async () => {
    const wrapper = mount(Filters, {
      global: { stubs: globalStubs }
    })

    const selects = wrapper.findAll('[data-test="select"]')
    const categorySelect = selects[1]

    await categorySelect!.setValue('b')
    await nextTick()

    expect(getNotesMock).toHaveBeenCalledWith({
      search: '',
      category: 'b',
      sort: null
    })
  })

  it('preserves state across multiple changes', async () => {
    const wrapper = mount(Filters, {
      global: { stubs: globalStubs }
    })

    const input = wrapper.find('[data-test="search"]')
    const selects = wrapper.findAll('[data-test="select"]')

    await input.setValue('hello')
    await selects[0]!.setValue('a') // sort
    await selects[1]!.setValue('b') // category

    await nextTick()

    expect(getNotesMock).toHaveBeenLastCalledWith({
      search: 'hello',
      category: 'b',
      sort: 'a'
    })
  })

})
