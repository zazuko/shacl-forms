import { LitElement, html, css } from 'lit-element'
import { rdfs, sh } from './namespace.js'
import { selectComponent } from './components.js'

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
      shape: { type: Object },

      /**
       * A clownface pointer to the data
       */
      data: { type: Object }
    }
  }

  render() {
    const component = selectComponent(this.shape, this.data)

    return html`
    <form>
      ${component.render(this.shape, this.data)}
    </form>
    `
  }
}

window.customElements.define('shacl-form', ShaclForm)
