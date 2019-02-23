import { System } from '@lib/system'
import { Engine } from '@lib/engine'
import { Component } from '@lib/component'
import { Entity, EntityListener } from '@lib/entity'
import { Family } from '@lib/family'

import PositionComponent from '@tests/components/position'
import MovementComponent from '@tests/components/movement'


export default class MovementSystem extends System {
	public entities: Entity[]
  public components = [PositionComponent, MovementComponent]
  public family: Family

	public addedToEngine(engine: Engine): void {
    this.family = engine.getFamilyFor(this.components.map(c => c.name))
		this.entities = engine.getEntitiesFor(this.family)

		console.log("MovementSystem added to engine.")
	}

	public removedFromEngine(engine: Engine): void {
		console.log("MovementSystem removed from engine.")
		this.entities = []
	}

	public update(deltaTime: number): void {
    this.entities.forEach((e: Entity) => {

			const p: PositionComponent = e.getComponentByClass(PositionComponent)
			const m: MovementComponent = e.getComponentByClass(MovementComponent)

			p.x += m.velocityX * deltaTime
			p.y += m.velocityY * deltaTime
    })

		console.log(this.entities.length + " Entities updated in MovementSystem.")
  }
}