export default function(bpm, onStrongClick, onMediumClick) {
  const delay = 60000 / bpm
  let counter = 0

  function click() {
    if (counter === 0) {
      onStrongClick()
    } else {
      onMediumClick()
    }

    counter = (counter + 1) % 4
  }

  const currentTimer = timer.createTimer(0, delay, click, {})

  return {
    stop() {
      timer.stopTimer(currentTimer)
    }
  }
}
