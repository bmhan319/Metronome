//Metronome
//1000ms =     1sec =  60bpm
//857ms  = .8571sec =  70bpm
//750ms  =   .75sec =  80bpm 
//667ms  =  .667sec =  90bpm
//500ms  =    .5sec = 120bpm


//Global Variables
let play = false
let isTicking   //variable needs to be placed here to stop setInterval properly
let isChangingNumber   //variable needs to be placed here to stop setInterval properly
let isChangingColor   //variable needs to be placed here to stop setInterval properly
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
let beatsPerMeasure = 0

function metronome2(bpm, beats) {
  const milliseconds = convert(bpm)
  const button = document.getElementById("playButton2")

  createBalls(beats)

  if (play === false) {
    isTicking = setInterval( () => { ticking() }, milliseconds)
    isChangingColor = setInterval( () => {changeBallColor(beats)}, milliseconds)
    isChangingNumber = setInterval( () => {changeBeatNum(beats)}, milliseconds)
    button.innerHTML = "Stop"
  } else if (play === true) {
    clearInterval(isTicking)
    clearInterval(isChangingNumber)
    clearInterval(isChangingColor)
    button.innerHTML = "Play2"
  }

  play = !play
}


function ticking() {
  const accent = document.getElementById("accent")
  const tick = document.getElementById("tick")
  if (beatsPerMeasure === 0) {
    accent.play()
  } else {
    tick.play()
  }
}

function changeBeatNum(beats) {
  const beatNum = document.getElementById("beatNum")
  let arrayOfBeats = []
  
  for (i = 0; i < beats; i++) {
    arrayOfBeats.push(i + 1)
  } 
  
  beatNum.innerHTML = arrayOfBeats[beatsPerMeasure]
  beatsPerMeasure = (beatsPerMeasure + 1) % arrayOfBeats.length;
}

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
