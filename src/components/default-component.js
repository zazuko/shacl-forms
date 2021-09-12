import { html } from 'lit-element'

export const defaultComponent = {
  match(shape, data) {
    return 1
  },

  render({ shape }) {
    return html`No component found for <code>${shape && shape.term && shape.term.value}</code>`
  },
}
