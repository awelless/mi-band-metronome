export default function (onBpmChange) {
  const minBpm = 40
  const maxBpm = 250
  let bpm = 100

  return {
    get() {
      return bpm
    },
    increase() {
      bpm = Math.min(maxBpm, bpm + 1)
      onBpmChange(bpm)
    },
    decrease() {
      bpm = Math.max(minBpm, bpm - 1)
      onBpmChange(bpm)
    },
  }
}
