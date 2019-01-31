/* 
* create an algorithm
* a plan that solves a problem
* problem? guess the word

* create a list of star wars words to guess from
* pick a random word from the list
* store that random word in a variable

* define a var that stores total number of guesses

* have user enter a key
* listen to a key event
* check if user has already guessed that key
* check if key pressed matches any characters in that word and characters to webpage if it does
* check if user has already guessed that key 
* make an array that stores correct keys that have been guessed
* make a list that stores incorrect keys that have already been guessed
* if the key does not match decrease total number of guesses by one

* if total number of guesses = 0
* reset guesses to be max number of guesses
* choose another random word
* repeat game again
*/

// checks if a given element is in a given array
function isInArray(array, element) {
    if (array.indexOf(element) > -1) {
        return true;
    } else {
        return false;
    }
}

// checks if a given character is in a given string
function isInWord(string, char) {
    if (string.indexOf(char) > -1) {
        return true;  
    } else {
        return false;
    }
}


var words = ["chewbacca", "dagobah", "skywalker", "alderaan", "lightsaber", "princess", "tatooine", "podracing", "stormtrooper"];
var wins = 0;

console.log(randomWord);
while (true) {

    var guessedLetters = [];
    var correctLetters = [];
    var randomWord = words[Math.floor(Math.random() * words.length)];
    var totalGuesses = 13;

    // prints the blank spaces for the random word that will change to letters as guesses are made
    for (var i = 0; i < randomWord.length; i++) {
        document.getElementById("guessword").innerHTML += "_ ";
    }

    // checks if letter has been guessed already and if it isn't, it will add it to guessedLetters
    document.addEventListener("keydown", function(event) {

        if (isInWord(randomWord, event.key) && !isInArray(correctLetters, event.key)) { //  if letter is part of word and if it hasn't been guessed before
            for (let i = 0; i < randomWord.length; i++) {
                var currentLetter = randomWord.charAt(i);
                if (currentLetter === event.key) {
                    console.log(currentLetter);              // prints all the matching characters that are in the word
                    correctLetters.push(event.key);          // adds it to the correct guesses list
                }
            }
        } else if (isInArray(correctLetters, event.key)) {   // if a correct letter is pressed again it will not be printed again
            console.log("already guessed that letter");
        } else if (!isInArray(guessedLetters, event.key)) { // if it hasn't been guessed it will add it to guessedLetters
            guessedLetters.push(event.key);
            console.log(guessedLetters);
            totalGuesses -= 1;
        } else {
            console.log("already guessed that letter");     // if it's already in the incorrect guessed letters it will not do anything
        }

        console.log("Guesses: ", totalGuesses);

        if (totalGuesses === 0) {      // ends the game if total number of guesses equals zero
            console.log("You lose");
            return false;
        }
    });
}



