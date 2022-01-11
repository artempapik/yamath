import express from 'express'
import favicon from 'serve-favicon'
import path from 'path'
import fs from 'fs'

const port = process.env.PORT || 3000
const app = express()
const dirname = path.resolve()

app.use(express.static('css'))
app.use(express.static('font'))
app.use(express.static('img'))
app.use(favicon(`${dirname}/ico/math-logo.ico`))

const articleToTitle = {
  'error': 'Ошибка',
  'integers': 'Натуральные числа'
}

app.get('/articles/:article', (req, res) => {
  const article = req.params.article
  const path = `${dirname}/${article}.pug`

  if (!fs.existsSync(path)) {
    res.redirect('/error')
    return
  }

  res.render(path, { title: articleToTitle[article] })
})

app.get('/', (_, res) => {
  // temporary
  res.redirect('/articles/integers')
})

app.get('/error', (_, res) => res.render(`${dirname}/error.pug`, { title: articleToTitle['error'] }))

app.listen(port)
