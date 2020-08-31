//Metronome
//1000ms =     1sec =  60bpm
//857ms  = .8571sec =  70bpm
//750ms  =   .75sec =  80bpm 
//667ms  =  .667sec =  90bpm
//500ms  =    .5sec = 120bpm


//Global Variables
let play = false
let isTicking   //variable needs to be placed here to stop setInterval properly
let timeout     //variable needs to be placed here to stop setTimeout properly


//Metronome function
const metronome = (bpm, beats) => {
  const millisec = convert(bpm)
  const button = document.getElementById("playButton")

  //Start metronome
  if (play === false) {
    beatTimer(millisec, beats)
    isTicking = setInterval( () => { beatTimer(millisec, beats) } , millisec * beats )
    button.innerHTML = "Stop"
  
  //Stop metronome
  } else if (play === true) {
    clearInterval(isTicking)
    clearTimeout(timeout)
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
function beatTimer(millisec, beats) {
  const accent = document.getElementById("accent")
  const tick = document.getElementById("tick")

  for (var i = 0; i < beats; i++) {
    if (i === 0) {
      accent.play()
    } else {
      timeout = setTimeout( () => {tick.play()}, millisec * i )
    }
  }
}

//This might be a better way to set ticks
//ChangeInterface
let j = 0
function changeInterface() {
  const accent = document.getElementById("accent")
  const beatNum = document.getElementById("beatNum")
  let beats = 4
  let array = []
  for (i = 0; i < beats; i++) {
    array.push(i+1)
  } 

  beatNum.innerHTML = array[j]
  accent.play()
  j = (j + 1) % array.length;
}

//setInterval(changeInterface, 1000);

function candy() {
  setInterval(changeInterface, 1000)
}