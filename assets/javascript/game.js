// GAME OBJECT
// =============================================================
var game = {

    // PROPERTIES   
    // ==================================================================
    words: ["chewbacca", "dagobah", "skywalker", "alderaan", "lightsaber", "princess", "tatooine", "podracing", "stormtrooper"],
    pathToImg: "",
    imgList: ["./assets/images/chewbacca.png", "./assets/images/dagobah.jpg", "./assets/images/skywalker.png", "./assets/images/alderaan.png", "./assets/images/lightsaber.jpg", "./assets/images/princess.jpg", "./assets/images/tatooine.jpg", "./assets/images/podracing.jpeg", "./assets/images/stormtrooper.jpg"],
    audioList: ["./assets/audio/chewbacca.mp3","./assets/audio/dagobah.mp3", "./assets/audio/skywalker.mp3", "./assets/audio/alderaan.mp3", "./assets/audio/lightsaber.mp3", "./assets/audio/princess.mp3", "./assets/audio/tatooine.mp3", "./assets/audio/podracing.mp3", "./assets/audio/stormtrooper.mp3"],
    wins: 0,
    incorrectLetters: [],
    correctLetters: [],
    totalGuesses: 10,   
    guessword: document.querySelector("#guessword"),
    guessedLetters: document.querySelector("#guessed-letters"),
    remainingGuesses: document.querySelector("#remaining-guesses"),

    // METHODS
    // ============================================================================
    displayBlankWord: function() {
        // prints the blank spaces for the random word that will change to letters as guesses are made
        for (var i = 0; i < selectedWord.length; i++) {
            var newElement = document.createElement("span");
            newElement.setAttribute("id", "char" + i);
            newElement.innerHTML = "_ ";
            this.guessword.appendChild(newElement);
        }
    
        // displays the starting amount of guesses
        this.remainingGuesses.innerHTML = this.totalGuesses;
    },
    isInArray: function(array, element) {    // checks if a given element is in a given array
        if (array.indexOf(element) > -1) {
            return true;
        } else {
            return false;
        }
    },
    isInWord: function(string, char) {      // checks if a given character is in a given string
        if (string.indexOf(char) > -1) {
            return true;  
        } else {
            return false;
        }
    },
    getUniqueNum: function() {
        while (true) {
            randomNum = Math.floor(Math.random() * this.words.length);
            if (!this.isInArray(usedNums, randomNum)) {        // checks that random number has not been used before
                selectedWord = this.words[randomNum];
                usedNums.push(randomNum);                  // adds it to the list of used numbers
                return false
            } else if (this.words.length === usedNums.length && usedNums[usedNums.length-1] !== randomNum) {  // if all the words have been used and the random number is not the same one just used
                usedNums = [randomNum];                    // resets usedNum to include the new random number
                selectedWord = this.words[randomNum];
                return false;
            }
        }
    },
    reset: function() {
        this.incorrectLetters = [];
        this.correctLetters = [];
        this.totalGuesses = 13;
        
        this.getUniqueNum();

        this.guessword.innerHTML = "";
        this.guessedLetters.innerHTML = this.incorrectLetters;

        this.displayBlankWord();
    }
};

// VARIABLES
// ===============================================================================
var randomNum = Math.floor(Math.random() * game.words.length); // couldn't figure out how to put these into the object without it recalculating the random number every time
var usedNums = [randomNum];
var selectedWord = game.words[randomNum];


// MAIN PROCESS
// ============================================================================
game.displayBlankWord();

document.addEventListener("keydown", function(event) {
    console.log(event.keyCode);
    debugger;
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        if (game.isInWord(selectedWord, event.key) && !game.isInArray(game.correctLetters, event.key)) { //  if letter is part of word and if it hasn't been guessed before
        for (var i = 0; i < selectedWord.length; i++) {
            var currentLetter = selectedWord.charAt(i);
            if (currentLetter === event.key) {
                var letterPosition = document.querySelector("#char" + i);
                letterPosition.innerHTML = currentLetter; // prints all the matching characters that are in the word
                letterPosition.style.cssText = "font-family: 'Star Wars', Arial, Helvetica, sans-serif";
                game.correctLetters.push(event.key);         // adds it to the correct guesses list
            }
        }
        } else if (game.isInArray(game.correctLetters, event.key)) {   // if a correct letter is pressed again it will not be printed again
            return;
        } else if (!game.isInArray(game.incorrectLetters, event.key)) { // if it hasn't been guessed it will add it to incorrectLetters
            game.incorrectLetters.push(event.key);
            game.guessedLetters.innerHTML = game.incorrectLetters;
            game.totalGuesses -= 1;
        } 

        if (game.totalGuesses === 0) {     // losing condition
            game.reset();
        } else if (game.correctLetters.length === selectedWord.length) {    // winning condition
            game.wins++;                                                        // increases wins by one and prints the updated value
            document.getElementById("number-of-wins").innerHTML = game.wins;
            document.getElementById("sw-img").src = game.imgList[randomNum];      // displays relevant picture from the list of image files
            var audio = new Audio(game.audioList[randomNum]);                     // plays the relevant sound byte from the list of audio files
            audio.play();                                                             
            game.reset();
        }
        // updates number of guesses to the page
        game.remainingGuesses.innerHTML = game.totalGuesses;    // prints to screen the total amount of guessesguesses

    }
});

// awesome

