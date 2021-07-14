import { LitElement, html, css } from 'lit-element'

export class SelectLanguage extends LitElement {
  static properties() {
    return {
      value: { type: String, required: false },
      languages: { type: Array, required: true },
    }
  }

  constructor() {
    super()

    this.value = null
  }

  render() {
    const languages = new Set([''].concat(this.languages))

    // If selected language is not present in the options, add it to the end of the list
    if (this.value) {
      languages.add(this.value)
    }

    return html`
    <select @change="${this._onChange}">
      ${[...languages].map(language => html`
        <option value="${language}" ?selected="${language === this.value}">
          ${language}
        </option>
      `)}
    </select>
    `
  }

  _onChange(e) {
    const language = e.target.value || null
    const event = new CustomEvent('change', { detail: { language } })
    this.dispatchEvent(event)
  }
}

window.customElements.define('select-language', SelectLanguage)
