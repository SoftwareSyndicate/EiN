import { Klass } from './Klass'
import { Component } from './Component'
import { Entity } from './Entity'

// TODO, add things like all_component_classes, changed_components, etc
export interface Query {
  entity_name?: string
  component_classes?: Klass<Component>[]
}