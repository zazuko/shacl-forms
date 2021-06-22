import { defaultComponent } from './components/default-component.js'
import { dashDetails } from './components/editors/dash-details.js'
import { dashTextArea } from './components/editors/dash-textarea.js'
import { dashTextField } from './components/editors/dash-textfield.js'
import { nodeShape } from './components/node-shape.js'
import { dash } from './namespace.js'

const components = [
  defaultComponent,
  nodeShape,
  dashDetails,
  dashTextArea,
  dashTextField,
]

export function register (component) {
  components.push(component)
}

export function selectComponent (shape, data) {
  const shapeEditor = shape.out(dash.editor).term

  if (shapeEditor) {
    const shapeComponent = components.find(({ editor }) => editor && editor.equals(shapeEditor))

    if (shapeComponent) {
      return shapeComponent
    } else {
      console.log(`Editor ${shapeEditor.value} defined by shape ${shape.term.value} is not supported`)
    }
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
