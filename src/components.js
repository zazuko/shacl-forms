import { defaultComponent } from './components/default-component.js'
import { dash } from './namespace.js'

const components = [
  defaultComponent,
]

export function register (component) {
  components.push(component)
}

export function selectComponent (shape, data) {
  const shapeEditor = shape.out(dash.editor).term

  if (shapeEditor) {
    const shapeComponent = components.find(({ editor }) => editor.equals(shapeEditor))

    if (!shapeComponent) {
      throw new Error(`Editor ${shapeEditor.value} defined by shape ${shape.term.value} is not supported`)
    }

    return shapeComponent
  }

  const matchingComponents = matchComponent(shape, data)

  if (matchingComponents.length < 1) {
    throw new Error('No matching component found')
  }

  return matchingComponents[0]
}

export function matchComponent(shape, data) {
  return components
    .map(component => ({
      ...component,
      score: component.match(shape, data)
    }))
    .filter(({ score }) => score > 0)
    .sort(({ score: score1 }, { score: score2 }) => score2 - score1)
}
