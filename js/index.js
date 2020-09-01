//Metronome
//1000ms =     1sec =  60bpm
//857ms  = .8571sec =  70bpm
//750ms  =   .75sec =  80bpm 
//667ms  =  .667sec =  90bpm
//500ms  =    .5sec = 120bpm


//Global Variables
let play = false          //used to start/stop the metronome
let beatsPerMeasure = 0   //keeping count of where the beat is at in the measure
let isTicking             //variable needs to be placed here to stop setInterval properly
let isChangingNumber      //variable needs to be placed here to stop setInterval properly
let isChangingColor       //variable needs to be placed here to stop setInterval properly
let tempo = 80            //default tempo speed
let timeSig = 4           //default time signature


//On Load, create the default number of balls to match default time signature
window.addEventListener('load', createBalls(4));


//Master metronome function
const metronome = () => {
  const milliseconds = convert(tempo)
  const button = document.getElementById("playButton")

  createBalls(timeSig)

  if (play === false) {
    pendulum(milliseconds)
    isTicking = setInterval( () => { ticking() }, milliseconds)
    isChangingColor = setInterval( () => {changeBallColor(timeSig)}, milliseconds)
    isChangingNumber = setInterval( () => {changeBeatNum(timeSig)}, milliseconds)
    button.innerHTML = "Stop"
  } else if (play === true) {
    reset()
  }

  play = !play
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
  document.getElementById("pendulum").classList.remove("swing")
  beatsPerMeasure = 0
}


//Controls the Ticking Audio
const ticking = () => {
  const accent = document.getElementById("accent")
  const tick = document.getElementById("tick")
  const accentCheck = document.getElementById("accentCheck")

  if (beatsPerMeasure === 0) {
    if (accentCheck.checked === true) {
      accent.play()
    } else {
      tick.play()
    }
  } else {
    tick.play()
  }
}

//Changes number to reflect beat within the measure
const changeBeatNum = (beats) => {
  const beatNum = document.getElementById("beatNum")
  
  beatNum.innerHTML = beatsPerMeasure + 1
  beatsPerMeasure = (beatsPerMeasure + 1) % beats;
}


//Changes ball color to reflect beat within the measure
const changeBallColor = (beats) => {
  const beatBallsWrapper = document.getElementById("beatBallsWrapper")

  for (i = 0; i < beats; i++) {
    if (beatsPerMeasure === 0) {
      beatBallsWrapper.children[0].style.backgroundColor = "rgb(43, 160, 255)"
    } else {
      beatBallsWrapper.children[0].style.backgroundColor = "#bbb"
    }

    if (beatsPerMeasure === i) {
      beatBallsWrapper.children[i].classList.add("active-ball")
    } else {
      beatBallsWrapper.children[i].classList.remove("active-ball")
    }
  } 
}


//Creates number of balls depending value user selects
function createBalls(beats) {
  const beatBallsWrapper = document.getElementById("beatBallsWrapper")
  let child = beatBallsWrapper.lastElementChild;  
  while (child) { 
    beatBallsWrapper.removeChild(child); 
    child = beatBallsWrapper.lastElementChild; 
  } 
  
  for (var i = 0; i < beats; i++) {
    const balls = document.createElement("div")
    balls.classList.add("ball", `ball${i+1}`)
    beatBallsWrapper.appendChild(balls)
  } 
}


//Time Signature Change 
const timeSigChange = (num) => {
  const beatsWrapper = document.getElementById("beatsWrapper")
  timeSig = num
  createBalls(timeSig)

  for (let i = 0; i < 11; i++) {
    beatsWrapper.children[i].classList.remove("beatPerMeasure-active")
  }

  for (let j = 0; j < num; j++) {
    if (num === j + 1) {
      beatsWrapper.children[j - 1].classList.add("beatPerMeasure-active")
    } 
  } 
}


//Update Slider Text Box
function updateInputText(val) {
  tempo = parseInt(val)

  //document.getElementById("rangeValue").value = val
  document.getElementById("tempoDisplay").innerHTML = `${tempo} BPM`
  
  //this is set to prevent metronome from starting automatically when user adjusts tempo prior to hitting 'play'
  if (play === true) {
    reset()
    play = false
    metronome()
  }
}


//Tempo change
function tempoChange(val) {
  tempo = tempo + val
  
  if (tempo < 24) {
    tempo = 24
  }

  if (tempo > 240) {
    tempo = 240
  }

  document.getElementById("tempoDisplay").innerHTML = `${tempo} BPM`

  //this is set to prevent metronome from starting automatically when user adjusts tempo prior to hitting 'play'
  if (play === true) {
    reset()
    play = false
    metronome()
  }
}


//Pendulum Swing
const pendulum = (milliseconds) => {
  const pendulum = document.getElementById("pendulum")
  pendulum.classList.add("swing")
  pendulum.style.animationDuration = `${milliseconds * 2}ms` 
}