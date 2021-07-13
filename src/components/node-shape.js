import TermSet from '@rdfjs/term-set'
import { html } from 'lit-element'
import { matchComponent, selectComponent } from '../components'
import * as ns from '../namespace'

export const nodeShape = {
  name: 'NodeShape',

  match(shape, data) {
    const types = shape.out(ns.rdf.type).toArray()

    if (types.some(type => type.term.equals(ns.sh.NodeShape))) {
      return 10
    }

    return 0
  },

  render(state, context) {
    const language = context.language
    const properties = state.properties
    const advancedMode = context.advancedMode
    const groupsTerms = new TermSet(properties.map(property => property.out(ns.sh.group).term).filter(Boolean))
    const groups = [...groupsTerms]
      .map(term => state.shape.node(term))
      .sort((group1, group2) => Number(group1.out(ns.sh.order)?.value ?? Infinity) - Number(group2.out(ns.sh.order)?.value ?? Infinity))
    const ungroupedProperties = properties.filter(property => !property.out(ns.sh.group).value)

    const renderComponentSelector = (components, selectedComponent, selectComponent) => {
      // TODO: Using the name for comparison is not a great idea

      const onSelect = (e) => {
        const newComponentName = e.target.value
        const newComponent = components.find(component => newComponentName === component.name)

        selectComponent(newComponent)
      }

      return html`
      <select @change="${onSelect}">
        ${components.map((component, index) => html`
          <option value="${component.name}" ?selected="${component.name === selectedComponent.name}">
            ${component.name}
          </option>
        `)}
      </select>
      `
    }

    const renderPropertyValue = (valueState, canRemove) => {
      const components = matchComponent(valueState.shape, valueState.data)
      const showComponentSelector = advancedMode && components.length > 1
      const component = valueState.selectedComponent || components[0]

      const removeValue = (e) => {
        e.preventDefault()
        context.removeValue(valueState)
      }

      const updateValue = (newValue) => {
        context.updateValue(valueState, newValue)
      }

      const selectComponent = (newComponent) => {
        context.selectComponent(valueState, newComponent)
      }

      return html`
      <div>
        ${component.render(valueState, context, updateValue)}
        ${showComponentSelector ? renderComponentSelector(components, component, selectComponent) : ''}
        ${canRemove ? html`<button type="button" @click="${removeValue}">-</button>` : ''}
      </div>
      `
    }

    const renderProperty = property => {
      const label = property.out(ns.sh.name, { language }).value ?? property.out(ns.sh.path).value
      const path = property.out(ns.sh.path).term
      const maxCount = Number(property.out(ns.sh.maxCount).value ?? Infinity)
      const minCount = Number(property.out(ns.sh.minCount).value ?? 0)
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
      const groupTitle = group.out(ns.rdfs.label, { language }).value
      const groupProperties = properties.filter(property => group.term.equals(property.out(ns.sh.group).term))

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
