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
    console.log(time)
    return time
  }


//Trying to fugure out how to add accent
let play2 = false
let isTicking2

const metronome2 = (bpm, beats) => {
  const first = document.getElementById("first")

  //Start metronome
  if (play2 === false) {
    setTimeout( () => {first.play()}, 0 )
    setTimeout( () => {rest.play()}, 857 )
    setTimeout( () => {rest.play()}, 1714 )
    setTimeout( () => {rest.play()}, 2571 )
    isTicking2 = setInterval( () =>{timer(beats)} , convert(bpm) * beats )
  
  //Stop metronome
  } else if (play2 === true) {
    clearInterval(isTicking2)
  }

  play2 = !play2
}

function timer(num) {
  const first = document.getElementById("first")
  const rest = document.getElementById("rest")
  setTimeout( () => {first.play()}, 0 )
  setTimeout( () => {rest.play()}, 857 )
    setTimeout( () => {rest.play()}, 1714 )
    setTimeout( () => {rest.play()}, 2571 )
}