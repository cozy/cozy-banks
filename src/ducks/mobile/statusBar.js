import { getCssVariableValue } from 'cozy-ui/react/utils/color'

export const setColor = color => {
  window.StatusBar.backgroundColorByHexString(color)
}

export const setColorPrimary = () => {
  const color = getCssVariableValue('primary-dark')
  setColor(color)
}

export const setColorDefault = () => {
  const color = getCssVariableValue('coolGrey')
  setColor(color)
}
