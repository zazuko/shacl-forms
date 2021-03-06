import { LitElement, html, css } from 'lit-element'
import { selectComponent } from './components'
import { ShapeState } from './shape-state'

/**
 * Renders a form from a SHACL shape.
 */
export class ShaclForm extends LitElement {
  static get styles() {
    return css`
    label {
      display: block;
    }
    `
  }

  static get properties() {
    return {
      /**
       * A clownface pointer to the SHACL shape to render
       */
      shape: { type: Object, attribute: false },

      /**
       * A clownface pointer to the data
       */
      data: { type: Object, attribute: false },

      /**
       * Language used to extract labels and descriptions.
       *
       * Can be a string (e.g. `fr`) or an array of strings (e.g. `['fr', 'en', '*']`)
       */
      language: { type: String | Array, attribute: false, required: false },

      /**
       * Languages available for literals.
       *
       * Array of strings (e.g. `['fr', 'en']`)
       */
      languages: { type: Array, attribute: false, required: false },

      /**
       * Advanced mode will show a way to switch the editor used for each field.
       */
      advancedMode: { type: Boolean, attribute: 'advanced-mode' },
    }
  }

  constructor() {
    super()

    this.languages = []
    this.advancedMode = false
  }

  update(changedProperties) {
    if (changedProperties.has('data') || changedProperties.has('shape')) {
      this._state = new ShapeState(this.shape, this.data)
    }

    super.update(changedProperties)
  }

  render() {
    const component = selectComponent(this._state.shape, this._state.data)

    return html`
    <form @submit="${this.onSubmit}">
      ${component.render(this._state, this)}

      <button type="submit">Save</button>
    </form>
    `
  }

  onSubmit(e) {
    e.preventDefault()

    const event = new CustomEvent('submit', { detail: { data: this.data } })
    this.dispatchEvent(event)
  }

  addValue(state, property) {
    state.add(property)
    this.requestUpdate('_state')
  }

  removeValue(state) {
    state.delete()
    this.requestUpdate('_state')
  }

  updateValue(state, newValue) {
    state.update(newValue)
    this.requestUpdate('_state')
  }

  selectComponent(state, newComponent) {
    state.selectedComponent = newComponent
    this.requestUpdate('_state')
  }
}

window.customElements.define('shacl-form', ShaclForm)
