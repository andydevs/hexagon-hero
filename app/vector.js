/**
 * Custom stack template stuff
 * 
 * Author:  Anshul Kharbanda
 * Created: [Creation Date]
 */

export default class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add(other) {
        return new Vector(
            this.x + other.x,
            this.y + other.y
        )
    }

    scale(scalar) {
        return new Vector(
            this.x * scalar,
            this.y * scalar
        )
    }
}