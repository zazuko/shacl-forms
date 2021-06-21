import { LitElement, html, css } from 'lit-element'
import { rdfs, sh } from './namespace.js'

/**
 * Renders a form from a SHACL shape.
 */
export class ShaclForm extends LitElement {
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
    return html`
    <p>Shape: ${this.shape?.term?.value}</p>
    <p>Data: ${this.data?.term?.value}</p>
    `
  }
}

window.customElements.define('shacl-form', ShaclForm)
