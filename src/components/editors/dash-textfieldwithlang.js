import { html } from 'lit-element'
import * as rdf from '@rdfjs/dataset'
import * as ns from '../../namespace'
import * as shacl from '../../shacl'
import '../select-language'

export const dashTextFieldWithLang = {
  name: 'TextFieldWithLang',

  match(shape, data) {
    const editor = shape.out(ns.dash.editor).term
    const types = shape.out(ns.rdf.type).toArray()
    const singleLine = shape.out(ns.dash.singleLine).value
    const valueDatatype = data?.term?.datatype

    if (!types.some(type => type.term.equals(ns.sh.PropertyShape))) return 0

    if (ns.dash.TextFieldWithLangEditor.equals(editor)) return 20

    if (
      valueDatatype?.equals(ns.xsd.langString) ||
      (
        shacl.permitsDatatype(shape, ns.rdf.langString) &&
        shacl.permitsDatatype(shape, ns.xsd.string)
      )
    ) {
      return 11
    }

    if (singleLine !== 'false' && shacl.permitsDatatype(shape, ns.rdf.langString)) {
      return 5
    }

    return 0
  },

  render({ shape, data }, context, updateValue) {
    const datatype = shape.out(ns.sh.datatype).term
    const value = data?.term?.value ?? ''
    const language = data?.term?.language

    const onUpdateValue = (e) => {
      const newValue = e.target.value
      updateValue(rdf.literal(newValue, language || datatype))
    }

    const onUpdateLanguage = (e) => {
      const newLanguage = e.detail.language
      updateValue(rdf.literal(value, newLanguage))
    }

    return html`<div>
      <input .value="${value}" @input="${onUpdateValue}" />
      <select-language
        .value="${language}"
        .languages="${context.languages}"
        @change="${onUpdateLanguage}"
      ></select-language>
    </div>`
  },
}
