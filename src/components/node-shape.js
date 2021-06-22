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

  render(shape, data) {
    const properties = shape.out(sh.property)
    const groupsTerms = new TermSet(properties.map(property => property.out(sh.group).term))
    const groups = [...groupsTerms]
      .map(term => shape.node(term))
      .sort((group1, group2) => Number(group1.out(sh.order)?.value ?? Infinity) - Number(group2.out(sh.order)?.value ?? Infinity))
    const ungroupedProperties = properties.filter(property => !property.out(sh.group).value)

    const renderPropertyValue = (property, value) => {
      const component = selectComponent(property)

      return html`
      <div>
        ${component.render(property, value)}
        <button type="button">-</button>
      </div>
      `
    }

    const renderProperty = property => {
      const label = property.out(sh.name).value
      const path = property.out(sh.path).term
      const values = path && data.out(path)

      return html`
        <label>
          <span>${label}</span>
          <div>
            ${values.map(value => renderPropertyValue(property, value))}
          </div>
          <button type="button">+</button>
        </label>
      `
    }

    const renderGroup = group => {
      const groupTitle = group.out(rdfs.label).value
      const groupProperties = properties.has(sh.group, group)

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
