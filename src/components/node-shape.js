import TermSet from '@rdfjs/term-set'
import { html } from 'lit-element'
import { selectComponent } from '../components.js'
import { rdf, rdfs, sh } from '../namespace.js'

export const nodeShape = {
  match(shape, data) {
    const types = shape.out(rdf.type).toArray()

    if (types.some(type => type.term.equals(sh.NodeShape))) {
      return 10
    }

    return 0
  },

  render(state, context) {
    const properties = state.properties
    const groupsTerms = new TermSet(properties.map(property => property.out(sh.group).term).filter(Boolean))
    const groups = [...groupsTerms]
      .map(term => state.shape.node(term))
      .sort((group1, group2) => Number(group1.out(sh.order)?.value ?? Infinity) - Number(group2.out(sh.order)?.value ?? Infinity))
    const ungroupedProperties = properties.filter(property => !property.out(sh.group).value)

    const renderPropertyValue = (valueState, canRemove) => {
      const component = selectComponent(valueState.shape, valueState.data)

      const removeValue = (e) => {
        e.preventDefault()
        context.removeValue(valueState)
      }

      const updateValue = (newValue) => {
        context.updateValue(valueState, newValue)
      }

      return html`
      <div>
        ${component.render(valueState, context, updateValue)}
        ${canRemove ? html`<button type="button" @click="${removeValue}">-</button>` : ''}
      </div>
      `
    }

    const renderProperty = property => {
      const label = property.out(sh.name).value ?? property.out(sh.path).value
      const path = property.out(sh.path).term
      const maxCount = Number(property.out(sh.maxCount).value ?? Infinity)
      const minCount = Number(property.out(sh.minCount).value ?? 0)
      const values = (path && state.values.get(path)) ?? []
      const canAdd = values.length < maxCount
      const canRemove = values.length > minCount

      const addValue = (e) => {
        e.preventDefault()
        context.addValue(state, property)
      }

      return html`
        <label>
          <span>${label}</span>
          <div>
            ${values.map(valueState => renderPropertyValue(valueState, canRemove))}
          </div>
          ${canAdd ? html`<button type="button" @click="${addValue}">+</button>` : ''}
        </label>
      `
    }

    const renderGroup = group => {
      const groupTitle = group.out(rdfs.label).value
      const groupProperties = properties.filter(property => group.term.equals(property.out(sh.group).term))

      return html`
      <fieldset>
        <legend>${groupTitle}</legend>
        ${groupProperties.map(renderProperty)}
      </fieldset>
      `
    }

    return html`
      ${ungroupedProperties.length > 0
        ?  html`
          <fieldset>
            ${ungroupedProperties.map(renderProperty)}
          </fieldset>`
        : html``
      }
      ${groups.map(renderGroup)}
    `
  },
}
