import { colors, setCssVariables } from '../data.js'

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
input.onblur = () => setPlaceholderValueAndAlign(` ${translations[languageIndex][2]}`, 'center')

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

document.onpointerup = event => {
  if (event.target === modal) {
    if (isMobile) {
      document.body.style.overflowY = ''
      modal.style.display = 'none'
      setTimeout(() => main.style.pointerEvents = '', 50)
      return
    }

    modal.animate([
      { opacity: 1 },
      { transform: 'translateY(-5rem)', opacity: 0 }
    ], { duration: 200 })
    setTimeout(() => modal.style.display = 'none', 200)
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
    const translateValue = translations[languageIndex][index]
    if (section.nodeName === 'INPUT') {
      section.placeholder = ` ${translateValue}`
      return
    }
    section.textContent = translateValue
  })
}

const startRu = [
  'о проекте',
  'сайт для изучающих математику',
  'поиск',
  'смотреть по',
  'классам',
  'смотреть по',
  'темам',
  'смотреть по',
  'уровням'
]

const startUa = [
  'про проєкт',
  'сайт для тих, хто вивчає математику',
  'пошук',
  'дивитися по',
  'класам',
  'дивитися по',
  'темам',
  'дивитися по',
  'рівням'
]

const startEn = [
  'about project',
  'site for those who learn math',
  'search',
  'watch by',
  'forms',
  'watch by',
  'themes',
  'watch by',
  'levels'
]

const translations = [startRu, startUa, startEn]

document.querySelector('.question').onpointerup = () => {
  if (isMobile) {
    document.body.style.overflowY = 'hidden'
    main.style.pointerEvents = 'none'
  }
  modal.style.display = 'block'
}
