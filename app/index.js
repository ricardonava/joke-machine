const jokeContainer = document.querySelector('.joke-container');

// Create async function that will use the url
// to fetch the jokes and store it in a local array
async function sizeJokesArray() {
  let url = 'https://api.icndb.com/jokes/count';
  let data = await (await fetch(url)).json();
  return data.value;
}

async function fetchJokes() {
  let url = `https://api.icndb.com/jokes/random/${length}`;
  let jokesData = [];
  let data = await (await fetch(url)).json();
  for (jokePosition in data.value) {
    jokesData.push(data.value[jokePosition].joke);
  }
  return jokesData;
}

sizeJokesArray().then(size => (length = size));

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
  document.querySelector('.joke-text').textContent = joke;
}

jokeContainer.addEventListener('click', event => {
  if (event.target.value === 'Fetch') {
    fetchJokes(length).then(jokesData => (jokesArray = jokesData));
  } else if (event.target.value === 'Next') {
    printJoke(jokeDispenser.prevJoke(jokesArray));
  } else {
    printJoke(jokeDispenser.nextJoke(jokesArray));
  }
});
