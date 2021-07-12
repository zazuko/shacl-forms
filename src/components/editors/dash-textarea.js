import { html } from 'lit-element'
import * as ns from '../../namespace'

export const dashTextArea = {
  match(shape, data) {
    const editor = shape.out(ns.dash.editor).term
    const types = shape.out(ns.rdf.type).toArray()
    const singleLine = shape.out(ns.dash.singleLine).value
    const isString = data && ns.xsd.string.equals(data.term.datatype)
    const allowedDatatypes = shape.out(ns.sh.datatype).toArray()

    if (ns.dash.TextAreaEditor.equals(editor)) return 20

    if (!types.some(type => type.term.equals(ns.sh.PropertyShape))) return 0

    if (singleLine === 'true') return 0

    if (singleLine === 'false' && isString) return 20

    if (isString) return 5

    if (allowedDatatypes.some(datatype => datatype.term.equals(ns.xsd.string))) return 2

    // TODO: Return `null` if property has a custom datatype, not from xsd or rdf

    return 0
  },

  render({ shape, data }) {
    return html`<textarea>${data.term.value}</textarea>`
  },
}
