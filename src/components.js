import { defaultComponent } from './components/default-component'
import { dashDetails } from './components/editors/dash-details'
import { dashTextArea } from './components/editors/dash-textarea'
import { dashTextField } from './components/editors/dash-textfield'
import { nodeShape } from './components/node-shape'
import * as ns from './namespace'

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
  const shapeEditor = shape.out(ns.dash.editor).term

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
