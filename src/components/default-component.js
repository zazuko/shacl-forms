import { html } from 'lit-element'

export const defaultComponent = {
  match(shape, data) {
    return 1
  },

  render(shape, data) {
    return html`No component found for <code>${shape?.term?.value}</code>`
  },
}
