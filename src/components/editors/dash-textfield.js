import { html } from 'lit-element'
import * as ns from '../../namespace'

export const dashTextField = {
  match(shape, data) {
    const editor = shape.out(ns.dash.editor).term
    const types = shape.out(ns.rdf.type).toArray()
    const datatype = data?.term?.datatype

    if (ns.dash.TextFieldEditor.equals(editor)) return 20

    if (!types.some(type => type.term.equals(ns.sh.PropertyShape))) return 0

    if (ns.rdf.langString.equals(datatype) || ns.xsd.boolean.equals(datatype)) return 0

    return 10
  },

  render({ shape, data }, context, updateValue) {
    const value = data?.term?.value ?? ''
    const update = (e) => updateValue(e.target.value)

    return html`<input .value="${value}" @input="${update}" />`
  },
}
