/**
 * Custom stack template stuff
 * 
 * Author:  Anshul Kharbanda
 * Created: [Creation Date]
 */
import Vector from './vector';
import HMatrix from './hmatrix';

export class Transform {
    constructor(scale, orientation=0, position=new Vector(0, 0)) {
        this.scale = scale
        this.orientation = orientation
        this.position = position
    }

    get matrix() {
        return HMatrix
            .scale(this.scale)
            .rotate(this.orientation)
            .translate(this.position.x, this.position.y)
    }

    translate(dist) {
        this.position = this.position.add(dist)
    }
}

export class Hexagon {
    constructor(transform=new Transform(40)) {
        this.transform = transform
        this.fill = '#00aaff'
    }

    get shape() {
        return [
            new Vector(-Hexagon.R, 0),
            new Vector(-Hexagon.A, Hexagon.B),
            new Vector(Hexagon.A, Hexagon.B),
            new Vector(Hexagon.R, 0),
            new Vector(Hexagon.A, -Hexagon.B),
            new Vector(-Hexagon.A, -Hexagon.B),
            new Vector(-Hexagon.R, 0)
        ]
    }

    get vertices() {
        return this.transform.matrix.transformMany(this.shape)
    }
}
Hexagon.R = 1
Hexagon.A = 1/2
Hexagon.B = Math.sqrt(3)/2