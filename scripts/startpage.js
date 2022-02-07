import {
  MIN_FORM,
  MAX_FORM,
  forms,
  engToRus,
  layouts,
  colors
} from '../data.js'

let currentForm = +localStorage.getItem('current-form') || 5
let previousForm = currentForm - 1
let nextForm = currentForm + 1

const mainSelectors = [
  '.algebra',
  '.geometry',
  '.algebra1 .theme-title',
  '.algebra2 .theme-title',
  '.geometry1 .theme-title',
  '.geometry2 .theme-title',
  '.algebra1 ul',
  '.algebra2 ul',
  '.geometry1 ul',
  '.geometry2 ul'
]

const searchSelectors = ['aside .theme-title', 'aside ol']

const toggleElementsVisibilityBySelectors = (selectors, condition) => selectors.forEach(selector => {
  const element = document.querySelector(selector)
  element.style.display = condition ? 'flex' : 'none'
})

const makeOneVisibleAndAnotherInvisible = (first, second) => {
  toggleElementsVisibilityBySelectors(first, true)
  toggleElementsVisibilityBySelectors(second, false)
}

const showSearchResults = () => makeOneVisibleAndAnotherInvisible(searchSelectors, mainSelectors)
const restorePage = () => makeOneVisibleAndAnotherInvisible(mainSelectors, searchSelectors)

const searchInput = document.querySelector('input')

const setCssVariables = (valuesAndVariables, condition) => {
  const documentStyle = document.documentElement.style

  valuesAndVariables.forEach(valueAndVariable => {
    const variable = `--${valueAndVariable[2]}`
    const value = valueAndVariable[+condition]
    documentStyle.setProperty(variable, value)
  })
}

const formButtonClick = increment => {
  searchInput.blur()
  restorePage()

  const fillThemes = (selector, themes) => {
    const ul = document.querySelector(selector)
    ul.innerHTML = ''

    for (const theme of themes) {
      if (!theme.name) {
        ul.appendChild(document.createElement('br'))
        continue
      }
  
      const a = document.createElement('a')
      a.textContent = theme.name
      a.href = theme.href

      const li = document.createElement('li')
      li.appendChild(a)

      ul.appendChild(li)
    }
  }

  const setHtml = (selector, string) => document.querySelector(selector).innerHTML = string

  const fillMain = () => {
    setHtml(mainSelectors[0], form.algebra.name)
    setHtml(mainSelectors[1], form.geometry.name)
    setHtml(mainSelectors[2], form.algebra.algebra1.name)
    setHtml(mainSelectors[3], form.algebra.algebra2.name)
    setHtml(mainSelectors[4], form.geometry.geometry1.name)
    setHtml(mainSelectors[5], form.geometry.geometry2.name)
    fillThemes(mainSelectors[6], form.algebra.algebra1.themes)
    fillThemes(mainSelectors[7], form.algebra.algebra2.themes)
    fillThemes(mainSelectors[8], form.geometry.geometry1.themes)
    fillThemes(mainSelectors[9], form.geometry.geometry2.themes)
  }

  const form = forms[currentForm + increment - 5]
  fillMain()
  
  previousForm += increment
  currentForm += increment
  nextForm += increment

  const toggleFormButtonVisibility = (button, condition) => button.style.display = condition ? 'block' : 'none'

  toggleFormButtonVisibility(currentButton, true)
  toggleFormButtonVisibility(backButton, previousForm > MIN_FORM)
  toggleFormButtonVisibility(forwardButton, nextForm < MAX_FORM)

  const currentFormTitle =  `${currentForm} класс`
  document.title = currentFormTitle
  localStorage.setItem('current-form', currentForm)

  backButton.textContent = `← ${previousForm} класс`
  currentButton.textContent = currentFormTitle
  forwardButton.textContent = `${nextForm} класс →`

  const geometry2Title = document.querySelector('.geometry2 .theme-title')
  const shouldUseTwoColumnLayout = geometry2Title.textContent.length > 0
  setCssVariables(layouts, shouldUseTwoColumnLayout)

  const geometryTitle = document.querySelector('.geometry')
  const pageWidth = document.body.clientWidth
  geometryTitle.style.justifySelf = shouldUseTwoColumnLayout && pageWidth >= 800 && pageWidth <= 1200 ? 'center' : 'start'
}

const htmlElementsFromIds = (...ids) => ids.map(id => document.querySelector(id))

const [backButton, currentButton, forwardButton] = htmlElementsFromIds('#back', '#current', '#forward')

formButtonClick(0, true)

backButton.onpointerup = () => formButtonClick(-1)
currentButton.onpointerup = () => formButtonClick(0)
forwardButton.onpointerup = () => formButtonClick(1)

const allThemes = [].concat.apply([], forms.map(form => [
  ...form.algebra.algebra1.themes,
  ...form.algebra.algebra2.themes,
  ...form.geometry.geometry1.themes,
  ...form.geometry.geometry2.themes
]))

const transliterate = word => word
  .split('')
  .map(symbol => engToRus[symbol] || symbol)
  .join('')

const isLetter = char => (/[а-яА-Яa-zA-Z]/).test(char)

const assignInput = input => {
  input.addEventListener('focus', event => {
    if (event.target.value) showSearchResults()
  })

  input.addEventListener('keydown', event => {
    const char = event.key
    if (!isLetter(char) && char !== ' ') event.preventDefault()
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

    const searchList = document.querySelector('aside ol')
    searchList.innerHTML = ''
  
    allThemes
      .filter(theme => theme.name && theme.name.includes(searchString))
      .map(theme => {
        const a = document.createElement('a')
        a.textContent = theme.name
        a.href = theme.href
  
        const li = document.createElement('li')
        li.appendChild(a)
  
        return li
      })
      .forEach(li => searchList.appendChild(li))
  
    const searchHeader = document.querySelector('aside .theme-title')
    searchHeader.textContent = `Результатов поиска: ${searchList.children.length}`

    showSearchResults()
  })
}

assignInput(searchInput)

document.onclick = () => searchInput.style.inputMode = 'none'
searchInput.addEventListener('pointerup', () => searchInput.focus())

const icons = htmlElementsFromIds('#moon', '#sun')
let isNightMode = !!localStorage.getItem('is-night-mode')

const toggleNightMode = () => {
  setCssVariables(colors, isNightMode)
  isNightMode = !isNightMode

  icons[+isNightMode].style.display = 'none'
  icons[+!isNightMode].style.display = 'block'
}

toggleNightMode()

window.toggleNightMode = () => {
  toggleNightMode()
  localStorage.setItem('is-night-mode', isNightMode ? '' : ' ')
}

window.logIn = () => document.querySelector('.user').innerHTML = 'ты милая Совушка'
