import { html } from 'lit-element'

export const defaultComponent = {
  name: 'Default',

  match(shape, data) {
    return 1
  },

  render({ shape }) {
    return html`No component found for <code>${shape?.term?.value}</code>`
  },
}
