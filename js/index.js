//Metronome
//1000ms =     1sec =  60bpm
//857ms  = .8571sec =  70bpm
//750ms  =   .75sec =  80bpm 
//667ms  =  .667sec =  90bpm
//500ms  =    .5sec = 120bpm


//Global Variables
let play = false
let beatsPerMeasure = 0 //keeping count of where the beat is at in the measure
let isTicking           //variable needs to be placed here to stop setInterval properly
let isChangingNumber    //variable needs to be placed here to stop setInterval properly
let isChangingColor      //variable needs to be placed here to stop setInterval properly

createBalls(4)

//Master metronome function
function metronome(bpm, beats) {
  const milliseconds = convert(bpm)
  const button = document.getElementById("playButton")

  createBalls(beats)

  if (play === false) {
    isTicking = setInterval( () => { ticking() }, milliseconds)
    isChangingColor = setInterval( () => {changeBallColor(beats)}, milliseconds)
    isChangingNumber = setInterval( () => {changeBeatNum(beats)}, milliseconds)
    button.innerHTML = "Stop"
  } else if (play === true) {
    reset()
  }

  play = !play
}

//Controls the Ticking Audio
function ticking() {
  const accent = document.getElementById("accent")
  const tick = document.getElementById("tick")
  if (beatsPerMeasure === 0) {
    accent.play()
  } else {
    tick.play()
  }
}

//Changes number to reflect beat within the measure
function changeBeatNum(beats) {
  const beatNum = document.getElementById("beatNum")
  
  beatNum.innerHTML = beatsPerMeasure + 1
  beatsPerMeasure = (beatsPerMeasure + 1) % beats;
}


//Changes ball color to reflect beat within the measure
function changeBallColor(beats) {
  const beatPlace = document.getElementById("beatPlace")

  for (i = 0; i < beats; i++) {
    if (beatsPerMeasure === 0) {
      beatPlace.children[0].style.backgroundColor = "green"
    } else {
      beatPlace.children[0].style.backgroundColor = "#bbb"
    }

    if (beatsPerMeasure === i) {
      beatPlace.children[i].classList.add("active-ball")
    } else {
      beatPlace.children[i].classList.remove("active-ball")
    }
  } 
}


//Creates number of balls depending value user selects
function createBalls(beats) {
  const beatPlace = document.getElementById("beatPlace")
  let child = beatPlace.lastElementChild;  
  while (child) { 
    beatPlace.removeChild(child); 
    child = beatPlace.lastElementChild; 
  } 
  
  for (var i = 0; i < beats; i++) {
    const balls = document.createElement("div")
    balls.classList.add("ball", `ball${i+1}`)
    beatPlace.appendChild(balls)
  } 
}


//BeatsPerMinute to Milliseconds conversion
const convert = (bpm) => {
  let milliseconds = ( (60 / bpm) * 1000 ).toFixed(2)
  return milliseconds
}


//Reset Function
const reset = () => {
  clearInterval(isTicking)
  clearInterval(isChangingNumber)
  clearInterval(isChangingColor)
  document.getElementById("playButton").innerHTML = "Play"
  document.getElementById("beatNum").innerHTML = 0
  beatsPerMeasure = 0
}