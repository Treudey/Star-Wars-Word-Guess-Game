// GAME OBJECT
// =============================================================
var game = {

    // PROPERTIES   
    // ==================================================================
    words: ["chewbacca", "dagobah", "skywalker", "alderaan", "lightsaber", "princess", "tatooine", "podracing", "stormtrooper"],
    imgList: ["./assets/images/chewbacca.png", "./assets/images/dagobah.jpg", "./assets/images/skywalker.png", "./assets/images/alderaan.png", "./assets/images/lightsaber.jpg", "./assets/images/princess.jpg", "./assets/images/tatooine.jpg", "./assets/images/podracing.jpeg", "./assets/images/stormtrooper.jpg"],
    audioList: ["./assets/audio/chewbacca.mp3","./assets/audio/dagobah.mp3", "./assets/audio/skywalker.mp3", "./assets/audio/alderaan.mp3", "./assets/audio/lightsaber.mp3", "./assets/audio/princess.mp3", "./assets/audio/tatooine.mp3", "./assets/audio/podracing.mp3", "./assets/audio/stormtrooper.mp3"],
    wins: 0, 
    guessword: document.querySelector("#guessword"),
    guessedLetters: document.querySelector("#guessed-letters"),
    remainingGuesses: document.querySelector("#remaining-guesses"),
    textAboveWord: document.querySelector("#word-text"),
    randomNum: 0,
    usedNums: [],
    selectedWord: '',

    // METHODS
    // ============================================================================
    displayBlankWord: function() {
        // prints the blank spaces for the random word that will change to letters as guesses are made
        for (var i = 0; i < this.selectedWord.length; i++) {
            var newElement = document.createElement("span");
            newElement.setAttribute("id", "char" + i);
            newElement.innerHTML = "_ ";
            this.guessword.appendChild(newElement);
        }
    
        // displays the starting amount of guesses
        this.remainingGuesses.innerHTML = this.totalGuesses;
    },
    isInArray: function(array, element) {    // checks if a given element is in a given array
        return array.indexOf(element) > -1
    },
    isInWord: function(string, char) {      // checks if a given character is in a given string
         return string.indexOf(char) > -1;
    },
    getUniqueNum: function() {
        while (true) {
            this.randomNum = Math.floor(Math.random() * this.words.length);
            if (!this.isInArray(this.usedNums, this.randomNum)) {        // checks that random number has not been used before
                this.selectedWord = this.words[this.randomNum];
                this.usedNums.push(this.randomNum);                  // adds it to the list of used numbers
                return false
            // if all the words have been used and the random number is not the same one just used
            } else if (this.words.length === this.usedNums.length && 
                        this.usedNums[this.usedNums.length-1] !== this.randomNum) {  
                // resets usedNum to include the new random number
                this.usedNums = [this.randomNum];                    
                this.selectedWord = this.words[this.randomNum];
                return false;
            }
        }
    },
    reset: function() {
        this.incorrectLetters = [];
        this.correctLetters = [];
        this.totalGuesses = 10;
        this.textAboveWord.innerHTML = "Current Word";

        this.getUniqueNum();

        this.guessword.innerHTML = "";
        this.guessedLetters.innerHTML = this.incorrectLetters;

        this.displayBlankWord();
        this.addKeypressHandler();
        
    },
    addKeypressHandler: function() {
        var self = this;
        document.addEventListener("keydown", function processGuess(event) {
            if (event.keyCode >= 65 && event.keyCode <= 90) {
                if (self.isInWord(self.selectedWord, event.key) && !self.isInArray(self.correctLetters, event.key)) { //  if letter is part of word and if it hasn't been guessed before
                    for (var i = 0; i < self.selectedWord.length; i++) {
                        var currentLetter = self.selectedWord.charAt(i);
                        if (currentLetter === event.key) {
                            var letterPosition = document.querySelector("#char" + i);
                            letterPosition.innerHTML = currentLetter; // prints all the matching characters that are in the word
                            letterPosition.style.cssText = "font-family: 'Star Wars', Arial, Helvetica, sans-serif";
                            self.correctLetters.push(event.key);         // adds it to the correct guesses list
                        }
                    }
                } else if (self.isInArray(self.correctLetters, event.key)) {   // if a correct letter is pressed again it will not be printed again
                    return;
                } else if (!self.isInArray(self.incorrectLetters, event.key)) { // if it hasn't been guessed it will add it to incorrectLetters
                    self.incorrectLetters.push(event.key);
                    self.guessedLetters.innerHTML = self.incorrectLetters;
                    self.totalGuesses -= 1;
                } 
    
                if (self.totalGuesses === 0) {     // losing condition
                    document.removeEventListener("keydown", processGuess);
                    for (var i = 0; i < self.selectedWord.length; i++) {
                        var currentLetter = self.selectedWord.charAt(i);
                        var letterPosition = document.querySelector("#char" + i);
                        letterPosition.innerHTML = currentLetter;
                        letterPosition.style.cssText = "font-family: 'Star Wars', Arial, Helvetica, sans-serif";
                    }
                    self.textAboveWord.innerHTML = "Wrong!";    
                    setTimeout(self.reset.bind(self), 4000);
                } else if (self.correctLetters.length === self.selectedWord.length) {  // winning condition
                    document.removeEventListener("keydown", processGuess);  
                    self.wins++;     
                    self.textAboveWord.innerHTML = "Correct!";                                                   // increases wins by one and prints the updated value
                    document.getElementById("number-of-wins").innerHTML = self.wins;
                    document.getElementById("sw-img").src = self.imgList[self.randomNum];      // displays relevant picture from the list of image files
                    var audio = new Audio(self.audioList[self.randomNum]);                     // plays the relevant sound byte from the list of audio files
                    audio.play();                                                             
                    setTimeout(self.reset.bind(self), 4000);
                } else {
                    // updates number of guesses remaining to the page
                    self.remainingGuesses.innerHTML = self.totalGuesses;
                }
            }
        });
    }
};

// MAIN PROCESS
// ============================================================================
document.addEventListener("DOMContentLoaded", function() { 
    game.reset();
});