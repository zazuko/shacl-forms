import { LitElement, html, css } from 'lit-element'
import '../shacl-form.js';
import { shape, data } from './demo-data.js'

export class ShaclDemo extends LitElement {
  constructor() {
    super()

    this.shape = shape
    this.data = data
  }

  render() {
    return html`
    <h1>SHACL forms demo</h1>
    <shacl-form .shape="${this.shape}" .data="${this.data}" />
    `
  }
}

window.customElements.define('shacl-demo', ShaclDemo)
