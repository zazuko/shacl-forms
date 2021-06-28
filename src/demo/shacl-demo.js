import { LitElement, html } from 'lit-element'
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
    <shacl-form .shape="${this.shape}" .data="${this.data}" @submit="${this.onSubmit}"></shacl-form>
    <div>
      <h2>Data</h2>
      <p>(Submit to update)</p>
      <code>
        ${[...this.data.dataset].map(quad => html`
          ${quad.subject.value} ${quad.predicate.value} ${quad.object.value}<br>`)}
      </code>
    </div>
    `
  }

  onSubmit(e) {
    this.data = e.detail.data
    this.requestUpdate('data')
  }
}

window.customElements.define('shacl-demo', ShaclDemo)
