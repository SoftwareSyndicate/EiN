import { Component, TransferableComponent, Entity, System, Query, Engine } from '../../src/'
console.log("basic example")


const circle_query: Query = {
  entity_name: "circle"
}

class MovementSystem extends System {
  entities: Entity[]
  entity_query: Query

  constructor(priority: number = 0, enabled: boolean = true) {
    super(priority, enabled)
    this.entity_query = circle_query
  }

  onAdded(engine: Engine): void {
    this.engine = engine
    this.entities = this.engine.entitiesForQuery(this.entity_query)
  }

  execute(delta: number, time: number): void {
    console.log("entities: ", this.entities)
  }
}

class RenderSystem extends System {
  entities: Entity[]
  ctx: CanvasRenderingContext2D
  entity_query: Query

  constructor(priority: number = 0, enabled: boolean = true) {
    super(priority, enabled)
    this.entity_query = circle_query
  }

  onAdded(engine: Engine): void {
    this.engine = engine
    this.entities = this.engine.entitiesForQuery(this.entity_query)
    let canvas: any = document.getElementById('canvas')
    this.ctx = canvas.getContext('2d')
  }

  execute(delta: number, time: number): void {
    this.ctx.beginPath();
    this.ctx.arc(75, 75, 10, 0, Math.PI * 2, true)
    this.ctx.fill()
  }
}

class PositionComponent extends Component {}



const engine: Engine = new Engine()
engine.addSystem(MovementSystem)
engine.addSystem(RenderSystem)
engine
  .createEntity("circle")
  .addComponent(PositionComponent, {x: 50, y: 50})


let start: any = null
function update(timestamp: number){
  if(!start) start = timestamp
  engine.execute(timestamp-start, timestamp)
  // requestAnimationFrame(update)
}

requestAnimationFrame(update)
