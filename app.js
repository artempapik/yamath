import express from 'express'
import favicon from 'serve-favicon'
import fs from 'fs'
import path from 'path'

const port = process.env.PORT || 3000
const app = express()
const dirname = path.resolve()

app.use(express.static('css'))
app.use(express.static('scripts'))
app.use(express.static('data'))
app.use(express.static('font'))
app.use(express.static('img'))
app.use(favicon(`${dirname}/ico/calculator.png`))

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

app.get('/', (_, res) => res.redirect('/forms'))

app.get('/forms', (_, res) => res.render('startpage.pug'))

app.get('*', (_, res) => res.render('error.pug', { title: articleToTitle['error'] }))

app.listen(port)
