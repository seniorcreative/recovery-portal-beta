import { mount } from '@vue/test-utils'
import App from '../../src/App.vue'

describe('App', () => {
  // Inspect the raw component options
  it('has data', () => {
    expect(typeof App).toBe('object')
  })
})

describe('Mounted App', () => {
  const wrapper = mount(App);
  console.log(wrapper.Data)
  test('is a Vue instance', () => {
    expect(wrapper).toBeTruthy()
  })
})