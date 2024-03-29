import { dash, sh } from '../../namespace'
import { nodeShape } from '../node-shape.js'

export const dashDetails = {
  editor: dash.DetailsEditor,

  match(shape, data) {
    const nodeKind = shape.out(sh.nodeKind).term

    if (sh.IRI.equals(nodeKind)) {
      return null
    }

    return 0
  },

  render(state, context) {
    return nodeShape.render(state, context)
  },
}
