const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0,0, canvas.width, canvas.height)

const mapImage = new Image()
mapImage.src = './image/room map_zoomed.png'

const playerImage = new Image()
playerImage.src = './image/playerDown.png'

mapImage.onload = () => {
    c.drawImage(mapImage,-600,-200)
    c.drawImage(playerImage,
        0,0,playerImage.width/4,playerImage.height, 
        (canvas.width - (playerImage.width/4)) / 2 , 
        (canvas.height - playerImage.height) / 2,
        playerImage.width/4,playerImage.height)
}

window.addEventListener('keydown', (e) => {
    console.log(e.key)
    switch (e.key) {
        case 'w':
            break
        case 'a':
            break
        case 's':
            break
        case 'd':
            break
        
    }
})



