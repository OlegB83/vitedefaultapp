export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  
  element.addEventListener('click', () => {
    setCounter(counter + 1)
    
    // Error 4: TypeError - accessing property of undefined (on click)
    if (counter > 2) {
      const obj = undefined
      console.log(obj.nonExistentProperty)
    }
    
    // Error 5: Network error - failed fetch (on click)
    if (counter % 2 === 0) {
      fetch('https://nonexistent-domain-that-will-fail-12345.com/api')
        .then(response => response.json())
        .catch(err => {
          throw new Error('Failed to fetch data: ' + err.message)
        })
    }
  })
  
  setCounter(0)
  
  // Error 6: Syntax error in eval (delayed, 8 seconds after page load)
  setTimeout(() => {
    eval('this is not valid javascript syntax {{{')
  }, 8000)
}
