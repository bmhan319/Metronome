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
const metronome = (bpm, beats) => {
  const millisec = convert(bpm)
  const button = document.getElementById("playButton")

  //Start metronome
  if (play === false) {
    timer(millisec, beats)
    isTicking = setInterval( () => { timer(millisec, beats) } , millisec * beats )
    button.innerHTML = "Stop"
  
  //Stop metronome
  } else if (play === true) {
    clearInterval(isTicking)
    button.innerHTML = "Play"
  }

  play = !play
}

//BeatsPerMinute to Milliseconds conversion
const convert = (bpm) => {
    let milliseconds = ( (60 / bpm) * 1000 ).toFixed(2)
    return milliseconds
  }

//Function to play beats at rate and speed given by user
function timer(millisec, beats) {
  const accent = document.getElementById("accent")
  const tick = document.getElementById("tick")

  for (var i = 0; i < beats; i++) {
    if (i === 0) {
      accent.play()
    } else {
      setTimeout( () => {tick.play()}, millisec * i )
    }
  }
}