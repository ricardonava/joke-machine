(() => {
  let jokesArray = JSON.parse(localStorage.getItem('jokes'));

  // Fetch joke count from API endpoint
  async function fetchCount() {
    const url = 'https://api.icndb.com/jokes/count';
    const { value } = await (await fetch(url)).json();
    return value;
  }

  // use API endpoint to fetch the jokes and store it in an array
  // use count as a default parameter to store value from fetchCount()
  async function fetchJokes(count = fetchCount()) {
    const url = `https://api.icndb.com/jokes/random/${await count}`; // Await value provided by fetchCount()

    const { value } = await (await fetch(url)).json(); // Get response object and parse it to JSON

    jokesArray = value.map(({ joke }) => joke); // load jokesArray with the response object

    return localStorage.setItem('jokes', JSON.stringify(jokesArray)); // Set localStorage with jokesArray as the return
  }

  if (jokesArray === null) {
    fetchJokes();
  }

  const jokeDispenser = (() => {
    let counter = 0; //start counter at position 0 of jokesArray
    function _change(position) {
      counter += position;
    }
    return {
      nextJoke: () => {
        _change(1);
        counter %= jokesArray.length; // start from 0 if we get to the end of the array
        return jokesArray[counter];
      },
      prevJoke: () => {
        if (counter === 0) {
          counter = jokesArray.length; // place our counter at the end of the array
        }
        _change(-1);
        return jokesArray[counter];
      }
    };
  })();

  // pass selected joke to print on html element
  function printJoke(joke) {
    document.querySelector('.joke-text p').textContent = joke;
  }

  // Listen to event handlers for prev and next buttons and passes jokesArray as an argument
  const jokeContainer = document.querySelector('.joke-container');  
  jokeContainer.addEventListener('click', event => {
    if (event.target.value === 'Next') {
      printJoke(jokeDispenser.prevJoke(jokesArray));
    } else if (event.target.value === 'Prev') {
      printJoke(jokeDispenser.nextJoke(jokesArray));
    }
  });
})();
