import { formsData, setCssVariables } from '../data.js'

const body = document.querySelector('body')

const isMobile = 'ontouchstart' in window

document.querySelector('#logo').onpointerup = () => {
  if (body.getBoundingClientRect().top === 0) window.location.pathname = ''

  scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}

const modal = document.querySelector('.modal')

window.onpointerup = event => {
  if (event.target === modal) {
    modal.style.display = 'none'
  }
}

const nightModeIcon = document.querySelector('#nightModeIcon')

const pageColors = [
  ['255, 255, 255', '0, 0, 0', 'background-color'],
  ['80, 80, 80', '240, 240, 240', 'topic-color'],
  ['255, 255, 255', '0, 0, 0', 'background-gradient-color'],
  ['.83', '.91', 'background-gradient-opacity'],
  ['153, 50, 204', '112, 155, 138', 'main-color'],
  ['0, 0, 0', '255, 255, 255', 'topic-hover-color'],
  ['#404040', '#f0f0f0', 'algebra-geometry-color'],
  ['#3d3d3d', '#f3f3f3', 'button-color'],
  ['#f3f3f3', '#404040', 'header-background-color']
]

const toggleNightMode = () => {
  setCssVariables(pageColors, false)
}

const colorThemeSelect = document.querySelector('#color-theme-select')

colorThemeSelect.onchange = () => {
  const themeIndex = colorThemeSelect.selectedIndex

  setCssVariables(pageColors, !!themeIndex)
  
  const nightModeIcons = ['new-icon-light', 'new-icon-dark', 'icon-desktop']
  nightModeIcon.className = nightModeIcons[themeIndex]
}

toggleNightMode()

const labels = ['классы', 'темы', 'уровни']

const buttons = [...document.querySelectorAll('button:not(#signin)')]

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
            d.style.fontSize = isMobile ? '1rem' : '1.2rem'
            d.style.background = 'none'
            d.style.color = 'var(--algebra-geometry-color)'
          })

          div.style.fontSize = isMobile ? '1.3rem' : '1.5rem'
          div.style.background = 'rgba(var(--main-color), .7)'
          div.style.color = '#f0f0f0'

          topics.textContent = ''
          fillArticle(formsData[chosenCategoryIndex][categoryItemIndex][index])
        }

        if (index === 0) fillArticle(formsData[chosenCategoryIndex][categoryItemIndex][index])
      })

      buttons.forEach((button, index) => {
        button.querySelector('span').textContent = labels[index]
        button.style.background = 'rgba(var(--background-color), .9)'
        button.querySelector('span').style.fontWeight = ''
      })

      document.title = `${capitalize(labels[categoryIndex])} – YaMath`

      const button = categoryItem.parentElement.parentElement.childNodes[1]

      document.querySelector('header').style.display = 'flex'

      const mainDescribe = document.querySelector('#main-describe')

      if (mainDescribe) {
        mainDescribe.remove()

        const backgroundGradientLine = 'rgba(var(--background-gradient-color), var(--background-gradient-opacity))'
        body.style.background = `linear-gradient(
          ${backgroundGradientLine},
          ${backgroundGradientLine}
        ), url('main-background.jpg')`

        document.querySelector('footer').style.display = 'flex'
      }

      button.style.background = 'rgba(var(--main-color), .3)'
      if (!isMobile) button.querySelector('span').style.fontWeight = 'bold'
      button.querySelector('span').textContent = categoryItem.textContent

      button.parentNode.querySelector('ul').style.display = 'none'
    }
  })
})

const hideDropdownContent = event => buttons.forEach((button, categoryIndex) => {
  const categoryContent = button.parentNode.querySelector('ul')
  const categoryItems = [...categoryContent.querySelectorAll('li')]

  if (!categoryItems.some(categoryItem => categoryItem === event.target)) {
    if (categoryIndex !== chosenCategoryIndex) button.querySelector('span').style.fontWeight = ''
    categoryContent.style.display = 'none'
  }
})

document.onpointerdown = event => hideDropdownContent(event)
document.onscroll = event => hideDropdownContent(event)

buttons.forEach((button, buttonIndex) => button.onpointerup = () => {
  buttons.forEach((currentButton, currentButtonIndex) => {
    if (currentButton === button) return
    currentButton.parentNode.querySelector('ul').style.display = 'none'

    if (currentButtonIndex === chosenCategoryIndex) return

    currentButton.style.background = 'rgba(var(--background-color), .9)'
    currentButton.querySelector('span').style.fontWeight = ''
  })

  const categoryContent = button.parentNode.querySelector('ul')

  if (categoryContent.style.display === 'flex') {
    categoryContent.style.display = 'none'

    if (chosenCategoryIndex !== buttonIndex) {
      button.style.background = 'rgba(var(--background-color), .9)'
      button.querySelector('span').style.fontWeight = ''
    }
  } else {
    categoryContent.style.display = 'flex'
    if (!isMobile) button.querySelector('span').style.fontWeight = 'bold'
  }
})
