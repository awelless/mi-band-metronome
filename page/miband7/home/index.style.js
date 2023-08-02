import {gettext} from "i18n"

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = hmSetting.getDeviceInfo()

export const TEXT_STYLE = {
  x: 20,
  y: 50,
  w: DEVICE_WIDTH - 20 * 2,
  h: 100,
  color: 0xffffff,
  text_size: 64,
  align_h: hmUI.align.CENTER_H,
}

export const DECREASE_BPM_BUTTON_STYLE = {
  x: (DEVICE_WIDTH / 2) - 70,
  y: TEXT_STYLE.y + 80,
  w: 70,
  h: 70,
  text: '-',
  color: 0xffffff,
  normal_color: 0x000000,
  press_color: 0x000000,
  text_size: 36,
}

export const INCREASE_BPM_BUTTON_STYLE = {
  x: DEVICE_WIDTH / 2,
  y: TEXT_STYLE.y + 80,
  w: 70,
  h: 70,
  text: '+',
  color: 0xffffff,
  normal_color: 0x000000,
  press_color: 0x000000,
  text_size: 36,
}

export const START_BUTTON_STYLE = {
  x: 20,
  y: INCREASE_BPM_BUTTON_STYLE.y + INCREASE_BPM_BUTTON_STYLE.h,
  w: DEVICE_WIDTH - 20 * 2,
  h: 70,
  text: 'START',
  color: 0xffffff,
  normal_color: 0x0197f6,
  press_color: 0x89cff0,
  text_size: 36,
  radius: 8,
}

export const START_BUTTON_STARTED_STYLE = {
  ...START_BUTTON_STYLE,
  text: 'STOP',
  color: 0xffffff,
  normal_color: 0xb80f0a,
  press_color: 0xff0800,
}

