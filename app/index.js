const jokeContainer = document.querySelector('.joke-container');

// Create async function that will use the url
// to fetch the jokes and store it in a local array
async function fetchJokes() {
  let url = 'https://api.icndb.com/jokes/random/5';
  let jokesArray = [];
  let data = await (await fetch(url)).json();
  data = data.value;
  for (jokePosition in data) {
    jokesArray.push(data[jokePosition].joke);
  }
  return jokesArray;
}

const jokeDispenser = (function() {
  let counter = 0; //start counter at position 0 of jokes array
  function _change(position) {
    counter += position;
  }
  return {
    nextJoke: function() {
      _change(1);
      counter %= jokes.length; // start from 0 if we get to the end of the array
      return jokes[counter];
    },
    prevJoke: function() {
      if (counter === 0) {
        counter = jokes.length; // place our counter at the end of the array
      }
      _change(-1);
      return jokes[counter];
    }
  };
})();

// pass selected joke to print on html element
function printJoke(joke) {
  document.querySelector('.joke-text').textContent = joke;
}

jokeContainer.addEventListener('click', event => {
  if (event.target.value === 'Fetch') {
    fetchJokes().then(data => (jokes = data));
  } else if (event.target.value === 'Next') {
    printJoke(jokeDispenser.prevJoke(jokes));
  } else {
    printJoke(jokeDispenser.nextJoke(jokes));
  }
});
