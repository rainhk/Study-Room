const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionMap = []
for (let i = 1; i < collision.length; i+=70){
    // console.log(collision.slice(i, i+70))
    collisionMap.push(collision.slice(i, i+70))
}

class Boundary{
    static width = 56
    static height = 56
    constructor({position}) {
    this.position = position
    this.width = 56
    this.height = 56
    }

    draw () {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
const offset = {
    x: -620,
    y: -200
}

collisionMap.forEach((row, i) => {
    row.forEach((value, j) => {
        if (value == 288) {
        boundaries.push(
            new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            })
        )}
    })
})

console.log(boundaries)

const mapImage = new Image()
mapImage.src = './image/room map_zoomed.png'

const playerImage = new Image()
playerImage.src = './image/playerDown.png'

class Sprite {
    constructor({position, velocity, image}) {
        this.position = position
        this.image = image
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}


const background = new Sprite({
    position: {
    x: offset.x,
    y: offset.y
    },
    image: mapImage
})

const keys = {
    w: {
        pressed : false
    },
    a: {
        pressed : false
    },
    s: {
        pressed : false
    },
    d: {
        pressed : false
    }
}

function keyPressed(){
    if (keys.w.pressed) {
        background.position.y += 3
    }
    else if (keys.s.pressed) {
        background.position.y -= 3
    }
    else if (keys.d.pressed) {
        background.position.x -= 3
    }
    else if (keys.a.pressed) {
        background.position.x += 3
    }
}

function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    c.drawImage(playerImage,
        0,0,playerImage.width/4,playerImage.height, 
        (canvas.width - (playerImage.width/4)) / 2 , 
        (canvas.height - playerImage.height) / 2,
        playerImage.width/4,playerImage.height)

    keyPressed()
}

animate()

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 's':
            keys.s.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
        
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})



