import {
  MIN_FORM,
  MAX_FORM,
  forms,
  layouts,
  colors,
  setCssVariables
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
  '.geometry2 ul',
  'nav'
]

const searchSelectors = ['aside .search-title', 'aside section']

const toggleElementsVisibilityBySelectors = (selectors, condition) => selectors.forEach(selector => {
  const element = document.querySelector(selector)
  element.style.display = condition ? 'flex' : 'none'
})

const makeOneVisibleAndAnotherInvisible = (first, second) => {
  toggleElementsVisibilityBySelectors(first, true)
  toggleElementsVisibilityBySelectors(second, false)
}

const showSearchResults = () => makeOneVisibleAndAnotherInvisible(searchSelectors, mainSelectors)

let previousSearchesAmount = 0

const restorePage = () => {
  makeOneVisibleAndAnotherInvisible(mainSelectors, searchSelectors)
  previousSearchesAmount = 0
}

;['input', 'i', 'span'].forEach(selector => document
  .querySelectorAll(selector)
  .forEach(element => element.style.display = 'block'))

const animateElements = (selectors, translateY) => selectors.forEach(selector => document
  .querySelector(selector)
  .animate([
    { transform: `translateY(${translateY}em)`, opacity: '.3' },
    { transform: 'translateY(0)', opacity: '1' }
  ], { duration: 250 })
)

const listItemWithLink = theme => {
  const a = document.createElement('a')
  a.textContent = theme.name
  a.href = theme.href

  const li = document.createElement('li')
  li.appendChild(a)
  return li
}

const shouldUseTwoColumnLayout = () => document.querySelector('.geometry2 .theme-title').textContent.length > 0

const correctGeometryTitle = () => {
  const geometryTitle = document.querySelector('.geometry')
  const pageWidth = window.innerWidth
  geometryTitle.style.justifySelf = shouldUseTwoColumnLayout() && pageWidth >= 800 && pageWidth <= 1200 ? 'center' : 'start'
}

const searchInput = document.querySelector('input')

const formButtonClick = increment => {
  searchInput.blur()

  const fillThemes = (selector, themes) => {
    const ul = document.querySelector(selector)
    ul.innerHTML = ''
    themes.forEach(theme => ul.appendChild(theme.name ? listItemWithLink(theme) : document.createElement('br')))
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
  toggleFormButtonVisibility(backButton, previousForm >= MIN_FORM)
  toggleFormButtonVisibility(forwardButton, nextForm <= MAX_FORM)

  const currentFormTitle =  `${currentForm} класс`
  document.title = `${currentFormTitle} – YaMath`
  localStorage.setItem('current-form', currentForm)

  backButton.textContent = `${previousForm} класс`
  currentButton.textContent = currentFormTitle
  forwardButton.textContent = `${nextForm} класс`

  setCssVariables(layouts, shouldUseTwoColumnLayout())
  correctGeometryTitle()

  if (increment === 0) return

  const bodyStyle = document.body.style
  bodyStyle.overflowY = 'hidden'
  animateElements(mainSelectors.slice(2, -1), 1.4)
  setTimeout(() => bodyStyle.overflowY = 'auto', 250)
}

const htmlElementsFromSelectors = (...selectors) => selectors.map(selector => document.querySelector(selector))

const [backButton, currentButton, forwardButton] = document.querySelectorAll('button')

formButtonClick(0, true)

backButton.onpointerup = () => formButtonClick(-1)
currentButton.onpointerup = () => formButtonClick(0)
forwardButton.onpointerup = () => formButtonClick(1)

const formsWithThemes = forms.map(form => {
  return {
    form: form.form,
    themes: [
      ...form.algebra.algebra1.themes,
      ...form.algebra.algebra2.themes,
      ...form.geometry.geometry1.themes,
      ...form.geometry.geometry2.themes
    ]
  }
})

const searchPlaceholder = ' Поиск по теме'
searchInput.placeholder = searchPlaceholder

searchInput.onfocus = () => searchInput.placeholder = searchPlaceholder.slice(2)
searchInput.onblur = () => searchInput.placeholder = searchPlaceholder

searchInput.onkeyup = event => {
  if (event.key === 'Escape') {
    searchInput.value = ''
    restorePage()
    return
  }

  const inputValue = event.target.value.trim()

  if (!inputValue) {
    restorePage()
    return
  }

  const searchString = inputValue.toLowerCase()

  const [searchHeader, searchList] = htmlElementsFromSelectors(...searchSelectors)
  searchList.innerHTML = ''
  let foundSearchesAmount = 0

  formsWithThemes.forEach(form => {
    const p = document.createElement('p')
    p.textContent = `${form.form} класс`

    const ol = document.createElement('ol')

    form.themes
      .filter(theme => theme.name && theme.name.includes(searchString))
      .map(theme => listItemWithLink(theme))
      .forEach(li => ol.appendChild(li))

    if (ol.children.length > 0) {
      searchList.appendChild(p)
      searchList.appendChild(ol)
      foundSearchesAmount += ol.children.length
    }
  })

  searchHeader.textContent = foundSearchesAmount === 0 ? 'Ничего не найдено' : `${foundSearchesAmount} результатов`
  showSearchResults()

  if (previousSearchesAmount === foundSearchesAmount) return

  previousSearchesAmount = foundSearchesAmount
  animateElements(['aside section'], .6)
}

document.onclick = () => searchInput.style.inputMode = 'none'

const toggleNightMode = isNightMode => {
  setCssVariables(colors, isNightMode)
  localStorage.setItem('is-night-mode', isNightMode ? ' ' : '')
}

const nightModeValue = localStorage.getItem('is-night-mode')
let isNightMode = nightModeValue === 'system' ? 'system' : !!nightModeValue
toggleNightMode(isNightMode)

window.toggleNightMode = isNightMode => toggleNightMode(isNightMode)
window.onunload = () => searchInput.value = ''
window.onresize = () => correctGeometryTitle()
