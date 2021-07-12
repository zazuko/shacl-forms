import * as ns from '../../namespace'
import { nodeShape } from '../node-shape'

export const dashDetails = {
  editor: ns.dash.DetailsEditor,

  match(shape, data) {
    const nodeKind = shape.out(ns.sh.nodeKind).term

    if (ns.sh.IRI.equals(nodeKind)) {
      return null
    }

    return 0
  },

  render(state, context) {
    return nodeShape.render(state, context)
  },
}
