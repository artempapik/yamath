import { colors } from '../data.js'

let textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color')
let backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--body-color')

const categories = ['.forms', '.themes', '.levels'].map(selector => document.querySelector(selector))

const isMobile = 'ontouchstart' in window

categories.forEach((category, index) => {
  const iconDiv = category.children[0]

  if (!isMobile) {
    category.onmouseover = () => {
      changeIconStyle(iconDiv, '#f4c744', 1.2, 1)

      const arrowIcon = category.querySelector('.category a')
      arrowIcon.style.display = 'block'

      for (let i = 0; i < categories.length; i++) {
        if (i === index) continue
        changeIconStyle(categories[i].children[0], textColor, 1, .8)
        categories[i].querySelector('.category a').style.display = 'none'
      }
    }

    category.onmouseout = () => {
      changeIconStyle(iconDiv, getTextColor(), 1, .8)

      for (let i = 0; i < categories.length; i++) {
        categories[i].querySelector('.category a').style.display = 'none'
      }
    }
  }

  if (isMobile) {
    category.onpointerup = () => {
      category.style.background = '#202020'
      category.style.color = '#f8f8f8'
  
      const arrowIcon = category.querySelector('.category a')
      arrowIcon.style.display = 'block'
  
      for (let i = 0; i < categories.length; i++) {
        if (i === index) continue
        changeIconStyle(categories[i].children[0], textColor, 1, .8)
        categories[i].style.background = backgroundColor
        categories[i].style.color = textColor
        categories[i].querySelector('.category a').style.display = 'none'
      }
  
      changeIconStyle(iconDiv, '#f4c744', 1.2, 1)
    }

    document.body.onpointerup = event => {
      if (event.target === document.querySelector('main') ||
          event.target === input) {
        for (let i = 0; i < categories.length; i++) {
          categories[i].style.background = backgroundColor
          categories[i].style.color = textColor
          changeIconStyle(categories[i].children[0], textColor, 1, .8)
          categories[i].querySelector('.category a').style.display = 'none'
        }
      }
    }
  }
})

const changeIconStyle = (iconDiv, color, scale, opacity, background) => {
  iconDiv.style.color = color
  iconDiv.style.transform = `scale(${scale})`
  iconDiv.children[0].style.opacity = opacity
  if (background) iconDiv.parentElement.style.background = background
}

const input = document.querySelector('input')
const searchPlaceholder = input.placeholder

input.onfocus = () => {
  input.placeholder = ''
  document.documentElement.style.setProperty('--placeholder-align', 'left')
}

input.onblur = () => {
  input.placeholder = searchPlaceholder
  document.documentElement.style.setProperty('--placeholder-align', 'center')
}

input.onkeyup = e => {
  if (e.target.value.toLowerCase() === 'хочу вибрацию') {
    // const b = document.createElement('button')
    // b.textContent = 'ёбнуть вибрацию'
    // document.body.appendChild(b)

    if (window.confirm('ёбнуть вибрацию?')) {
      if (window.navigator.vibrate) {
        for (let i = 0; i < 5; i++) {
          window.navigator.vibrate(100)
        }
      }
    }

    e.target.value = ''
  }
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
