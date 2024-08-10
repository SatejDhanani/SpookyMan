# Writing a very Spooky Spelling Game!

### This is going to be where i document my intentions for the browser game that i will be creating. 
This game is called *Spooky Man* and it will be spelling game that, if you lose a ghost will never find a person to scare! something like that atleast. 



I am going to be writing this file in 3 different files. 
* JavaScript (App.js)
* HTML (index.html)
* Css (style.css)

in Javascript i will be utilizing a couple different functions in order to get a players timer, the array that will contain the random words, and many other details that the user is going to be able to see while playing the game. 

The game will have a couple different cases that i plan on preparing for in order to make srue that the game is functional. 

* The player has to type in a letter and that will be passed through into the "guess array" 
* If the player's guess is wrong, then a small animation will play, moving the ghost towards the child
* if the guess is correct, the correct letter will populate on the game board, indicating position and amount of correct letters guessed
* If the maximum amount of incorrect guesses is reached then the game will end and a message will indicate that the player lost 
* If the player wins, then there will be a message to let the player know

> Additional note: This game will also be themed after halloween. Instead of the traditional hangman experience, it will involve a ghost that slowly approaches or tries to "catch" a child. 

## JavaScript Portion

The majority of the game is written in Javascript. There are a couple 5 major functions that dictate the interactions of the game. The two most important are the ***init*** function and the ***handleGuess*** function
```javascript
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
  ```
*  As shown above this function will move the ghost back to the start of the **grid** so that the game may start again. It will also utilize the math random function in order to get a word from the array that we have set as a const above. It will create an empty array for incorrect letters and run the update display function. Finally it will update the text content of the message to display based on how the user interacts with the game 
 
 ```javascript
 function handleGuess() {
  const guess = letterInputEl.value.toLowerCase();
  //have to make sure that all letters are used despite caps 
  console.log('User guessed:', guess); // Debugging line for console log 
  letterInputEl.value = '';
    // console.log(ghostMove, 'ghost move')
    //just an example of how to move the ghost 
    // count++
  // Check if the input is valid
  if (guess && !guessedLetters.includes(guess) && guess.length === 1) {
    guessedLetters.push(guess);
    
    if (word.includes(guess)) {
      console.log('Correct guess:', guess); // Debugging line for console log 
      if (word.split('').every(letter => guessedLetters.includes(letter))) {
        messageEl.textContent = "You won!";
        console.log('Game won!'); // Debugging line for console log 
      }
    } else {
        ghostMove.style.setProperty('grid-area', position[incorrectGuesses])
      incorrectGuesses++;
      console.log('Incorrect guess count:', incorrectGuesses); // Debugging line for console log 
      if (incorrectGuesses >= maxGuesses) {
        messageEl.textContent = `Game Over! The word was "${word}".`;
        console.log('Game over. Word was:', word); // Debugging line for console log 
      if(incorrectGuesses === 0) {
        
      }  

      }
    }
```
* The other major function i'd like to display here is how the guesses sthat the player makes are handled. We start by creating a constant variable known as guess that immedietly sets the input the player selects to lower case. 
> This is set to lower case just so all guesses are handled the smae regardless of the capitalization of the guess

* An if statement is then built in order to handle if the guess input by the user is correct or not. This will allow us to update the board and let the game actually interact correctly given the input. If the user gets the answer correct, then the word is populated in the guessed letter column, and if not the ghost will move and the incorrect guess iterator will increase. Although it is a bit rudementary I still think that it works. 

## CSS Portion (Style)

Many of the stylistic choices, although simple take place right here in this area of the code. There isn't nearly as much CSS as there is JS, however there are a couple things to highlight here. 

```CSS 
  #game-board {
    margin: 20px auto;
    width: 300px;
    border-style: dotted ;
    border: 2px solid #333;
    padding: 10px;
    background-color: #a35920;
  }
 ```
 * This is some of the css that is present for the game board. This will be the portion of the code that colors the area in which players will make their guesses. The choices here reflect the margin, the width and th border styl for the game board div set inside of the HTML file. I was able to chose a background color to match the theme and padding to add a little bit extra aesthetics

 ```CSS
   .victim {
    display: grid;
    grid-template-areas: "a b c d e f g h";
  }

#scaredKid {
    width: 200px; 
    grid-area: h;
}

#ghost {
    width: 300px;
    grid-area: a }
```
* The other major highlight is how the grid was created and how the images of the ghost and child are displayed. With the help of a wonderful instructor named Kyle, i was able to utilize the grid system to align the 2 jpeg images that i had to indicate progress. Settin their heights relatie to their  size, i was able to get the game to look as if there was the ghost is chasing the child. 
* Utilizing the handleGuess function in the JS above i was also able to change the position of the grid area of the ghost, allowing it to move dynamically based on the guess. 

## HTML Portion

This was the easiest section to write thankfully. Not too many things added here other than the DIVs, and the classes associated with the divs. 

```HTML 
 <div class="victim">
    <img id="ghost" src="https://static.vecteezy.com/system/resources/previews/012/042/239/non_2x/halloween-ghost-clipart-halloween-party-free-png.png">
    <div class="a"></div>
    <div class="b"></div>
    <div class="c"></div>
    <div class="d"></div>
    <div class="e"></div>
    <img id="scaredKid" src="https://archive.org/download/afraid-boy-clipart-9/afraid-boy-clipart-9.png">
  </div>
  <div id="game-board">
    <div id="word-display"></div>
    <div id="guessed-letters"></div>
    <div id="hangman-graphic"></div>
  </div>
```
* This is th crux of the HTML file. This contains the divs that hold the ghost and the child in something called the ***victim*** class. 
* it has the grid and the class for each
* and it has the game board div that can be utilized for guessing
> The ghost image is placed first and the scared kid is placed last because of their relative positions on the board. 
