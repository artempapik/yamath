const documentStyle = document.documentElement.style

let isNightMode = !(!!localStorage.getItem('is-night-mode'))

const toggleNightMode = () => {
  // MAKE TRANSITION ON ALL OF IT LATER

  const introBorderColor = isNightMode ? 'rgba(0, 0, 0, .6)' : 'rgba(255, 255, 255, .6)'
  const backgroundColor = isNightMode ? '#faf9f6' : '#303030'
  const mainColor = isNightMode ? '#fff' : '#202020'
  const textColor = isNightMode ? '#202020' : '#e8e8e8'
  const summaryExerciseColor = isNightMode ? '#191970' : '#6495ed'
  const detailsColor = isNightMode ? '#8b0000' : '#ff3333'
  const ruleBorderColor = isNightMode ? '#dc143c' : '#ff8080'
  const questionsBorderColor = isNightMode ? '#ffcd28' : '#ffd280'
  const warningRuleFirstBorderColor = isNightMode ? 'rgba(60, 64, 67, 0.3)' : 'rgba(240, 244, 247, 0.3)'
  const warningRuleSecondBorderColor = isNightMode ? 'rgba(60, 64, 67, 0.15)' : 'rgba(240, 244, 247, 0.15)'

  documentStyle.setProperty('--intro-border-color', introBorderColor)
  documentStyle.setProperty('--background-color', backgroundColor)
  documentStyle.setProperty('--main-color', mainColor)
  documentStyle.setProperty('--text-color', textColor)
  documentStyle.setProperty('--summary-exercise-color', summaryExerciseColor)
  documentStyle.setProperty('--details-color', detailsColor)
  documentStyle.setProperty('--rule-border-color', ruleBorderColor)
  documentStyle.setProperty('--questions-border-color', questionsBorderColor)
  documentStyle.setProperty('--warning-rule-first-border-color', warningRuleFirstBorderColor)
  documentStyle.setProperty('--warning-rule-second-border-color', warningRuleSecondBorderColor)

  isNightMode = !isNightMode
}

toggleNightMode()
