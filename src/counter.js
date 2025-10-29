export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
    
    // Error 4: TypeError - accessing property of undefined
    const obj = undefined
    console.log(obj.nonExistentProperty)
  }
  
  element.addEventListener('click', () => {
    setCounter(counter + 1)
    
    // Error 5: Network error - failed fetch
    fetch('https://nonexistent-domain-that-will-fail-12345.com/api')
      .then(response => response.json())
      .catch(err => {
        // This will cause an error to be logged
        throw new Error('Failed to fetch data: ' + err.message)
      })
  })
  
  setCounter(0)
  
  // Error 6: Syntax error in eval (runtime)
  setTimeout(() => {
    eval('this is not valid javascript syntax {{{')
  }, 3000)
}
