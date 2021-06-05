const buttons = Array.from(document.getElementsByClassName('number'))
const display = document.getElementById('display')

let savedNum = 0
let saveoperator = ''
let decimalCount = 0

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.getAttribute('action')

    if ((!isNaN(parseInt(action)) || (action === '.' && decimalCount === 0)) && display.textContent.length < 29) {
      if (action === '.') decimalCount++
      display.textContent += action
      if (display.textContent.length > 14) display.style.fontSize = '16px'
    } else if (action !== '=' && action !== '.' && action !== 'ac' && isNaN(parseInt(action))) {
      savedNum = display.textContent ? display.textContent : savedNum
      display.textContent = ''
      saveoperator = action
      decimalCount = 0
    } else if (action === '=') {
      let answer = 0
      switch (saveoperator) {
        case '+':
          answer = parseFloat(savedNum) + parseFloat(display.textContent)
          break
        case '-':
          answer = parseFloat(savedNum) - parseFloat(display.textContent)
          break
        case '*':
          answer = parseFloat(savedNum) * parseFloat(display.textContent)
          break
        case '/':
          answer = parseFloat(savedNum) / parseFloat(display.textContent)
          break
      }
      answer = Math.floor(answer * 1000000000) / 1000000000
      display.textContent = answer
    } else if (action === 'ac') {
      display.textContent = ''
      savedNum = 0
      saveoperator = ''
      decimalCount = 0
    }
  })
})
