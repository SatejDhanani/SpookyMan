// Constants
const words = ["Program", "pokemon", "coding", "Phoenix", "developer","Texas","Arizona"];
let word = "";
let guessedLetters = [];
let incorrectGuesses = 0;
const maxGuesses = 6;
// const parts = ['head', 'body', 'left-limb', 'right-limb', 'left-leg', 'right-leg']

// Cached element references
//i think therer are going to be hella consts im going to make here 
// const keyboard; this is going to be part of the code that displays the words on the hangman board
const wordDisplayEl = document.getElementById('word-display');
// this will be an array that holds all the letters the player used to guess
const guessedLettersEl = document.getElementById('guessed-letters');
//the image of the spookman thats getting hung 
const hangmanGraphicEl = document.getElementById('hangman-graphic');
//this will be the user entering the letter into the game
const letterInputEl = document.getElementById('letter-input');
//confirming that the guess will go through 
const guessButtonEl = document.getElementById('guess-button');
// const retry 
const resetButtonEl = document.getElementById('reset-button');
// message sent if the player has won or loss
const messageEl = document.getElementById('message');
//ghost element so i can move it
const ghostMove = document.querySelector('#ghost')

// Functions
function init() {
    //reset ghost position 
    ghostMove.style.setProperty('grid-area', 'a')
    //this will grab which word from the words array 
  word = words[Math.floor(Math.random() * words.length)];
  // an empty array of just letters
  guessedLetters = [];
  // this one is just the name of all the guessed letters, really easy
  incorrectGuesses = 0;
  // calling the update display i made earlier 
  updateDisplay();
  //setting the text inside the message to be 
  messageEl.textContent = "";
}

function updateDisplay() {
  // Display the word with underscores for unguessed letters

  //this one took so F***ing long to understand how it worked 
  const wordDisplay = word.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ');
  wordDisplayEl.textContent = wordDisplay;

  // Display guessed letters
  guessedLettersEl.textContent = `Guessed Letters: ${guessedLetters.join(', ')}`;
  //adding it to the guessed letters object 

  // Update hangman graphic (placeholder for now)
  hangmanGraphicEl.textContent = `Incorrect Guesses: ${incorrectGuesses}`;
}

let position = ['b','c','d','e','f','g']
// let count = 0

function handleGuess() {
  const guess = letterInputEl.value.toLowerCase();
  //have to make sure that all letters are used despite caps 
  letterInputEl.value = '';
    //just an example of how to move the ghost 
  // Check if the input is valid
  if (guess && !guessedLetters.includes(guess) && guess.length === 1) {
    guessedLetters.push(guess);
    
    if (word.includes(guess)) {
      if (word.split('').every(letter => guessedLetters.includes(letter))) {
        messageEl.textContent = "You won!";
      }
    } else {
        ghostMove.style.setProperty('grid-area', position[incorrectGuesses])
      incorrectGuesses++;
      if (incorrectGuesses >= maxGuesses) {
        messageEl.textContent = `Game Over! The word was "${word}".`;
        console.log('Game over. Word was:', word); // Debugging line for console log 
      if(incorrectGuesses === 0) {
        
      }  

      }
    }
    
    updateDisplay();
  } else {
    console.log('Invalid guess or letter already guessed'); // Debugging line for console log 
  }
}

function resetGame() {
  init();
}

// Event Listeners
guessButtonEl.addEventListener('click', handleGuess);
resetButtonEl.addEventListener('click', resetGame);

// Initialize the game when the page loads
init();


/*
Code Cemetary 
  //console.log('User guessed:', guess); // Debugging line for console log 
    // console.log(ghostMove, 'ghost move')
      //console.log('Incorrect guess count:', incorrectGuesses); // Debugging line for console log 
     // console.log('Correct guess:', guess); // Debugging line for console log 
       // console.log('Game won!'); // Debugging line for console log 
    // count++

*/