import { MIN_FORM, MAX_FORM, themes } from '../constants.js'

const backButton = document.querySelector('#back')
const currentButton = document.querySelector('#current')
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
  // temporary
  // forwardButton.firstChild.href = `/${nextForm}`
  documentStyle.setProperty('--button-forward', `'${nextForm} класс \\2192'`)
  forwardButton.style.visibility = 'visible'
} else {
  forwardButton.style.display = 'none'
}

let tempCurrentForm = 5
let tempPreviousForm = tempCurrentForm - 1
let tempNextForm = tempCurrentForm + 1

window.current = () => {}

window.forward = () => {
  const sixth = themes[tempNextForm - 5]

  // algebra

  const algebra = document.createElement('div')
  algebra.classList.add('algebra')

  const themes2 = document.createElement('div')
  themes2.classList.add('themes')

  const integers = document.createElement('div')
  integers.classList.add('integers')

  const fractionals = document.createElement('div')
  fractionals.classList.add('fractionals')

  //

  for (const n of sixth.algebra.integers) {
    const par = document.createElement('p')
    const lin = document.createElement('a')
    lin.textContent = n.name
    par.appendChild(lin)
    integers.appendChild(par)
  }

  for (const n of sixth.algebra.fractionals) {
    const par = document.createElement('p')
    const lin = document.createElement('a')
    lin.textContent = n.name
    par.appendChild(lin)
    fractionals.appendChild(par)
  }

  //

  // geometry

  const geometry = document.createElement('div')
  geometry.classList.add('geometry')

  const themes3 = document.createElement('div')
  themes3.classList.add('themes')

  const intro = document.createElement('div')
  intro.classList.add('intro')

  //

  for (const n of sixth.geometry) {
    const par = document.createElement('p')
    const lin = document.createElement('a')
    lin.textContent = n.name
    par.appendChild(lin)
    intro.appendChild(par)
  }

  //

  // appending

  themes2.appendChild(integers)
  themes2.appendChild(fractionals)
  algebra.appendChild(themes2)

  themes3.appendChild(intro)
  geometry.appendChild(themes3)

  document.querySelector('main').innerHTML = ''
  document.querySelector('main').appendChild(algebra)
  document.querySelector('main').appendChild(geometry)

  // WORK ON THIS
  
  tempPreviousForm++
  tempCurrentForm++
  tempNextForm++

  if (tempPreviousForm > MIN_FORM) {
    // backButton.firstChild.href = `/${previousForm}`
    documentStyle.setProperty('--button-back', `'\\2190  ${previousForm} класс'`)
    backButton.style.visibility = 'visible'
    backButton.style.display = 'inline'
  } else {
    backButton.style.display = 'none'
  }
  
  if (tempNextForm < MAX_FORM) {
    // forwardButton.firstChild.href = `/${nextForm}`
    documentStyle.setProperty('--button-forward', `'${nextForm} класс \\2192'`)
    forwardButton.style.visibility = 'visible'
    forwardButton.style.display = 'inline'
  } else {
    forwardButton.style.display = 'none'
  }
}

///////////////////////////

window.back = () => {
  const sixth = themes[tempPreviousForm - 5]

  // algebra

  const algebra = document.createElement('div')
  algebra.classList.add('algebra')

  const themes2 = document.createElement('div')
  themes2.classList.add('themes')

  const integers = document.createElement('div')
  integers.classList.add('integers')

  const fractionals = document.createElement('div')
  fractionals.classList.add('fractionals')

  //

  for (const n of sixth.algebra.integers) {
    if (!n.name) {
      integers.appendChild(document.createElement('br'))
      continue
    }

    const par = document.createElement('p')
    const lin = document.createElement('a')
    lin.textContent = n.name
    par.appendChild(lin)
    integers.appendChild(par)
  }

  for (const n of sixth.algebra.fractionals) {
    if (!n.name) {
      fractionals.appendChild(document.createElement('br'))
      continue
    }

    const par = document.createElement('p')
    const lin = document.createElement('a')
    lin.textContent = n.name
    par.appendChild(lin)
    fractionals.appendChild(par)
  }

  //

  // geometry

  const geometry = document.createElement('div')
  geometry.classList.add('geometry')

  const themes3 = document.createElement('div')
  themes3.classList.add('themes')

  const intro = document.createElement('div')
  intro.classList.add('intro')

  //

  for (const n of sixth.geometry) {
    if (!n.name) {
      intro.appendChild(document.createElement('br'))
      continue
    }

    const par = document.createElement('p')
    const lin = document.createElement('a')
    lin.textContent = n.name
    par.appendChild(lin)
    intro.appendChild(par)
  }

  //

  // appending

  themes2.appendChild(integers)
  themes2.appendChild(fractionals)
  algebra.appendChild(themes2)

  themes3.appendChild(intro)
  geometry.appendChild(themes3)

  document.querySelector('main').innerHTML = ''
  document.querySelector('main').appendChild(algebra)
  document.querySelector('main').appendChild(geometry)

  // WORK ON THIS
  
  tempPreviousForm--
  tempCurrentForm--
  tempNextForm--

  if (tempPreviousForm > MIN_FORM) {
    // backButton.firstChild.href = `/${previousForm}`
    documentStyle.setProperty('--button-back', `'\\2190  ${previousForm} класс'`)
    backButton.style.visibility = 'visible'
    backButton.style.display = 'inline'
  } else {
    backButton.style.display = 'none'
  }
  
  if (tempNextForm < MAX_FORM) {
    // forwardButton.firstChild.href = `/${nextForm}`
    documentStyle.setProperty('--button-forward', `'${nextForm} класс \\2192'`)
    forwardButton.style.visibility = 'visible'
    forwardButton.style.display = 'inline'
  } else {
    forwardButton.style.display = 'none'
  }
}

/////////////////////////

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
  document.onclick = () => inputMobile.style.inputMode = 'none'
}
