import express from 'express'
import favicon from 'serve-favicon'
import fs from 'fs'
import path from 'path'

const port = process.env.PORT || 3000
const app = express()
const dirname = path.resolve()
const viewsDir = `${dirname}/views`

app.use(express.static('css'))
app.use(express.static('scripts'))
app.use(express.static('data'))
app.use(express.static('font'))
app.use(express.static('img'))
app.use(favicon(`${dirname}/ico/calculator.png`))

app.get('/articles/:article', (req, res) => {
  const article = `${req.params.article}.pug`
  const path = `${viewsDir}/${article}`

  if (!fs.existsSync(path)) {
    res.redirect('/error')
    return
  }

  res.render(article, { title: 'Ряд натуральных чисел' })
})

const getPage = pageName => `${viewsDir}/${pageName}.html`

app.get('/', (_, res) => res.sendFile(getPage('start')))
app.get('/forms', (_, res) => res.sendFile(getPage('forms')))
app.get('*', (_, res) => res.render('error.pug', { title: 'Ошибка' }))

app.listen(port)
