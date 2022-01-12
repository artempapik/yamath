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
  // rewrite
  'integers': 'Натуральные числа'
}

const themes = {
  algebra: {
    integers: [
      {
        name: 'ряд натуральных чисел',
        href: 'integers'
      },
      { name: 'разряды натуральных чисел' },
      { name: 'сравнение натуральных чисел' },
      {},
      { name: 'сложение натуральных чисел' },
      { name: 'вычитание натуральных чисел' },
      { name: 'умножение. свойства умножения' },
      { name: 'деление. деление с остатком' },
      { name: 'степень числа' },
      {},
      { name: 'числовые и буквенные выражения. формулы' },
      { name: 'уравнения' },
      { name: 'комбинаторные задачи' }
    ],
    fractionals: [
      { name: ' обычные дроби' },
      { name: ' правильные и неправильные дроби. сравнение дробей' },
      { name: ' сложение и вычитание дробей с одинаковыми знаменателями' },
      { name: ' дроби и деление натуральных чисел' },
      { name: ' мешаные числа' },
      {},
      { name: ' десятичные дроби' },
      { name: ' сравнение десятичных дробей' },
      { name: ' округление чисел' },
      { name: ' сложение и вычитание десятичных дробей' },
      { name: ' умножение десятичных дробей' },
      { name: ' деление десятичных дробей' },
      {},
      { name: ' среднее арифметическое' },
      { name: ' проценты' }
    ]
  },
  geometry: [
    { name: 'отрезок' },
    { name: 'плоскость. прямая. луч' },
    { name: 'шкала. координатный луч' },
    {},
    { name: 'угол. виды углов. измерение углов' },
    { name: 'многоугольники. равные фигуры' },
    { name: 'треугольник' },
    { name: 'прямоугольник' },
    {},
    { name: 'площадь. площадь прямоугольника' },
    { name: 'прямоугольный параллелепипед. пирамида' },
    { name: 'объём прямоугольного параллелепипеда' }
  ]
}

for (let i = 0; i < themes.algebra.integers.length; i++) {
  themes.algebra.integers[i].href = `articles/${themes.algebra.integers[i].href}`
}

for (let i = 0; i < themes.algebra.fractionals.length; i++) {
  themes.algebra.fractionals[i].href = `articles/${themes.algebra.fractionals[i].href}`
}

for (let i = 0; i < themes.geometry.length; i++) {
  themes.geometry[i].href = `articles/${themes.geometry[i].href}`
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

app.get('/', (_, res) => res.render('startpage.pug', { themes }))

app.get('/error', (_, res) => res.render('error.pug', { title: articleToTitle['error'] }))

app.listen(port)
