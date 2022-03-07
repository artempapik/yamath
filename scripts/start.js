import { colors, setCssVariables, startPageTranslations } from '../data.js'

const changeIconStyle = (iconDiv, color, scale) => {
  iconDiv.style.color = color
  iconDiv.style.transform = `scale(${scale})`
}

const categories = document.querySelectorAll('a')
const isMobile = 'ontouchstart' in window

if (!isMobile) {
  categories.forEach(category => {
    const iconDiv = category.children[0]
    category.onmouseover = () => changeIconStyle(iconDiv, '#f4c744', 1.2)
    category.onmouseout = () => changeIconStyle(iconDiv, '', 1)
  })
}

const main = document.querySelector('main')
const input = document.querySelector('input')

const setPlaceholderValueAndAlign = (value, align) => {
  input.placeholder = value
  document.documentElement.style.setProperty('--placeholder-align', align)
}

input.onfocus = () => setPlaceholderValueAndAlign('', 'left')
input.onblur = () => setPlaceholderValueAndAlign(` ${startPageTranslations[languageIndex][2]}`, 'center')

const toggleMoonIcon = () => nightModeIcon.classList.toggle('icon-moon')

const toggleNightMode = isNightMode => {
  if (isMobile) categories.forEach(category => changeIconStyle(category.children[0], isNightMode ? '#f4c744' : '#202020', 1.2))

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

const modal = document.querySelector('footer')

document.onclick = event => {
  if (event.target === modal) {
    if (isMobile) {
      document.body.style.overflow = ''
      modal.style.display = 'none'
      setTimeout(() => main.style.pointerEvents = '', 50)
      return
    }

    const duration = 200
    modal.animate([
      { opacity: 1 },
      { transform: 'translateY(-5rem)', opacity: 0 }
    ], { duration })
    setTimeout(() => modal.style.display = 'none', duration)
  }
}

let languageIndex = 0
const languages = ['ru', 'ua', 'en']
const languageBlock = document.querySelector('.language')
const translateSections = document.querySelectorAll('.translate')

languageBlock.onpointerup = () => {
  if (languageIndex == 2) languageIndex = -1
  languageBlock.querySelector('span').textContent = languages[++languageIndex]
  
  translateSections.forEach((section, index) => {
    const translateValue = startPageTranslations[languageIndex][index]
    if (section.nodeName === 'INPUT') {
      section.placeholder = ` ${translateValue}`
      return
    }
    section.textContent = translateValue
  })
}

document.querySelector('.question').onpointerup = () => {
  if (isMobile) main.style.pointerEvents = 'none'
  document.body.style.overflow = 'hidden'
  modal.style.display = 'block'
}
