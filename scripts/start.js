import { colors, setCssVariables } from '../data.js'

const changeIconStyle = (iconDiv, color, scale) => {
  iconDiv.style.color = color
  iconDiv.style.transform = `scale(${scale})`
}

const categories = document.querySelectorAll('a')

if ('ontouchstart' in window) {
  categories.forEach(category => {
    const iconDiv = category.children[0]
    category.onmouseover = () => changeIconStyle(iconDiv, '#f4c744', 1.2)
    category.onmouseout = () => changeIconStyle(iconDiv, '', 1)
  })
}

const input = document.querySelector('input')
const searchPlaceholder = input.placeholder

const setPlaceholderValueAndAlign = (value, align) => {
  input.placeholder = value
  document.documentElement.style.setProperty('--placeholder-align', align)
}

input.onfocus = () => setPlaceholderValueAndAlign('', 'left')
input.onblur = () => setPlaceholderValueAndAlign(searchPlaceholder, 'center')

const toggleMoonIcon = () => nightModeIcon.classList.toggle('icon-moon')

const toggleNightMode = isNightMode => {
  if ('ontouchstart' in window) categories.forEach(category => changeIconStyle(category.children[0], isNightMode ? '#f4c744' : '#000080', 1.2))

  toggleMoonIcon()
  nightModeIcon.onpointerup = () => toggleNightMode(!isNightMode)
  setCssVariables(colors, isNightMode)
  localStorage.setItem('is-night-mode', isNightMode ? ' ' : '')
}

let isNightMode = !!localStorage.getItem('is-night-mode')
const nightModeIcon = document.querySelector('.theme i')
if (isNightMode) toggleMoonIcon()
toggleNightMode(isNightMode)

document.onclick = () => input.style.inputMode = 'none'
