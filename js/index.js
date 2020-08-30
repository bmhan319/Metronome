//Metronome
//1000ms =     1sec =  60bpm
//857ms  = .8571sec =  70bpm
//750ms  =   .75sec =  80bpm 
//667ms  =  .667sec =  90bpm
//500ms  =    .5sec = 120bpm

//Global Variables
let play = false
let isTicking

//Metronome function
const metronome = (bpm) => {
  const tickSound = document.getElementById("tick")
  const button = document.getElementById("playButton")

  //Start metronome
  if (play === false) { 
    isTicking = setInterval( () => {tickSound.play()}, convert(bpm) )
    button.innerHTML = "Stop"
  
  //Stop metronome
  } else if (play === true) {
    clearInterval(isTicking)
    button.innerHTML = "Play"
  }

  play = !play
}

//BPM to MS conversion function
const convert = (bpm) => {
    let time = ( (60 / bpm) * 1000 ).toFixed(2)
    return time
  }