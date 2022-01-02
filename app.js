import express from 'express'
import favicon from 'serve-favicon'
import path from 'path'
import pug from 'pug'
import fs from 'fs'

const port = process.env.PORT || 3000
const app = express()
const dirname = path.resolve()

app.use(express.static('css'))
app.use(express.static('font'))
app.use(favicon(`${dirname}/ico/math-logo.ico`))

app.get('/articles/:article', (req, res) => {
  const article = req.params.article
  const path = `${dirname}/${article}.pug`

  if (!fs.existsSync(path)) {
    res.redirect('/error')
    return
  }

  const html = pug.renderFile(path)
  res.send(html)
})

app.get('/', (_, res) => {
  // temporary
  res.redirect('/articles/integers')
})

app.get('/error', (_, res) => {
  const html = pug.renderFile(`${dirname}/error.pug`)
  res.send(html)
})

app.listen(port)
