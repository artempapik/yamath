import express from 'express'
import favicon from 'serve-favicon'
import fs from 'fs'
import path from 'path'

const port = process.env.PORT || 3000
const app = express()
const dirname = path.resolve()

const { MIN_FORM, MAX_FORM, themes } = await import(`file:${dirname}/data/constants.js`)

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
