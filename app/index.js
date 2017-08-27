let counter = 0;
const url = "https://api.icndb.com/jokes/random/50";
const jokeText = document.querySelector(".joke-text");
const prevButton = document.querySelector("button[type=button][value=Prev]");
const nextButton = document.querySelector("button[type=button][value=Next]");
const fetchButton = document.querySelector("button[type=button][value=Fetch]");

async function fetchJokes() {
  let jokes = [];
  let data = await (await fetch(url)).json();
  let responseLength = Object.keys(data.value).length;
  for (let i = 0; i < responseLength; i++) {
    jokes[i] = data.value[i].joke;
  }
  return jokes;
}

function prevJoke(jokes) {
  if (counter === 0) {
    counter = jokes.length; // place our counter at the end of the array
  }
  counter--;
  return jokes[counter]; // give us back the actual item
}

function nextJoke(jokes) {
  counter++;
  counter %= jokes.length; // start from 0 if we get to the end of the array
  return jokes[counter]; // give us back the actual item
}

function printJoke(joke) {
  jokeText.textContent = joke;
}

prevButton.addEventListener("click", () => {
  printJoke(prevJoke(jokes));
});

nextButton.addEventListener("click", () => {
  printJoke(nextJoke(jokes));
});

fetchButton.addEventListener("click", () => {
  fetchJokes().then(dataFetch => jokes = dataFetch);
});
