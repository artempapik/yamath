import { MIN_FORM, MAX_FORM } from '../constants.js'

const backButton = document.querySelector('#back')
const forwardButton = document.querySelector('#forward')

const path = window.location.pathname
const form = +path.substring(path.indexOf('/') + 1)

const previousForm = form - 1
const nextForm = form + 1

if (previousForm > MIN_FORM) {
  backButton.firstChild.href = `/${previousForm}`
  document.documentElement.style.setProperty('--button-back', `'\\2190  ${previousForm} класс'`)
}

if (nextForm < MAX_FORM) {
  forwardButton.firstChild.href = `/${form + 1}`
  document.documentElement.style.setProperty('--button-forward', `'${nextForm} класс \\2192'`)
}
