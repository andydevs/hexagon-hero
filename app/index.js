/**
 * Custom stack template stuff
 * 
 * Author:  Anshul Kharbanda
 * Created: [Creation Date]
 */
import './style/main.scss'
import Vector from './vector';
import HMatrix from './hmatrix';
import { Transform, Hexagon } from './hexagon';

// Bundle script
let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')

// Origin transform
const OX = canvas.width/2
const OY = canvas.height/2
const OT = new HMatrix(
    1, 0, OX,
    0, -1, OY
)

/**
 * Draw polygon to screen
 * 
 * @param {Polygon} polygon the polygon to draw 
 */
function drawPolygon(polygon) {
    // Get parameters
    let vertices = polygon.vertices
    let fill = polygon.fill

    // Transform vertices into screenspace
    // Get start point and also put it at the end
    let screenpoints = OT.transformMany(vertices)
    let start = screenpoints.shift()
    screenpoints.push(start)

    // Draw path
    ctx.beginPath()
    ctx.fillStyle = fill
    ctx.moveTo(start.x, start.y)
    for (const point of screenpoints) {
        ctx.lineTo(point.x, point.y)
    }
    ctx.fill()
}

// Draw polygon
const polygon = new Hexagon(
    new Transform(40, 0, new Vector(0, 0))
)
drawPolygon(polygon)