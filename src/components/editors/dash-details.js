import * as ns from '../../namespace'
import { nodeShape } from '../node-shape'

export const dashDetails = {
  match(shape, data) {
    const editor = shape.out(ns.dash.editor).term
    const nodeKind = shape.out(ns.sh.nodeKind).term

    if (ns.dash.DetailsEditor.equals(editor)) return 20

    if (ns.sh.IRI.equals(nodeKind)) return null

    return 0
  },

  render(state, context) {
    return nodeShape.render(state, context)
  },
}
