import loki = require('lokijs');
import fs = require('fs');

/**
 * A database module using lokijs
 */
// export module _PlanetMap {

//     const NAME = 'PlanetMap.lokidb'

//     export class core{
//         private db:loki
//         private planetsCollection:Collection<PlanetMap.planet>
    
//         constructor(){
//             fs.access(NAME,(err) => {
//                 if (!err) this.load()
//                 else this.create()
//             });
//         }

//         private create():void {
//             console.log(`Created database ${NAME}`)
//             this.db = new loki(NAME);
//             this.planetsCollection = this.db.addCollection('planets', {
//                 indices: ['id']
//             })
//             this.db.saveDatabase()
//         }

//         private load():void {
//             console.log(`Loaded database ${NAME}`)
//             this.db = new loki(NAME);
//             this.db.loadDatabase({},() => {
//                 this.planetsCollection = this.db.getCollection('planets')
//             })
//         }

//         public addPlanet(star:planet):planet{
//             let {type, content} = star
//             let target = {type:type, content:content, level:star.level, id:this.planetsCollection.data.length}
//             this.db.saveDatabase()
//             return this.planetsCollection.insert(target)
//         }

//         public updatePlanet(id:number, star:planet):planet{
//             let target = this.planetsCollection.findOne({id:id})
//             target.content = star.content
//             target.type = star.type
//             target.level = star.level
//             this.db.saveDatabase()
//             return this.planetsCollection.update(target)
//         }

//         public getMap():planet[]{
//             return this.planetsCollection.data
//         }
//     }

// }

export module PlanetMap{
    export type planet = {
        id?:number,
        type: 'img' | 'text' | 'link'
        content:string,
        level:number
    }
}

