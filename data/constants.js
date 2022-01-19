const fifthForm = {
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
      { name: 'обычные дроби' },
      { name: 'правильные и неправильные дроби. сравнение дробей' },
      { name: 'сложение и вычитание дробей с одинаковыми знаменателями' },
      { name: 'дроби и деление натуральных чисел' },
      { name: 'смешанные числа' },
      {},
      { name: 'десятичные дроби' },
      { name: 'сравнение десятичных дробей' },
      { name: 'округление чисел' },
      { name: 'сложение и вычитание десятичных дробей' },
      { name: 'умножение десятичных дробей' },
      { name: 'деление десятичных дробей' },
      {},
      { name: 'среднее арифметическое' },
      { name: 'проценты' }
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

const sixthForm = {
  algebra: {
    integers: [
      { name: 'тема 1' },
      { name: 'тест 2' },
      { name: 'ахаха 3 ' }
    ],
    fractionals: [
      { name: 'ну тут шото 1' },
      { name: 'тест короч для второго' },
      { name: 'ну и третье' }
    ]
  },
  geometry: [
    { name: 'а с геометрией' },
    { name: 'дела' },
    { name: 'у нас' },
    { name: 'плачевные' }
  ]
}

const seventhForm = {
  algebra: {
    integers: [
      { name: 'тест' }
    ],
    fractionals: [
      { name: '77' }
    ]
  },
  geometry: [
    { name: 'класса' }
  ]
}

const eigthForm = {
  algebra: {
    integers: [
      { name: 'тест' }
    ],
    fractionals: [
      { name: '8888' }
    ]
  },
  geometry: [
    { name: 'класса' }
  ]
}

const ninethForm = {
  algebra: {
    integers: [
      { name: 'тест' }
    ],
    fractionals: [
      { name: '9' }
    ]
  },
  geometry: [
    { name: 'класса' }
  ]
}

const tenthForm = {
  algebra: {
    integers: [
      { name: 'тест' }
    ],
    fractionals: [
      { name: '1010' }
    ]
  },
  geometry: [
    { name: 'класса' }
  ]
}

const eleventhForm = {
  algebra: {
    integers: [
      { name: 'тест' }
    ],
    fractionals: [
      { name: '111111' }
    ]
  },
  geometry: [
    { name: 'класса' }
  ]
}

const themes = [
  fifthForm,
  sixthForm,
  seventhForm,
  eigthForm,
  ninethForm,
  tenthForm,
  eleventhForm
]

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

const MIN_FORM = 4
const MAX_FORM = 12

export {
  MIN_FORM,
  MAX_FORM,
  themes
}
