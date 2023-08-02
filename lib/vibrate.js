const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)

export default function(strength) {
  vibrate.stop()

  if (strength === 'strong') {
    vibrate.scene = 25
  } else {
    vibrate.scene = 24
  }

  vibrate.start()
}
