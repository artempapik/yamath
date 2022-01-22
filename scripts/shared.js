const documentStyle = document.documentElement.style

let isNightMode = !(!!localStorage.getItem('is-night-mode'))

const toggleNightMode = () => {
  const backgroundColor = isNightMode ? '#faf9f6' : '#202020'
  const mainColor = isNightMode ? '#fff' : '#000'
  const textColor = isNightMode ? '#202020' : '#e8e8e8'

  documentStyle.setProperty('--background-color', backgroundColor)
  documentStyle.setProperty('--main-color', mainColor)
  documentStyle.setProperty('--text-color', textColor)

  isNightMode = !isNightMode
}

toggleNightMode()
