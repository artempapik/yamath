import { MIN_FORM, MAX_FORM, themes, engToRus } from '../constants.js'

const backButton = document.querySelector('#back')
const currentButton = document.querySelector('#current')
const forwardButton = document.querySelector('#forward')

const isMobile = 'ontouchstart' in document

let currentForm = +localStorage.getItem('current-form') || 5
let previousForm = currentForm - 1
let nextForm = currentForm + 1

const main = document.querySelector('main')
let allMarkup = main.innerHTML

const inputDesktop = document.querySelector('#desktop')
const inputMobile = document.querySelector('#mobile')

const documentStyle = document.documentElement.style
documentStyle.setProperty('--button-current', `'${currentForm} класс'`)

if (previousForm > MIN_FORM) {
  documentStyle.setProperty('--button-back', `'\\2190  ${previousForm} класс'`)
  backButton.style.visibility = 'visible'
} else {
  backButton.style.display = 'none'
}

if (nextForm < MAX_FORM) {
  documentStyle.setProperty('--button-forward', `'${nextForm} класс \\2192'`)
  forwardButton.style.visibility = 'visible'
} else {
  forwardButton.style.display = 'none'
}

const divWithClass = className => {
  const div = document.createElement('div')
  div.classList.add(className)
  return div
}

const restorePage = () => {
  if (main.innerHTML !== allMarkup) {
    main.innerHTML = allMarkup
  }
}

const formButtonClick = (increment, createPage) => {
  if (inputMobile) {
    inputMobile.blur()
  }

  if (increment === 0 && !createPage) {
    restorePage()
    return
  }

  const form = themes[currentForm + increment - 5]

  const getMarkupFromThemes = (element, themes) => {
    for (const theme of themes) {
      if (!theme.name) {
        element.appendChild(document.createElement('br'))
        continue
      }
  
      const link = document.createElement('a')
      link.textContent = theme.name
      link.href = theme.href

      const paragraph = document.createElement('p')
      paragraph.appendChild(link)

      element.appendChild(paragraph)
    }
  }

  const appendChildren = (element, ...children) => children.forEach(child => element.appendChild(child))

  const createSubjectWithThemes = (subjectClassName, ...themeClassNames) => {
    const subject = divWithClass(subjectClassName)
    const theme = divWithClass('themes')
    const themes = themeClassNames.map(themeClassName => divWithClass(themeClassName))
    appendChildren(theme, ...themes)
    subject.appendChild(theme)
    
    return subject
  }

  const algebra = createSubjectWithThemes('algebra', 'integers', 'fractionals')
  getMarkupFromThemes(algebra.firstChild.children[0], form.algebra.integers)
  getMarkupFromThemes(algebra.firstChild.children[1], form.algebra.fractionals)

  const geometry = createSubjectWithThemes('geometry', 'intro')
  getMarkupFromThemes(geometry.firstChild.children[0], form.geometry)

  main.innerHTML = ''
  appendChildren(main, algebra, geometry)
  
  previousForm += increment
  currentForm += increment
  nextForm += increment

  if (previousForm > MIN_FORM) {
    backButton.style.visibility = 'visible'
    backButton.style.display = 'inline'
  } else {
    backButton.style.display = 'none'
  }
  
  if (nextForm < MAX_FORM) {
    forwardButton.style.visibility = 'visible'
    forwardButton.style.display = 'inline'
  } else {
    forwardButton.style.display = 'none'
  }

  document.title = `${currentForm} класс`
  localStorage.setItem('current-form', currentForm)
  allMarkup = main.innerHTML

  documentStyle.setProperty('--button-back', `'\\2190  ${previousForm} класс'`)
  documentStyle.setProperty('--button-forward', `'${nextForm} класс \\2192'`)
  documentStyle.setProperty('--button-current', `'${currentForm} класс'`)
}

formButtonClick(0, true)

backButton.onpointerup = () => formButtonClick(-1)
currentButton.onpointerup = () => formButtonClick(0)
forwardButton.onpointerup = () => formButtonClick(1)

const fifth = themes[0] // todo sometime
const allThemes = [...fifth.algebra.integers, ...fifth.algebra.fractionals, ...fifth.geometry] // todo also

let searchMarkup = ''

const transliterate = word => word
  .split('')
  .map(symbol => engToRus[symbol] || symbol)
  .join('')

const assignInput = input => {
  if (!input) {
    return
  }

  input.addEventListener('focus', event => {
    if (event.target.value && main.innerHTML !== searchMarkup) {
      if (!searchMarkup) {
        searchMarkup = localStorage.getItem('search-markup')
        const searchHeader = localStorage.getItem('search-header')
        documentStyle.setProperty('--search-header', searchHeader)
      }

      main.innerHTML = searchMarkup
    }
  })

  input.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
      input.value = ''
      restorePage()
      return
    }

    const inputValue = event.target.value.trim()

    if (!inputValue) {
      restorePage()
      return
    }

    const searchString = transliterate(inputValue.toLowerCase())
    const searchResult = divWithClass('search-result')
  
    allThemes
      .filter(theme => theme.name && theme.name.includes(searchString))
      .map(theme => {
        const link = document.createElement('a')
        link.textContent = theme.name
        link.href = theme.href
  
        const paragraph = document.createElement('p')
        paragraph.appendChild(link)
  
        return paragraph
      })
      .forEach(paragraph => searchResult.appendChild(paragraph))
  
    main.innerHTML = ''
    main.appendChild(searchResult)

    searchMarkup = main.innerHTML
    localStorage.setItem('search-markup', searchMarkup)

    const searchHeader = `'Результатов поиска: ${searchResult.children.length}'`
    localStorage.setItem('search-header', searchHeader)
    documentStyle.setProperty('--search-header', searchHeader)
  })
}

assignInput(inputDesktop)
assignInput(inputMobile)

const moon = document.querySelector('#moon')
const sun = document.querySelector('#sun')
const icons = [sun, moon]

if (isMobile) {
  document.onclick = () => inputMobile.style.inputMode = 'none'
  inputMobile.addEventListener('pointerup', () => inputMobile.focus())

  for (let i = 0; i < icons.length; i++) {
    icons[i].classList.remove('fa-2x')
    icons[i].classList.add('fa-4x')
  }
}

let isNightMode = !(!!localStorage.getItem('is-night-mode'))

const toggleNightMode = () => {
  const backgroundColor = isNightMode ? '#f8f8f8' : '#202020'
  const textColor = isNightMode ? '#202020' : '#e8e8e8'
  const themeBorderColor = isNightMode ? '#00008b' : 'red'
  const themeHoverColor = isNightMode ? '#d2691e' : '#708090'
  const inputBackgroundColor = isNightMode ? '#fff' : '#606060'
  const inputColor = isNightMode ? '#585858' : '#e8e8e8'
  const shadowColor = isNightMode ? 'rgba(0, 0, 0, 0.07)' : 'red'

  documentStyle.setProperty('--background-color', backgroundColor)
  documentStyle.setProperty('--text-color', textColor)
  documentStyle.setProperty('--theme-border-color', themeBorderColor)
  documentStyle.setProperty('--theme-hover-color', themeHoverColor)
  documentStyle.setProperty('--input-background-color', inputBackgroundColor)
  documentStyle.setProperty('--input-color', inputColor)
  documentStyle.setProperty('--shadow-color', shadowColor)

  isNightMode = !isNightMode

  icons[+isNightMode].style.display = 'none'
  icons[+!isNightMode].style.display = 'block'
}

toggleNightMode()

window.toggleNightMode = () => {
  toggleNightMode()
  localStorage.setItem('is-night-mode', isNightMode ? ' ' : '')
}
