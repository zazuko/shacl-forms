import { html } from 'lit-element'
import { dash, rdf, sh, xsd } from '../../namespace'

export const dashBooleanSelect = {
  editor: dash.BooleanSelectEditor,

  match(shape, data) {
    const types = shape.out(rdf.type).toArray()
    const datatype = data && data.term && data.term.datatype
    const maxCount = Number(shape.out(sh.maxCount).value || Infinity)
    const minCount = Number(shape.out(sh.minCount).value || 0)

    if (!types.some(type => type.term.equals(sh.PropertyShape))) {
      return 0
    }

    if (!xsd.boolean.equals(datatype) || minCount !== 1 || maxCount !== 1) {
      return 0
    }

    return 10
  },

  render({ shape, data }, context, updateValue) {
    const value = (data && data.term && data.term.value) || ''
    const update = (e) => updateValue(e.target.checked.toString())

    return html`<input type="checkbox" .value="${value}" @input="${update}" />`
  },
}
