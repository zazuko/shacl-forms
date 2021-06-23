import * as $rdf from '@rdfjs/dataset'
import TermMap from '@rdfjs/term-map'
import { rdf, sh } from './namespace.js'

export class ShapeState {
  /**
   *
   * @param {Clownface} shape - Pointer to shape
   * @param {Clownface} data - Pointer to data
   */
  constructor(shape, data, parent = null) {
    this.shape = shape
    this.data = data
    this.parent = parent

    const nestedShape = shape.out(sh.node)
    const shapeForProperties = nestedShape.term ? nestedShape : shape

    this.properties = shapeForProperties.out(sh.property).toArray()

    this.values = this.properties.reduce((properties, property) => {
      const path = property.out(sh.path).term
      const values = data.out(path).map(value => new ShapeState(property, value, this))

      properties.set(path, values)

      return properties
    }, new TermMap())
  }

  add(property) {
    const path = property.out(sh.path).term
    const datatype = property.out(sh.datatype).term
    const targetClass = property.out(sh.node).out(sh.targetClass).term || property.out(sh.targetClass).term
    const nodeKind = property.out(sh.nodeKind).term

    let newValuePointer
    if (targetClass) {
      this.data.addOut(path, $rdf.blankNode(), newValue => {
        newValue.addOut(rdf.type, targetClass)
        newValuePointer = newValue
      })
    } else if (sh.IRI.equals(nodeKind)) {
      this.data.addOut(path, $rdf.blankNode(), newValue => {
        newValuePointer = newValue
      })
    } else {
      this.data.addOut(path, $rdf.literal('', datatype), newValue => {
        newValuePointer = newValue
      })
    }

    // Only add new value if it didn't already exist because 2 quads can't be
    // exactly the same in a graph.
    // The UX of this is not great, but it will avoid issues when manipulating the graph.
    if (!this.values.get(path).some(value => value.data.term.equals(newValuePointer.term))) {
      const newValue = new ShapeState(property, newValuePointer, this)
      this.values.get(path).push(newValue)
    }
  }

  update(newValue) {
    const path = this.shape.out(sh.path).term
    const datatype = this.shape.out(sh.datatype).term

    const newTerm = $rdf.literal(newValue, datatype)

    // Update dataset
    const parent = this.data.in(path)
    this.data.deleteIn(path)
    parent.addOut(path, newTerm, newPointer => {
      // Update state
      this.data = newPointer
    })
  }

  delete() {
    const path = this.shape.out(sh.path).term

    // Update intermediate data structure
    const values = this.parent.values.get(path)
    const newValues = values.filter(value => !value.data.term.equals(this.data.term))
    this.parent.values.set(path, newValues)

    // Update dataset
    deleteRecursive(this.data, this.shape)
  }
}

function deleteRecursive(data, property) {
  const path = property.out(sh.path)
  const nestedShape = property.out(sh.node)

  if (nestedShape.term) {
    const nestedProperties = nestedShape.out(sh.property).toArray()
    for (const property of nestedProperties) {
      deleteRecursive(data.out(property.out(sh.path)), property)
    }
  }

  data.deleteIn(path)
}
