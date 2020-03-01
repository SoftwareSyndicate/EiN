import { Engine } from './Engine'
import { System } from './System'

export class SystemManager {
  engine: Engine
  systems: System[]

  constructor(engine: Engine){
    this.engine = engine
    this.systems = []
  }

  addSystem(system: System): System {
    system.engine = this.engine
    system.order = this.systems.length

    this.systems.push(system)
    this.sortSystems()

    return system
  }

  sortSystems(): void {
    this.systems.sort((a: System, b: System) => {
      return a.priority - b.priority || a.order - b.order
    })
  }

  removeSystem(system: System): boolean {
    let index: number = this.systems.indexOf(system)
    if(index == -1) return false
    this.systems.splice(index, 1)
    return true
  }

  execute(delta: number, time: number): void {
    for(let i=0; i<this.systems.length; i++){
      const system: System = this.systems[i]
      if(system.enabled){
        system.execute(delta, time)
      }
    }
  }
}
