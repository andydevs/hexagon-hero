/**
 * Custom stack template stuff
 * 
 * Author:  Anshul Kharbanda
 * Created: [Creation Date]
 */
import './style/main.scss'
import Two from "two.js";

// Parameters
const timeRate = 0.01
const preAlpha = 0.90
const radius = 50

// Helper constants
const tx = (1 + Math.cos(Math.PI/3))
const ty = Math.sin(Math.PI/3)
const rx = radius*tx
const ry = radius*ty

// Get canvas and set width height
let app = document.querySelector('#app-root')
let two = new Two({
    width: app.clientWidth,
    height: app.clientHeight
}).appendTo(app)
window.addEventListener('resize', function() {
    two.width = app.clientWidth
    two.height = app.clientHeight
})


// Ease in out function
// 
// Credit to: https://easings.net/#easeInOutExpo
// Created by: Andrey Sitnik and Ivan Solovev
// For the function
const easeInOut = x => {
    return x < 0.5 
        ? Math.pow(2, 20 * x - 10) / 2
        : (2 - Math.pow(2, -20 * x + 10)) / 2
}

// Repeating wave pattern of signal with easing
const upDownSignal = (totalTime, time) => {
    let m = 4 * (time % totalTime) / totalTime
    return m < 1
        ? easeInOut(m % 1)
        : m < 2
        ? 1
        : m < 3
        ? 1 - easeInOut(m % 1)
        : 0
}

// Repeating stair-step pattern of signal with easing
const upUpSignal = (totalTime, time) => {
    let m = 4 * (time % totalTime) / totalTime
    return m < 1
        ? easeInOut(m % 1)
        : m < 2
        ? 1
        : m < 3
        ? 1 + easeInOut(m % 1)
        : 2
}

// Animation loop
let t = 0
two.bind('update', function update() {
    two.clear()

    // Row parameters
    let r, j
    for (let y = 0; y < two.height + radius; y += 2*ry) {
        // Init parameters
        r = y
        j = 1

        // Go through row
        for (let x = 0; x < two.width + radius; x += rx) {
            // Calculate offset parameter
            let a = (y/two.height + x/two.width)/2 + t
            let scale = preAlpha*upDownSignal(20, a)
            let rotation = 2*Math.PI*upUpSignal(20, a)

            // Create polygon
            let poly = two.makePolygon(x, r, radius, 6)
            poly.scale = scale
            poly.rotation = rotation
            poly.fill = '#00aaff'

            // Update parameters
            r += j*ry
            j *= -1
        }
    }

    // Increment time
    t += timeRate
})
two.play()