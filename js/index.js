//Metronome
//1000ms =     1sec =  60bpm
//857ms  = .8571sec =  70bpm
//750ms  =   .75sec =  80bpm 
//667ms  =  .667sec =  90bpm
//500ms  =    .5sec = 120bpm

//Global Variables
let play = false          //used to start/stop the metronome
let beatsPerMeasure = 0   //keeping count of where the beat is at in the measure
let changeSettings           //variable needs to be placed here to stop setInterval properly
let tempo = 80            //default tempo speed
let timeSig = 4           //default time signature

//On Load, create the default number of balls to match default time signature
window.addEventListener('load', createBalls(timeSig));
//On unLoad, reset slider position back to default of '80'
window.addEventListener('unload', resetSlider(80, 1))


//Master metronome function
const metronome = () => {
  const milliseconds = convert(tempo)
  const button = document.getElementById("playButton")

  createBalls(timeSig)

  if (play === false) {
    pendulum(milliseconds)
    changeSettings = setInterval( () => {
      ticking()
      changeBallColor(timeSig)
      changeBeatNum(timeSig)
      }, milliseconds)
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
  clearInterval(changeSettings)

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

  if (beatsPerMeasure === 0 && accentCheck.checked === true) {
    accent.play()
  } else {
    tick.play()
  }
}


//Changes number to reflect beat within the measure
const changeBeatNum = (beats) => {
  const beatNum = document.getElementById("beatNum")
  
  beatNum.innerHTML = beatsPerMeasure + 1
  //using modulus method to iterate up and then reset back to 1
  beatsPerMeasure = (beatsPerMeasure + 1) % beats;  
}


//Changes ball color to reflect beat within the measure
const changeBallColor = (beats) => {
  const beatBallsWrapper = document.getElementById("beatBallsWrapper")

  for (i = 0; i < beats; i++) {
    if (beatsPerMeasure === 0) {
      beatBallsWrapper.children[0].style.backgroundColor = "rgb(32, 106, 167)"
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
  //first remove all exisiting child ball elements
  while (child) { 
    beatBallsWrapper.removeChild(child); 
    child = beatBallsWrapper.lastElementChild; 
  } 
  
  //then re-add them from a blank slate
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

  //iterates through all balls and removes 'active' classname
  for (let i = 0; i < beatsWrapper.children.length; i++) {
    beatsWrapper.children[i].classList.remove("beatPerMeasure-active")
  }

  //then add 'active classname to selected ball only
  for (let j = 0; j < num; j++) {
    if (num === j + 1) {
      beatsWrapper.children[j - 1].classList.add("beatPerMeasure-active")
    } 
  } 
}


//Update Slider Text Box
function updateInputText(val) {
  tempo = parseInt(val)
  document.getElementById("tempoDisplay").innerHTML = `${tempo} BPM`
  
  //this is set to prevent metronome from starting automatically when user adjusts tempo prior to hitting 'play'
  if (play === true) {
    reset()
    play = false
    metronome()
  }
}


//Tempo change using fine tune buttons next to slider
function tempoChange(val) {
  tempo = tempo + val
  resetSlider(tempo)

  //to prevent user from selecting a number below 25
  if (tempo < 25) {
    tempo = 25
  }
  //to prevent user from selecting a number over 225 
  if (tempo > 225) {
    tempo = 225
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


//Reset Slider
//In order to reset slider, must delete old 'input' tag and add create a new one
//NOTE: using clone() will create new slider but will not reset thumb slider position on reload
function resetSlider(bpm, increment) {
  const slider = document.getElementById("myRange")
  const wrapper = document.getElementById("tempoWrapper")
  const clone = document.createElement("input")
  let key = []
  let val = []
  const attrib = {
    type: "range",
    min: "25",
    max: "225",
    step: increment,
    value: bpm,
    onmouseup: "updateInputText(this.value)",
    id: "myRange"
  }

  key = Object.keys(attrib)
  val = Object.values(attrib)
  clone.classList.add("tempoSlider")

  for (let i = 0; i < key.length; i++) {
    clone.setAttribute(key[i], val[i])
  }
  
  wrapper.removeChild(slider)
  wrapper.insertBefore(clone, wrapper.childNodes[2])
}