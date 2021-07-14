import TermSet from '@rdfjs/term-set'
import * as ns from './namespace'

/**
 * Checks if a property shape permits a given datatype.
 *
 * @param {Clownface} shape - Shape pointer
 * @param {Term} datatype
 * @returns Boolean
 */
export function permitsDatatype(shape, datatype) {
  const shapeDatatype = shape.out(ns.sh.datatype).term
  const orDatatypes = [...shape.out(ns.sh.or).list()].reduce((datatypes, nestedShape) => {
    const nestedDatatype = nestedShape.out(sh.datatype).term
    return nestedDatatype ? datatypes.add(nestedDatatype) : datatypes
  }, new TermSet())

  return shapeDatatype?.equals(datatype) || orDatatypes.has(datatype)
}
