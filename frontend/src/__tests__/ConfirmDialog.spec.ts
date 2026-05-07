import { mount } from '@vue/test-utils'
import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue'
import { describe, expect, it } from 'vitest'

const defaultProps = {
  modelValue: true,
  confirmText: 'Delete',
}

const globalStubs = {
  VDialog: {
    name: 'VDialog',
    template: `<div><slot/></div>`,
    props: ['modelValue', 'maxWidth']
  },
  AppCard: {
    name: 'AppCard',
    template: `
              <div data-test="app-card">
                <slot name="actions" />
              </div>
            `
  },
  VSpacer: {
    name: 'VSpacer',
    template: '<br>'
  }
}

describe('ConfirmDialog', () => {
  it('renders with default props', () => {
    const wrapper = mount(ConfirmDialog, {
      props: defaultProps,
      global: {
        stubs: globalStubs
      },
      shallow: true
    })

    const card = wrapper.find('[data-test="app-card"]')

    expect(card.attributes('title')).toBe('Confirm delete')
    expect(card.attributes('description')).toBe(
      'Are you sure you want to delete this item?'
    )
  })

  it('renders custom props', () => {
    const wrapper = mount(ConfirmDialog, {
      props: {
        ...defaultProps,
        title: 'Custom title',
        message: 'Custom message',
      },
      global: {
        stubs: globalStubs
      },
      shallow: true
    })

    const card = wrapper.find('[data-test="app-card"]')

    expect(card.attributes('title')).toBe('Custom title')
    expect(card.attributes('description')).toBe('Custom message')
  })

  it('emits close when cancel button is clicked', async () => {
    const wrapper = mount(ConfirmDialog, {
      props: defaultProps,
      global: {
        stubs: globalStubs
      },
      shallow: true
    })

    const buttons = wrapper.findAllComponents({ name: 'AppButton' })

    await buttons[0]?.trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emits confirm when confirm button is clicked', async () => {
    const wrapper = mount(ConfirmDialog, {
      props: defaultProps,
      global: {
        stubs: globalStubs
      },
      shallow: true
    })

    const buttons = wrapper.findAllComponents({ name: 'AppButton' })

    // second button = confirm
    await buttons[1]?.trigger('click')

    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  it('passes loading state to confirm button', () => {
    const wrapper = mount(ConfirmDialog, {
      props: {
        ...defaultProps,
        loading: true,
      },
      global: {
        stubs: globalStubs
      },
      shallow: true
    })

    const buttons = wrapper.findAllComponents({ name: 'AppButton' })

    expect(buttons[1]?.props('loading')).toBe(true)
  })

  it('disables cancel button when loading', () => {
    const wrapper = mount(ConfirmDialog, {
      props: {
        ...defaultProps,
        loading: true,
      },
      global: {
        stubs: globalStubs
      },
      shallow: true
    })

    const buttons = wrapper.findAllComponents({ name: 'AppButton' })

    expect(buttons[0]?.props('disabled')).toBe(true)
  })

  it('passes color to confirm button', () => {
    const wrapper = mount(ConfirmDialog, {
      props: {
        ...defaultProps,
        color: 'blue',
      },
     global: {
        stubs: globalStubs
      },
      shallow: true
    })

    const buttons = wrapper.findAllComponents({ name: 'AppButton' })

    expect(buttons[1]?.props('color')).toBe('blue')
  })

  it('binds v-model to dialog', () => {
    const wrapper = mount(ConfirmDialog, {
      props: defaultProps,
      global: {
        stubs: globalStubs
      },
      shallow: true
    })

    const dialog = wrapper.findComponent({ name: 'VDialog' })

    expect(dialog.props('modelValue')).toBe(true)
  })
})