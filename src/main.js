import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

// Error 1: ReferenceError - accessing undefined variable
console.log(undefinedVariable.property)

// Error 2: Attempting to use a non-existent function
setTimeout(() => {
  nonExistentFunction()
}, 2000)

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

// Error 3: TypeError - calling method on null
const nullElement = document.querySelector('#nonexistent')
nullElement.addEventListener('click', () => {})

setupCounter(document.querySelector('#counter'))
