const jokeContainer = document.querySelector('.joke-container');
let jokesArray = JSON.parse(localStorage.getItem('jokesData'));

// Fetch joke count from API endpoint
async function sizeJokesArray() {
  let url = 'https://api.icndb.com/jokes/count';
  let data = await (await fetch(url)).json();
  data = data.value;
  return data;
}

// use API endpoint to fetch the jokes and store it in an array
async function fetchJokes() {
  let url = `https://api.icndb.com/jokes/random/${length}`; // We are using length provided by sizeJokesArray()
  let jokesData = [];
  let data = await (await fetch(url)).json(); // We get the response and parse it to JSON
  data = data.value;
  for (jokePosition in data) {
    jokesData.push(data[jokePosition].joke);
  }
  jokesArray = jokesData; // The first time we load the data we fill jokesArray with the response object
  return localStorage.setItem('jokesData', JSON.stringify(jokesData)); // Create local storage with the response object
}

if (jokesArray === null) {
  sizeJokesArray()
    .then(size => (length = size)) // Size of array in response
    .then(fetchJokes);
}

const jokeDispenser = (function() {
  let counter = 0; //start counter at position 0 of jokes array
  function _change(position) {
    counter += position;
  }
  return {
    nextJoke: function() {
      _change(1);
      counter %= jokesArray.length; // start from 0 if we get to the end of the array
      return jokesArray[counter];
    },
    prevJoke: function() {
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
jokeContainer.addEventListener('click', event => {
  if (event.target.value === 'Next') {
    printJoke(jokeDispenser.prevJoke(jokesArray));
  } else if (event.target.value === 'Prev') {
    printJoke(jokeDispenser.nextJoke(jokesArray));
  }
});
