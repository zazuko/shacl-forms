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
    const datatype = property.out(sh.datatype).term
    const targetClass = property.out(sh.targetClass).term
    const nodeKind = property.out(sh.nodeKind).term

    if (targetClass) {
      data.addOut(path, $rdf.blankNode(), newValue => {
        newValue.addOut(rdf.type, targetClass)
      })
    } else if (sh.IRI.equals(nodeKind)) {
      data.addOut(path, $rdf.blankNode())
    } else {
      data.addOut(path, $rdf.literal('', datatype))
    }

    this.requestUpdate('data')
  }

  removeValue(data, property) {
    deleteRecursive(data, property)
    this.requestUpdate('data')
  }

  updateValue(data, newValue, property) {
    const path = property.out(sh.path)
    const datatype = property.out(sh.datatype)

    data.in(path).addOut(path, $rdf.literal(newValue, datatype))
    data.deleteIn(path)

    this.requestUpdate('data')
  }
}

function deleteRecursive(data, property) {
  const path = property.out(sh.path)
  const nestedShape = property.out(sh.node)

  if (nestedShape.term) {
    const nestedProperties = nestedShape.out(sh.property).toArray()
    for (const property of nestedProperties) {
      deleteRecursive(data.out(property.out(sh.path)), property)
    }
  }

  data.deleteIn(path)
}

window.customElements.define('shacl-form', ShaclForm)
