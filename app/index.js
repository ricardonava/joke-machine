const jokeText = document.querySelector('.joke-text');
const prevButton = document.querySelector('button[type=button][value=Prev]');
const nextButton = document.querySelector('button[type=button][value=Next]');
const fetchButton = document.querySelector('button[type=button][value=Fetch]');

// Create async function that will use the url
// to fetch the jokes and store it in a local array
async function fetchJokes() {
  let url = 'https://api.icndb.com/jokes/random/5';
  let jokes = [];
  let data = await (await fetch(url)).json();
  data = data.value;
  for (joke in data) {
    jokes.push(data[joke].joke);
  }
  return jokes;
}

const jokeDispenser = (function() {
  let counter = 0; //start counter at position 0 of jokes array
  function change(position) {
    counter += position;
  }
  return {
    nextJoke: function() {
      change(1);
      counter %= jokes.length; // start from 0 if we get to the end of the array
      return jokes[counter];
    },
    prevJoke: function() {
      if (counter === 0) {
        counter = jokes.length; // place our counter at the end of the array
      }
      change(-1);
      return jokes[counter];
    }
  };
})();

function printJoke(joke) {
  jokeText.textContent = joke;
}

fetchButton.addEventListener('click', () => {
  fetchJokes().then(data => (jokes = data));
});

prevButton.addEventListener('click', () => {
  printJoke(jokeDispenser.prevJoke(jokes));
});

nextButton.addEventListener('click', () => {
  printJoke(jokeDispenser.nextJoke(jokes));
});
