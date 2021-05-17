/**
 * Custom stack template stuff
 * 
 * Author:  Anshul Kharbanda
 * Created: [Creation Date]
 */
import Vector from './vector';

const deg2rad = Math.PI/180

export default class HMatrix {
    static translate(x, y) {
        return new HMatrix(
            1, 0, x,
            0, 1, y
        )
    }

    static rotate(angle) {
        return new HMatrix(
            Math.cos(angle*deg2rad), -Math.sin(angle*deg2rad), 0,
            Math.sin(angle*deg2rad), Math.cos(angle*deg2rad), 0
        )
    }

    static scale(a) {
        return new HMatrix(
            a, 0, 0,
            0, a, 0
        )
    }

    constructor(xx, xy, xt, yx, yy, yt) {
        this.xx = xx
        this.xy = xy
        this.xt = xt
        this.yx = yx
        this.yy = yy
        this.yt = yt
    }

    transform(vector) {
        return new Vector(
            vector.x*this.xx + vector.y*this.xy + this.xt,
            vector.x*this.yx + vector.y*this.yy + this.yt
        )
    }

    transformMany(vectors) {
        let transformed = []
        for (const vector of vectors) {
            transformed.push(this.transform(vector))
        }
        return transformed
    }

    compose(other) {
        return new HMatrix(
            other.xx*this.xx + other.xy*this.yx,
            other.xx*this.xy + other.xy*this.yy,
            other.xx*this.xt + other.xy*this.yt + other.xt,
            other.yx*this.xx + other.yy*this.yx,
            other.yx*this.xy + other.yy*this.yy,
            other.yx*this.xt + other.yy*this.yt + other.yt
        )
    }

    translate(x, y) {
        return this.compose(HMatrix.translate(x, y))
    }

    rotate(angle) {
        return this.compose(HMatrix.rotate(angle))
    }

    scale(a) {
        return this.compose(HMatrix.scale(a))
    }
}
HMatrix.identity = new HMatrix(1, 0, 0, 0, 1, 0)