import { formsData } from '../data.js'

const body = document.querySelector('body')

document.querySelector('#logo').onpointerup = () => {
  const elementTop = body.getBoundingClientRect().top
  if (elementTop === 0) window.location.pathname = ''
  const elementAmount = elementTop / 100

  const time = 250
  let currentTime = 0

  while (currentTime <= time) {
    setTimeout(() => scrollBy(0, elementAmount), currentTime)
    currentTime += time / 100
  }
}

const modal = document.querySelector('.modal')

window.onpointerup = event => {
  if (event.target === modal) {
    modal.style.display = 'none'
  }
}

const settings = document.querySelector('.icon-gear')
settings.onpointerup = () => modal.style.display = 'flex'

const input = document.querySelector('input')
const iconCircleCross = document.querySelector('#input-section .icon-circle-cross')

const clearInput = () => {
  iconCircleCross.style.display = 'none'
  input.value = ''
}

iconCircleCross.onpointerup = () => {
  clearInput()
  input.focus()
}

input.onkeyup = event => {
  if (event.key === 'Escape') {
    clearInput()
    return
  }

  const inputValue = event.target.value.trim()
  iconCircleCross.style.display = inputValue ? 'block' : 'none'
}

const labels = ['классы', 'темы', 'уровни']

const buttons = [...document.querySelectorAll('button')]

const topicsSection = document.querySelector('#topics')

const fillArticle = data => {
  const section = document.createElement('section')
  
  const subjectSpan = document.createElement('span')
  subjectSpan.classList.add('a')
  subjectSpan.textContent = data.title
  
  const subjectDiv = document.createElement('div')
  section.appendChild(subjectDiv)
  topicsSection.appendChild(section)

  let container = []

  data.themes.forEach(t => {
    let containerToAppend = []

    t.content.forEach(d => {
      if (!d.name) {
        const div = document.createElement('div')
        
        container.forEach(c => div.appendChild(c))
        containerToAppend.push(div)
        containerToAppend.push(document.createElement('br'))
        container = []
  
        return
      }
  
      container.push(listItemWithLink(d))
    })

    const div = document.createElement('div')
    container.forEach(c => div.appendChild(c))
    containerToAppend.push(div)

    const article = document.createElement('article')
    const spanTitle = document.createElement('span')
    spanTitle.textContent = t.title
    article.appendChild(spanTitle)

    const ul = document.createElement('ul')

    containerToAppend.forEach(c => ul.appendChild(c))
    containerToAppend = []
    container = []
    article.appendChild(ul)

    subjectDiv.appendChild(article)
  })
}

const listItemWithLink = theme => {
  const a = document.createElement('a')
  a.textContent = theme.name
  a.href = theme.href

  const li = document.createElement('li')
  li.appendChild(a)

  return li
}

const categories = [...document.querySelectorAll('.category-content')].map(categoryContent => [...categoryContent.querySelectorAll('li')])

let chosenCategoryIndex
let chosenItemIndex = 0

const topics = document.querySelector('#topics')

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

categories.forEach((category, categoryIndex) => {
  category.forEach((categoryItem, categoryItemIndex) => {
    categoryItem.onpointerup = () => {
      chosenCategoryIndex = categoryIndex
      topics.textContent = ''
      
      const aside = document.querySelector('aside')
      aside.textContent = ''

      formsData[chosenCategoryIndex][categoryItemIndex].forEach((data, index) => {
        const div = document.createElement('div')
        div.textContent = data.title
        aside.appendChild(div)

        div.onpointerup = () => {
          if (index === chosenItemIndex) return

          chosenItemIndex = index

          ;[...document.querySelectorAll('aside div')].forEach(d => {
            d.style.fontSize = '1.2rem'
            d.style.background = 'none'
            d.style.color = '#404040'
          })

          div.style.fontSize = '1.5rem'
          div.style.background = 'rgba(153, 50, 204, .7)'
          div.style.color = '#f0f0f0'

          topics.textContent = ''
          fillArticle(formsData[chosenCategoryIndex][categoryItemIndex][index])
        }

        if (index === 0) fillArticle(formsData[chosenCategoryIndex][categoryItemIndex][index])
      })

      buttons.forEach((button, index) => {
        button.querySelector('span').textContent = labels[index]
        button.style.background = 'rgba(255, 255, 255, .9)'
        button.querySelector('span').style.fontWeight = ''
      })

      document.title = `${capitalize(labels[categoryIndex])} – YaMath`

      const button = categoryItem.parentElement.parentElement.childNodes[1]

      body.style.background = 'rgba(248, 248, 248, .2)'
      document.querySelector('header').style.display = 'flex'
      document.querySelector('#main-describe')?.remove()

      button.style.background = 'rgba(153, 50, 204, .3)'
      button.querySelector('span').style.fontWeight = 'bold'
      button.querySelector('span').textContent = categoryItem.textContent

      button.parentNode.querySelector('ul').style.display = 'none'
    }
  })
})

buttons.forEach((button, buttonIndex) => button.onpointerup = () => {
  buttons.forEach((currentButton, currentButtonIndex) => {
    if (currentButton === button) return
    currentButton.parentNode.querySelector('ul').style.display = 'none'

    if (currentButtonIndex === chosenCategoryIndex) return

    currentButton.style.background = 'rgba(255, 255, 255, .9)'
    currentButton.querySelector('span').style.fontWeight = ''
  })

  const categoryContent = button.parentNode.querySelector('ul')

  if (categoryContent.style.display === 'flex') {
    categoryContent.style.display = 'none'

    if (chosenCategoryIndex !== buttonIndex) {
      button.style.background = 'rgba(255, 255, 255, .9)'
      button.querySelector('span').style.fontWeight = ''
    }
  } else {
    categoryContent.style.display = 'flex'
    // button.style.background = 'rgba(153, 50, 204, .3)'
    button.querySelector('span').style.fontWeight = 'bold'
  }
})
