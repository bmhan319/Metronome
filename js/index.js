let play = false
let myvar

const metronome = () => {
  const tickSound = document.getElementById("tick")

  if (play === false) {
    console.log("tick")
    myvar = setInterval( () => {
      tickSound.play()
    }, 857)
  } else if (play === true) {
    console.log("Stop")
    clearInterval(myvar)
  }

  play = !play
}