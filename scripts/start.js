import { colors } from '../data.js'

['.forms', '.themes', '.levels'].map(selector => document.querySelector(selector)).forEach(element => {
  const iconDiv = element.children[0]
  element.onmouseover = () => changeIconStyle(iconDiv, '#f4c744', 1.2, 1)
  element.onpointerup = () => alert(1)
  element.onmouseout = () => changeIconStyle(iconDiv, getTextColor(), 1, .8)
  element.onpointerup = () => window.location.pathname = element.classList[0]
})

const isMobile = 'ontouchstart' in window

const changeIconStyle = (iconDiv, color, scale, opacity) => {
  iconDiv.style.color = color
  if (!isMobile) iconDiv.style.transform = `scale(${scale})`
  iconDiv.children[0].style.opacity = opacity
}

const input = document.querySelector('input')
const searchPlaceholder = input.placeholder

input.onfocus = () => {
  document.documentElement.style.setProperty('--placeholder-align', 'left')
  input.placeholder = ''
}

input.onblur = () => {
  input.placeholder = searchPlaceholder
  document.documentElement.style.setProperty('--placeholder-align', 'center')
}

const setCssVariables = (valuesAndVariables, condition) => {
  const documentStyle = document.documentElement.style

  valuesAndVariables.forEach(valueAndVariable => {
    const variable = `--${valueAndVariable[2]}`
    const value = valueAndVariable[+condition]
    documentStyle.setProperty(variable, value)
  })
}

const htmlElementsFromSelectors = (...selectors) => selectors.map(selector => document.querySelector(selector))

const themeIcons = htmlElementsFromSelectors(...['light', 'dark', 'system'].map(selector => `#${selector} i`))
const themeLabels = htmlElementsFromSelectors(...['light', 'dark', 'system'].map(selector => `#${selector} span`))

const getIconHoverColor = () => getComputedStyle(document.documentElement).getPropertyValue('--logo-color')
const getTextColor = () => getComputedStyle(document.documentElement).getPropertyValue('--text-color')

const toggleNightMode = isNightMode => {
  themeIcons.forEach(icon => icon.style.color = '')
  themeLabels.forEach(icon => icon.style.fontWeight = 'normal')

  if (isNightMode === 'system') {
    if (window.matchMedia) {
      setCssVariables(colors, window.matchMedia('(prefers-color-scheme: dark)').matches)
    }

    themeIcons[2].style.color = getIconHoverColor()
    themeLabels[2].style.fontWeight = 'bold'
    localStorage.setItem('is-night-mode', isNightMode)
    
    return
  }

  setCssVariables(colors, isNightMode)
  themeIcons[+isNightMode].style.color = getIconHoverColor()
  themeLabels[+isNightMode].style.fontWeight = 'bold'
  localStorage.setItem('is-night-mode', isNightMode ? ' ' : '')
}

const nightModeValue = localStorage.getItem('is-night-mode')
let isNightMode = nightModeValue === 'system' ? 'system' : !!nightModeValue
toggleNightMode(isNightMode)

const dropDownButton = document.querySelector('.dropdown-button')
const dropDownArrow = document.querySelector('.dropdown-button i')

const classes = ['icon-palette', 'icon-angle-down']

const animateElements = (selectors, translateY) => selectors.forEach(selector => document
  .querySelector(selector)
  .animate([
    { transform: `translateY(${translateY}em)`, opacity: '.3' },
    { transform: 'translateY(0)', opacity: '1' }
  ], { duration: 250 })
)

dropDownButton.onclick = () => {
  dropDownArrow.classList.remove(classes[0])
  dropDownArrow.classList.add(classes[1])
  ;[classes[0], classes[1]] = [classes[1], classes[0]]
  animateElements(['.dropdown'], .15)
  animateElements(['.dropdown-button i'], .05)
}

const dropDown = document.querySelector('.dropdown')

window.openThemeDropdown = () => dropDown.style.display = dropDown.style.display === 'block' ? 'none' : 'block'
window.toggleNightMode = isNightMode => toggleNightMode(isNightMode)
document.onclick = () => input.style.inputMode = 'none'
