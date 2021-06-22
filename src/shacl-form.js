import * as $rdf from '@rdfjs/dataset'
import { LitElement, html, css } from 'lit-element'
import { sh } from './namespace.js'
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
    const onSubmit = () => {
      console.log('submit')
    }

    return html`
    <form @submit="${onSubmit}">
      ${component.render(this.shape, this.data, this)}

      <button type="submit">Save</button>
    </form>
    `
  }

  addValue(data, property) {
    const path = property.out(sh.path).term
    const datatype = property.out(sh.datatype)

    data.addOut(path, $rdf.literal('', datatype))

    this.requestUpdate('data')
  }

  removeValue(data, property) {
    data.deleteIn()
    this.requestUpdate('data')
  }

  updateValue(data, newValue, property) {
    const path = property.out(sh.path).term
    const datatype = property.out(sh.datatype)

    data.in(path).addOut(path, $rdf.literal(newValue, datatype))
    data.deleteIn(path)

    this.requestUpdate('data')
  }
}

window.customElements.define('shacl-form', ShaclForm)
