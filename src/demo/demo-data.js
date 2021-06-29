import * as $rdf from '@rdfjs/dataset'
import clownface from 'clownface'
import { dash, ex, rdf, rdfs, schema, sh, xsd } from '../namespace.js'

export const shape = clownface({ dataset: $rdf.dataset(), factory: $rdf })
  .node(ex.PersonShape)
  .addOut(rdf.type, sh.NodeShape)
  .addOut(rdfs.label, 'Person shape')
  .addOut(rdfs.comment, 'Defines the structure of a person')
  .addOut(sh.targetClass, schema.Person)
  .addOut(sh.property, ex.PersonShape_givenName, property => {
    property
      .addOut(rdf.type, sh.PropertyShape)
      .addOut(sh.path, schema.givenName)
      .addOut(sh.name, $rdf.literal('First name', 'en'))
      .addOut(sh.name, $rdf.literal('Prénom', 'fr'))
  })
  .addOut(sh.property, ex.PersonShape_familyName, property => {
    property
      .addOut(rdf.type, sh.PropertyShape)
      .addOut(sh.path, schema.familyName)
      .addOut(sh.name, $rdf.literal('Last name', 'en'))
      .addOut(sh.name, $rdf.literal('Nom', 'fr'))
  })
  .addOut(sh.property, ex.PersonShape_address, property => {
    property
      .addOut(rdf.type, sh.PropertyShape)
      .addOut(sh.path, schema.address)
      .addOut(dash.editor, dash.DetailsEditor)
      .addOut(sh.node, ex.AustralianAddressShape)
      .addOut(sh.class, schema.PostalAddress)
      .addOut(sh.nodeKind, sh.IRI)
      .addOut(sh.name, $rdf.literal('Address'))
  })

shape
  .node(ex.AustralianAddressShape)
  .addOut(rdf.type, sh.NodeShape)
  .addOut(rdfs.label, 'Australian address shape')
  .addOut(rdfs.comment, 'Defines the structure of addresses in Australia, stored using schema.org.')
  .addOut(sh.targetClass, schema.PostalAddress)
  .addOut(dash.defaultViewForRole, dash.all)
  .addOut(sh.property, ex.AustralianAddressShape_streetAddress, property => {
    property
      .addOut(rdf.type, sh.PropertyShape)
      .addOut(sh.path, schema.streetAddress)
      .addOut(dash.editor, dash.TextAreaEditor)
      .addOut(dash.singleLine, $rdf.literal('false', xsd.boolean))
      .addOut(sh.datatype, xsd.string)
      .addOut(sh.group, ex.AddressPropertyGroup)
      .addOut(sh.maxCount, $rdf.literal('1', xsd.int))
      .addOut(sh.name, $rdf.literal('street address'))
      .addOut(sh.order, $rdf.literal('0', xsd.decimal))
  })
  .addOut(sh.property, ex.AustralianAddressShape_addressLocality, property => {
    property
      .addOut(rdf.type, sh.PropertyShape)
      .addOut(sh.path, schema.addressLocality)
      .addOut(sh.datatype, xsd.string)
      .addOut(sh.group, ex.AddressPropertyGroup)
      .addOut(sh.maxCount, $rdf.literal(1, xsd.int))
      .addOut(sh.name, $rdf.literal('suburb'))
      .addOut(sh.order, $rdf.literal('1', xsd.decimal))
  })
  .addOut(sh.property, ex.AustralianAddressShape_addressRegion, property => {
    property
      .addOut(rdf.type, sh.PropertyShape)
      .addOut(sh.path, schema.addressRegion)
      .addOut(sh.datatype, xsd.string)
      .addOut(sh.description, $rdf.literal('The abbreviation of the state or territory.'))
      .addOut(sh.group, ex.AddressPropertyGroup)
      .addOut(sh.in, ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'])
      .addOut(sh.minCount, $rdf.literal('1', xsd.int))
      .addOut(sh.maxCount, $rdf.literal('1', xsd.int))
      .addOut(sh.name, $rdf.literal('state'))
      .addOut(sh.order, $rdf.literal('2', xsd.decimal))
  })
  .addOut(sh.property, ex.AustralianAddressShape_postalCode, property => {
    property
      .addOut(rdf.type, sh.PropertyShape)
      .addOut(sh.path, schema.postalCode)
      .addOut(sh.datatype, xsd.string)
      .addOut(sh.description, $rdf.literal('An Australian postal code, between 0000 and 9999.'))
      .addOut(sh.group, ex.AddressPropertyGroup)
      .addOut(sh.minCount, $rdf.literal('1', xsd.int))
      .addOut(sh.maxCount, $rdf.literal('1', xsd.int))
      .addOut(sh.minLength, $rdf.literal('4', xsd.int))
      .addOut(sh.maxLength, $rdf.literal('4', xsd.int))
      .addOut(sh.name, $rdf.literal('postal code'))
      .addOut(sh.order, $rdf.literal('3', xsd.decimal))
      .addOut(sh.pattern, $rdf.literal('[0-9][0-9][0-9][0-9]'))
  })
  .addOut(sh.property, ex.AustralianAddressShape_email, property => {
    property
      .addOut(rdf.type, sh.PropertyShape)
      .addOut(sh.path, schema.email)
      .addOut(sh.datatype, xsd.string)
      .addOut(sh.group, ex.ContactPropertyGroup)
      .addOut(sh.name, $rdf.literal('email'))
      .addOut(sh.nodeKind, sh.Literal)
      .addOut(sh.order, $rdf.literal('1', xsd.decimal))
  })
  .addOut(sh.property, ex.AustralianAddressShape_telephone, property => {
    property
      .addOut(rdf.type, sh.PropertyShape)
      .addOut(sh.path, schema.telephone)
      .addOut(sh.datatype, xsd.string)
      .addOut(sh.group, ex.ContactPropertyGroup)
      .addOut(sh.name, $rdf.literal('phone number'))
      .addOut(sh.order, $rdf.literal('2', xsd.decimal))
  })

clownface({ dataset: shape.dataset, factory: $rdf })
  .node(ex.AddressPropertyGroup)
  .addOut(rdf.type, sh.PropertyGroup)
  .addOut(rdfs.label, $rdf.literal('Address', 'en'))
  .addOut(sh.order, $rdf.literal('0', xsd.decimal))

clownface({ dataset: shape.dataset, factory: $rdf })
  .node(ex.ContactPropertyGroup)
  .addOut(rdf.type, sh.PropertyGroup)
  .addOut(rdfs.label, $rdf.literal('Contact', 'en'))
  .addOut(rdfs.label, $rdf.literal('Kontact', 'de'))
  .addOut(sh.order, $rdf.literal('1', xsd.decimal))


export const data = clownface({ dataset: $rdf.dataset(), factory: $rdf })
  .node(ex.aPerson)
  .addOut(schema.address, ex.anAddress, address => {
    address
      .addOut(rdf.type, schema.PostalAddress)
      .addOut(schema.streetAddress, $rdf.literal('3 Teewah Close'))
      .addOut(schema.addressLocality, $rdf.literal('Kewarra Beach'))
      .addOut(schema.addressRegion, $rdf.literal('QLD'))
      .addOut(schema.postalCode, $rdf.literal('4879'))
      .addOut(schema.email, $rdf.literal('holger@knublauch.com'))
      .addOut(schema.email, $rdf.literal('holger@topquadrant.com'))
      .addOut(rdfs.label, $rdf.literal('Holger\'s Address'))
  })
