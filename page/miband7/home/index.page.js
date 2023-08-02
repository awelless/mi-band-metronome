import {
  DECREASE_BPM_BUTTON_STYLE,
  INCREASE_BPM_BUTTON_STYLE,
  START_BUTTON_STARTED_STYLE,
  START_BUTTON_STYLE,
  TEXT_STYLE
} from './index.style'
import startClicker from '../../../lib/clicker'
import createBpm from '../../../lib/bpm'
import vibrate from '../../../lib/vibrate'

const logger = DeviceRuntimeCore.HmLogger.getLogger('metronome')

const brightness = hmSetting.getBrightness()
const autoBright = hmSetting.getScreenAutoBright()
const SET_BRIGHT_SECONDS = 1800 // bigger values cause app to crash

const StoppedState = function (holder) {
  this.bpm = holder.context.bpm

  this.onDecreaseButtonClick = function () {
    this.bpm.decrease()
  }
  this.onIncreaseButtonClick = function () {
    this.bpm.increase()
  }
  this.onStartButtonClick = function () {
    holder.context.startButton.setProperty(hmUI.prop.MORE, START_BUTTON_STARTED_STYLE)

    logger.debug(`Starting clicker with ${this.bpm.get()} bpm...`)

    const clicker = startClicker(
      this.bpm.get(),
      () => vibrate('strong'),
      () => vibrate('medium'),
    )

    logger.debug('Clicker has started')

    hmSetting.setBrightness(1)
    hmSetting.setBrightScreen(SET_BRIGHT_SECONDS)

    holder.updateState(new StartedState(holder, clicker))
  }
}

const StartedState = function (holder, clicker) {
  this.onDecreaseButtonClick = function () {
  }
  this.onIncreaseButtonClick = function () {
  }
  this.onStartButtonClick = function () {
    logger.debug('Stopping clicker...')
    clicker?.stop()
    logger.debug('Clicker has stopped')

    holder.context.startButton.setProperty(hmUI.prop.MORE, START_BUTTON_STYLE)

    hmSetting.setScreenAutoBright(autoBright)
    hmSetting.setBrightness(brightness)
    hmSetting.setBrightScreenCancel()

    holder.updateState(new StoppedState(holder))
  }
}

const StateHolder = function () {
  this.initialize = function (bpm, startButton) {
    this.context = {
      bpm: bpm,
      startButton: startButton,
    }
    this.state = new StoppedState(this)
  }

  this.updateState = function (state) {
    this.state = state
  }
}

Page({
  onInit() {
    logger.debug('page onInit invoked')
  },
  build() {
    logger.debug('page build invoked')

    const bpmText = hmUI.createWidget(hmUI.widget.TEXT, TEXT_STYLE)
    const bpm = createBpm(newBpm => this.setBpmText(bpmText, newBpm))
    this.setBpmText(bpmText, bpm.get())

    const stateHolder = new StateHolder()

    hmUI.createWidget(hmUI.widget.BUTTON, {
      ...DECREASE_BPM_BUTTON_STYLE,
      click_func: () => stateHolder.state.onDecreaseButtonClick(),
    })

    hmUI.createWidget(hmUI.widget.BUTTON, {
      ...INCREASE_BPM_BUTTON_STYLE,
      click_func: () => stateHolder.state.onIncreaseButtonClick(),
    })

    const startButton = hmUI.createWidget(hmUI.widget.BUTTON, {
      ...START_BUTTON_STYLE,
      click_func: () => stateHolder.state.onStartButtonClick(),
    })

    stateHolder.initialize(bpm, startButton)
  },
  setBpmText(bpmText, bpm) {
    bpmText.setProperty(hmUI.prop.MORE, {text: bpm})
  },
  onDestroy() {
    logger.debug('page onDestroy invoked')

    vibrate.stop()

    hmSetting.setScreenAutoBright(autoBright)
    hmSetting.setBrightness(brightness)
    hmSetting.setBrightScreenCancel()
  },
})
