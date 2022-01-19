import { MIN_FORM, MAX_FORM, themes } from '../constants.js'

const backButton = document.querySelector('#back')
const forwardButton = document.querySelector('#forward')

const path = window.location.pathname

let currentForm = +path.substring(path.indexOf('/') + 1)
let previousForm = currentForm - 1
let nextForm = currentForm + 1

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

const main = document.querySelector('main')

const formButtonClick = increment => {
  const form = themes[currentForm + increment - 5]

  const getMarkupFromThemes = themes => {
    const div = document.createElement('div')

    for (const theme of themes) {
      if (!theme.name) {
        div.appendChild(document.createElement('br'))
        continue
      }
  
      const link = document.createElement('a')
      link.textContent = theme.name

      const paragraph = document.createElement('p')
      paragraph.appendChild(link)

      div.appendChild(paragraph)
    }

    return div.innerHTML
  }

  const divWithClass = className => {
    const div = document.createElement('div')
    div.classList.add(className)
    return div
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
  algebra.firstChild.firstChild.innerHTML = getMarkupFromThemes(form.algebra.integers)
  algebra.firstChild.children[1].innerHTML = getMarkupFromThemes(form.algebra.fractionals)

  const geometry = createSubjectWithThemes('geometry', 'intro')
  geometry.firstChild.firstChild.innerHTML = getMarkupFromThemes(form.geometry)

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
  documentStyle.setProperty('--button-back', `'\\2190  ${previousForm} класс'`)
  documentStyle.setProperty('--button-forward', `'${nextForm} класс \\2192'`)
  documentStyle.setProperty('--button-current', `'${currentForm} класс'`)
}

const back = () => formButtonClick(-1)
const forward = () => formButtonClick(1)

if ('ontouchstart' in window) {
  backButton.ontouchstart = back
  forwardButton.ontouchstart = forward
} else {
  backButton.onclick = back
  forwardButton.onclick = forward
}

// search

const fifth = themes[0] // todo sometime...
const allThemes = [...fifth.algebra.integers, ...fifth.algebra.fractionals, ...fifth.geometry] // todo also


const allMarkup = main.innerHTML

const restorePage = () => {
  if (main.innerHTML !== allMarkup) {
    main.innerHTML = allMarkup
  }
}

const engToRus = {
  'f': 'а',
  ',': 'б',
  'd': 'в',
  'u': 'г',
  'l': 'д',
  't': 'е',
  '`': 'е',
  ';': 'ж',
  'p': 'з',
  'b': 'и',
  'q': 'й',
  'r': 'к',
  'k': 'л',
  'v': 'м',
  'y': 'н',
  'j': 'о',
  'g': 'п',
  'h': 'р',
  'c': 'с',
  'n': 'т',
  'e': 'у',
  'a': 'ф',
  '[': 'х',
  'w': 'ц',
  'x': 'ч',
  'i': 'ш',
  'o': 'щ',
  ']': 'ъ',
  's': 'ы',
  'm': 'ь',
  "'": 'э',
  '.': 'ю',
  'z': 'я'
}

const transliterate = word => word
  .split('')
  .map(symbol => engToRus[symbol] || symbol)
  .join('')

const assignInput = input => {
  if (!input) {
    return
  }

  input.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      input.value = ''
      restorePage()
      return
    }

    const inputValue = e.target.value.trim()

    if (!inputValue) {
      restorePage()
      return
    }

    const searchString = transliterate(inputValue.toLowerCase())
    const div = document.createElement('div')
    div.classList.add('search-result')
  
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
      .forEach(paragraph => div.appendChild(paragraph))
  
    main.innerHTML = ''
    main.appendChild(div)

    documentStyle.setProperty('--search-header', `'Результатов поиска: ${div.children.length}'`)
  })
}

const inputDesktop = document.querySelector('.desktop')
const inputMobile = document.querySelector('.mobile')

assignInput(inputDesktop)
assignInput(inputMobile)

if (inputMobile) {
  document.onclick = () => inputMobile.style.inputMode = 'none'
}
