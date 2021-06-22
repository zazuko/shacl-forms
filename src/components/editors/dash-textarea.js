import { html } from 'lit-element'
import { dash, rdf, sh, xsd } from '../../namespace'

export const dashTextArea = {
  editor: dash.TextAreaEditor,

  match(shape, data) {
    const types = shape.out(rdf.type).toArray()
    const singleLine = shape.out(dash.singleLine).value
    const isString = data && xsd.string.equals(data.term.datatype)
    const allowedDatatypes = shape.out(sh.datatype).toArray()

    if (!types.some(type => type.term.equals(sh.PropertyShape))) return 0

    if (singleLine === 'true') return 0

    if (singleLine === 'false' && isString) return 20

    if (isString) return 5

    if (allowedDatatypes.some(datatype => datatype.term.equals(xsd.string))) return 2

    // TODO: Return `null` if property has a custom datatype, not from xsd or rdf

    return 0
  },

  render(shape, data) {
    return html`<textarea>${data.term.value}</textarea>`
  },
}
