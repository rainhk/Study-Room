const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// fetch('collision_map.json')
//     .then((response) => response.json())
//     .then((json) => console.log(json));

fetch('collision_map1.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // JSON 데이터를 사용하는 코드 작성
    console.log(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0,0, canvas.width, canvas.height)

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
    x: -600,
    y: -200
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



