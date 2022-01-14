import { MIN_FORM, MAX_FORM, themes } from '../constants.js'

const backButton = document.querySelector('#back')
const forwardButton = document.querySelector('#forward')

const path = window.location.pathname
const form = +path.substring(path.indexOf('/') + 1)

const previousForm = form - 1
const nextForm = form + 1

if (previousForm > MIN_FORM) {
  backButton.firstChild.href = `/${previousForm}`
  document.documentElement.style.setProperty('--button-back', `'\\2190  ${previousForm} класс'`)
} else {
  backButton.style.display = 'none'
  forwardButton.style = 'margin-left: 0'
}

if (nextForm < MAX_FORM) {
  forwardButton.firstChild.href = `/${form + 1}`
  document.documentElement.style.setProperty('--button-forward', `'${nextForm} класс \\2192'`)
} else {
  forwardButton.style.display = 'none'
  backButton.style = 'margin-right: 0'
}

// search

const fifth = themes[0] // todo sometime...
const allThemes = [...fifth.algebra.integers, ...fifth.algebra.fractionals, ...fifth.geometry] // todo also

const assignInput = input => {
  if (!input) {
    return
  }

  input.addEventListener('keyup', e => {
    const searchString = e.target.value
  
    const div = document.createElement('div')
    div.classList.add('algebra')
  
    allThemes
      .filter(i => i.name && i.name.includes(searchString))
      .map(r => {
        const a = document.createElement('a')
        a.textContent = r.name
  
        const p = document.createElement('p')
        p.appendChild(a)
  
        return p
      })
      .forEach(r => div.appendChild(r))
  
    const main = document.querySelector('main')
    main.innerHTML = ''
    main.appendChild(div)
  })
}

const inputDesktop = document.querySelector('.desktop')
const inputMobile = document.querySelector('.mobile')

assignInput(inputDesktop)
assignInput(inputMobile)
