import { MIN_FORM, MAX_FORM, themes } from '../constants.js'

const backButton = document.querySelector('#back')
const forwardButton = document.querySelector('#forward')

const path = window.location.pathname
const currentForm = +path.substring(path.indexOf('/') + 1)

const previousForm = currentForm - 1
const nextForm = currentForm + 1

const documentStyle = document.documentElement.style
documentStyle.setProperty('--button-current', `'${currentForm} класс'`)

if (previousForm > MIN_FORM) {
  backButton.firstChild.href = `/${previousForm}`
  documentStyle.setProperty('--button-back', `'\\2190  ${previousForm} класс'`)
  backButton.style.visibility = 'visible'
} else {
  backButton.style.display = 'none'
}

if (nextForm < MAX_FORM) {
  forwardButton.firstChild.href = `/${nextForm}`
  documentStyle.setProperty('--button-forward', `'${nextForm} класс \\2192'`)
  forwardButton.style.visibility = 'visible'
} else {
  forwardButton.style.display = 'none'
}

// search

const fifth = themes[0] // todo sometime...
const allThemes = [...fifth.algebra.integers, ...fifth.algebra.fractionals, ...fifth.geometry] // todo also

const main = document.querySelector('main')

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
  document.body.addEventListener('click', document.body.focus())
}
