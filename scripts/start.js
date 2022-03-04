import { colors } from '../data.js'

const main = document.querySelector('main')
const categories = ['.forms', '.themes', '.levels'].map(selector => document.querySelector(selector))
const isMobile = 'ontouchstart' in window

if (isMobile) {
  document.querySelector('.icon-desktop').classList.replace('icon-desktop', 'icon-mobile')
}

const changeIconStyle = (iconDiv, color, scale, opacity) => {
  iconDiv.style.color = color
  iconDiv.style.transform = `scale(${scale})`
  iconDiv.children[0].style.opacity = opacity
}

const resetCategoriesColors = () => categories.forEach(category => {
  changeIconStyle(category.children[0], '', 1, .8)
  category.style.background = ''
  category.style.color = ''
})

const hideCategoriesArrows = () => categories.forEach(category => category.querySelector('.category a').style.display = 'none')

const resetCategoriesStyles = () => {
  resetCategoriesColors()
  hideCategoriesArrows()
}

const iconHover = category => {
  changeIconStyle(category.children[0], '#f4c744', 1.2, 1)
  category.querySelector('.category a').style.display = 'block'
}

categories.forEach(category => {
  if (isMobile) {
    category.onpointerup = () => {
      resetCategoriesStyles()
      category.style.background = '#202020'
      category.style.color = '#f8f8f8'  
      iconHover(category)
    }

    document.body.onpointerup = event => {
      if (event.target !== main && event.target !== input) return
      resetCategoriesStyles()
    }

    return
  }

  category.onmouseover = () => {
    hideCategoriesArrows()
    iconHover(category)
  }

  category.onmouseout = () => {
    hideCategoriesArrows()
    changeIconStyle(category.children[0], '', 1, .8)
  }
})

const input = document.querySelector('input')
const searchPlaceholder = input.placeholder

const setPlaceholderValueAndAlign = (value, align) => {
  input.placeholder = value
  document.documentElement.style.setProperty('--placeholder-align', align)
}

input.onfocus = () => setPlaceholderValueAndAlign('', 'left')
input.onblur = () => setPlaceholderValueAndAlign(searchPlaceholder, 'center')

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

const dropdown = document.querySelector('.dropdown')

const handleDropdown = (display, zIndex, opacity, overflow) => {
  if (!isMobile) return

  dropdown.style.display = display
  const duration = 200

  ;[...main.children].slice(3, -1).forEach(element => {
    element.animate([
      { opacity: element.style.opacity || .9 },
      { opacity }
    ], { duration })

    setTimeout(() => {
      element.style.opacity = opacity
      element.style.zIndex = zIndex
    }, duration)
  })

  document.body.style.overflow = overflow
}

const toggleNightMode = isNightMode => {
  themeIcons.forEach(icon => icon.style.color = '')
  themeLabels.forEach(icon => icon.style.fontWeight = 'normal')

  if (isNightMode === 'system') {
    if (window.matchMedia) {
      setCssVariables(colors, window.matchMedia('(prefers-color-scheme: dark)').matches)
    }

    themeIcons[2].style.color = isMobile ? '#b11b1b' : getIconHoverColor()
    themeLabels[2].style.fontWeight = 'bold'
    localStorage.setItem('is-night-mode', isNightMode)
    
    return
  }

  setCssVariables(colors, isNightMode)
  themeIcons[+isNightMode].style.color = isMobile ? '#b11b1b' : getIconHoverColor()
  themeLabels[+isNightMode].style.fontWeight = 'bold'
  localStorage.setItem('is-night-mode', isNightMode ? ' ' : '')
}

const nightModeValue = localStorage.getItem('is-night-mode')
let isNightMode = nightModeValue === 'system' ? 'system' : !!nightModeValue
toggleNightMode(isNightMode)

const dropdownButton = document.querySelector('.dropdown-button')
const dropdownArrow = document.querySelector('.dropdown-button i')

const classes = ['icon-palette', 'icon-angle-down']

const animateElements = (selectors, translateY, duration = 250) => selectors.forEach(selector => document
  .querySelector(selector)
  .animate([
    { transform: `translateY(${translateY}em)`, opacity: '.3' },
    { transform: 'translateY(0)', opacity: '1' }
  ], { duration })
)

dropdownButton.onclick = () => {
  if (isMobile) return
  dropdownArrow.classList.remove(classes[0])
  dropdownArrow.classList.add(classes[1])
  ;[classes[0], classes[1]] = [classes[1], classes[0]]
  animateElements(['.dropdown'], .15)
  animateElements(['.dropdown-button i'], .05)
}

const dropdownOpacity = .88
const dropdownMarginDuration = 200

window.openThemeDropdown = () => {
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block'
  handleDropdown('block' /* ??? */, -1, .08, 'hidden')

  if (isMobile) {
    dropdown.animate([
      { marginTop: '25%', opacity: 0 },
      { marginTop: '40%', opacity: dropdownOpacity }
    ], { duration: dropdownMarginDuration })
  
    dropdown.style.opacity = dropdownOpacity
    dropdownButton.style.pointerEvents = 'none'
  }
}

window.toggleNightMode = isNightMode => toggleNightMode(isNightMode)
document.onclick = () => input.style.inputMode = 'none'

window.onclick = event => {
  if (!isMobile) return

  if (event.target === main) {
    dropdown.animate([
      { marginTop: '40%', opacity: dropdownOpacity },
      { marginTop: '20%', opacity: 0 }
    ], { duration: dropdownMarginDuration })
    
    dropdown.style.opacity = 0
    setTimeout(() => {
      handleDropdown('none', 'auto', dropdownOpacity, 'auto')
      dropdownButton.style.pointerEvents = ''
    }, dropdownMarginDuration)
  }
}

window.matchMedia('(prefers-color-scheme: dark)').onchange = event => {
  if (localStorage.getItem('is-night-mode') === 'system') {
    setCssVariables(colors, event.matches)
    themeIcons[2].style.color = isMobile ? '#b11b1b' : getIconHoverColor()
  }
}
