import { dash, rdf, rdfs, sh, xsd } from '../../namespace'
import { html } from 'lit-element'

export const dashEnumSelectEditor = {
  editor: dash.EnumSelectEditor,

  match(shape) {
    const types = shape.out(rdf.type).toArray()
    const maxCount = Number(shape.out(sh.maxCount).value || Infinity)
    const values = shape.out(sh.in)

    if (!types.some(type => type.term.equals(sh.PropertyShape))) {
      return 0
    }

    //TODO: support multiselection
    if (maxCount !== 1) {
      return 0
    }

    if (values.terms.length === 0) {
      return 0
    }

    return 10
  },

  render({ shape, data }, context, updateValue) {
    const selected = data && data.term

    const values = shape.out(sh.in).terms.map(term => {
      return {
        html: function () {
          return html`<option ?selected="${this.isSelected()}">${this.label()}</option>`
        },
        isSelected: function () {
          return term.equals(selected)
        },
        label: function () {
          let label = null

          if (this.term.termType === 'NamedNode') {
            label = shape.node(term).out(rdfs.label).values[0]
          }

          return label || term.value
        },
        onSelect: function () {
          updateValue(this.term.value)
        },
        term
      }
    })

    const onChange = event => {
      const value = values[event.target.selectedIndex]

      if (typeof value === 'undefined') {
        return
      }

      value.onSelect(event)
    }

    return html`<select @change="${onChange}" >${values.map(value => value.html())}</select>`
  },
}
