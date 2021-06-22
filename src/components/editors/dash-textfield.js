import { html } from 'lit-element'
import { dash, rdf, sh, xsd } from '../../namespace'

export const dashTextField = {
  editor: dash.TextFieldEditor,

  match(shape, data) {
    const types = shape.out(rdf.type).toArray()
    const datatype = data?.term?.datatype

    if (!types.some(type => type.term.equals(sh.PropertyShape))) return 0

    if (rdf.langString.equals(datatype) || xsd.boolean.equals(datatype)) return 0

    return 10
  },

  render(shape, data, context, updateValue) {
    const value = data?.term?.value ?? ''
    const update = (e) => updateValue(e.target.value)

    return html`<input .value="${value}" @input="${update}" />`
  },
}
