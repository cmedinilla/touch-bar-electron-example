const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarLabel, TouchBarButton, TouchBarSpacer} = TouchBar

const spaces = (num) => Array(num + 1).join(' ')

const changePosition = currentPosition => {
  bar[currentPosition].label = spaces(marqueeText.length)
  if (currentPosition <  6)
    bar[currentPosition + 1].label = marqueeText
  else 
    bar[0].label = marqueeText
}

const bar = []
const marqueeText = 'This is a marquee'

for (let index = 0; index < 7; index++) {
  const labelObject = new TouchBarLabel()
  if (index === 3)
    labelObject.label = marqueeText
  else
    labelObject.label = spaces(marqueeText.length)
  bar.push(labelObject)
}

setInterval(() => {
  let currentPosition
  bar.forEach((e, index) => {
    if (e.label === marqueeText) {
      currentPosition = index
    }
  })
  changePosition(currentPosition)
}, 200)

//touchbar object
const touchBar = new TouchBar(bar)

let window

app.once('ready', () => {
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hiddenInset',
    width: 200,
    height: 200,
    backgroundColor: '#000'
  })
  window.loadURL('about:blank')
  window.setTouchBar(touchBar)
})