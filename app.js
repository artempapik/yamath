import express from 'express'
import favicon from 'serve-favicon'
import path from 'path'
import fs from 'fs'
import { fifthForm, sixthForm, MIN_FORM, MAX_FORM } from '../yamath/data/constants.js'

const port = process.env.PORT || 3000
const app = express()
const dirname = path.resolve()

app.use(express.static('css'))
app.use(express.static('scripts'))
app.use(express.static('data'))

app.use(express.static('font'))
app.use(express.static('img'))
app.use(favicon(`${dirname}/ico/math-logo.ico`))

const articleToTitle = {
  'error': 'Ошибка',
  // rewrite
  'integers': 'Натуральные числа'
}

const themes = [fifthForm, sixthForm]

const appendArticle = objects => {
  for (let i = 0; i < objects.length; i++) {
    objects[i].href = `articles/${objects[i].href}`
  }
}

for (const theme of themes) {
  appendArticle(theme.algebra.integers)
  appendArticle(theme.algebra.fractionals)
  appendArticle(theme.geometry)
}

app.get('/articles/:article', (req, res) => {
  const article = `${req.params.article}.pug`
  const path = `${dirname}/views/${article}`

  if (!fs.existsSync(path)) {
    res.redirect('/error')
    return
  }

  res.render(article, { title: 'Ряд натуральных чисел' /* articleToTitle[article] think about */ })
})

app.get('/', (_, res) => res.redirect('/5'))

app.get('/error', (_, res) => res.render('error.pug', { title: articleToTitle['error'] }))

app.get('/:form', (req, res) => {
  const form = +req.params.form

  if (!form ||
      form <= MIN_FORM ||
      form >= MAX_FORM) {
    res.redirect('/error')
    return
  }

  res.render('startpage.pug', { form, themes: themes[form - 5] })
})

app.listen(port)
