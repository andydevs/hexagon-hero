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
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";

// Get canvas and set width height
let canvas = document.querySelector('#canvas')
canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight
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

// Polygon constants
const tX = 1 + Math.cos(Math.PI/3)
const tY = Math.sin(Math.PI/3)
const tDown = new Vector(tX, -tY)
const tUp = new Vector(tX, tY)

// Polygon params
const rad = 30
const rDown = tDown.scale(rad)
const rUp = tUp.scale(rad)

function drawTile() {
    // Clear rectangle
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Create polygon
    let polygon = new Hexagon(new Transform(rad*0.99))

    // Get number in each row and column
    let numX = Math.ceil(ctx.canvas.width / (rad * tX))
    let numY = Math.ceil(ctx.canvas.height / (rad * tY))

    // Draw row
    for (let jndex = 0; jndex < numY; jndex++) {
        // Move to position
        polygon.transform.position = new Vector(-OX, OY - 2*tY*jndex*rad)
        drawPolygon(polygon)

        // Draw hexes in pairs (repeating pattern)
        for (let index = 0; index < numX; index++) {
            polygon.transform.translate(rDown)
            drawPolygon(polygon)
            polygon.transform.translate(rUp)
            drawPolygon(polygon)
        }
    }
}
drawTile()

// Observable magic
fromEvent(window, 'resize')
    .pipe(debounceTime(100))
    .subscribe(() => {
        // Reset width height
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight

        // Draw tile
        drawTile()
    })