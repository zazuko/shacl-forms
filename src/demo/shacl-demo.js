import { css, LitElement, html } from 'lit-element'
import '../shacl-form.js';
import { shape, data } from './demo-data.js'

export class ShaclDemo extends LitElement {
  static get styles() {
    return css`
    .page-header {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .main {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .form {
      width: 40%;
      min-width: 30rem;
      max-width: 100%;
    }
    `
  }

  static get properties() {
    return {
      selectedLanguage: { type: String, attribute: false },
    }
  }

  constructor() {
    super()

    this.shape = shape
    this.data = data
    this.languages = ['fr', 'en', 'de', 'it']
    this.selectedLanguage = 'en'
  }

  render() {
    const selectLanguage = e => {
      this.selectedLanguage = e.target.value
    }

    const language = [this.selectedLanguage, '*']

    return html`
    <header class="page-header">
      <h1>SHACL form demo</h1>
      <select @change="${selectLanguage}">
        ${this.languages.map(language => html`
        <option value="${language}" ?selected="${this.selectedLanguage === language}">
          ${language}
        </option>`)}
      </select>
    </header>

    <div class="main">
      <shacl-form
        .shape="${this.shape}"
        .data="${this.data}"
        .language="${language}"
        @submit="${this.onSubmit}"
        class="form"
      ></shacl-form>

      <div>
        <h2>Data</h2>
        <p>(Submit to update)</p>
        <code>
          ${[...this.data.dataset].map(quad => html`
            ${quad.subject.value} ${quad.predicate.value} ${quad.object.value}<br>`)}
        </code>
      </div>
    </div>
    `
  }

  onSubmit(e) {
    this.data = e.detail.data
    this.requestUpdate('data')
  }
}

window.customElements.define('shacl-demo', ShaclDemo)
