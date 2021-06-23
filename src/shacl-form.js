import { LitElement, html, css } from 'lit-element'
import { sh } from './namespace.js'
import { selectComponent } from './components.js'
import { ShapeState } from './shape-state.js'

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
      data: { type: Object, attribute: false }
    }
  }

  update(changedProperties) {

    if (changedProperties.has('data') || changedProperties.has('shape')) {
      this._state = new ShapeState(this.shape, this.data)
    }

    super.update(changedProperties)
  }

  render() {
    const component = selectComponent(this._state.shape, this._state.data)
    const onSubmit = () => {
      console.log('submit')
    }

    return html`
    <form @submit="${onSubmit}">
      ${component.render(this._state, this)}

      <button type="submit">Save</button>
    </form>
    `
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
}

window.customElements.define('shacl-form', ShaclForm)
