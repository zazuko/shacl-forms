import { html } from 'lit-element'
import { dash, rdf, sh, xsd } from '../../namespace'

export const dashTextField = {
  editor: dash.TextFieldEditor,

  match(shape, data) {
    const types = shape.out(rdf.type).toArray()
    const datatype = data && data.term && data.term.datatype

    if (!types.some(type => type.term.equals(sh.PropertyShape))) return 0

    if (xsd.boolean.equals(datatype)) return 0

    return 10
  },

  render({ shape, data }, context, updateValue) {
    const value = (data && data.term && data.term.value) || ''
    const language = data.term.language
    const update = (e) => updateValue(e.target.value, language)

    return html`<input .value="${value}" @input="${update}" />${language ? `@${language}` : '' }`
  },
}
