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
        
        this.getUniqueNum();

        this.guessword.innerHTML = "";
        this.guessedLetters.innerHTML = this.incorrectLetters;

        this.displayBlankWord();
        
    },
    processGuess: function(event) {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            if (this.isInWord(this.selectedWord, event.key) && !this.isInArray(this.correctLetters, event.key)) { //  if letter is part of word and if it hasn't been guessed before
            for (var i = 0; i < this.selectedWord.length; i++) {
                var currentLetter = this.selectedWord.charAt(i);
                if (currentLetter === event.key) {
                    var letterPosition = document.querySelector("#char" + i);
                    letterPosition.innerHTML = currentLetter; // prints all the matching characters that are in the word
                    letterPosition.style.cssText = "font-family: 'Star Wars', Arial, Helvetica, sans-serif";
                    this.correctLetters.push(event.key);         // adds it to the correct guesses list
                }
            }
            } else if (this.isInArray(this.correctLetters, event.key)) {   // if a correct letter is pressed again it will not be printed again
                return;
            } else if (!this.isInArray(this.incorrectLetters, event.key)) { // if it hasn't been guessed it will add it to incorrectLetters
                this.incorrectLetters.push(event.key);
                this.guessedLetters.innerHTML = this.incorrectLetters;
                this.totalGuesses -= 1;
            } 

            if (this.totalGuesses === 0) {     // losing condition
                this.reset();
            } else if (this.correctLetters.length === this.selectedWord.length) {    // winning condition
                this.wins++;                                                        // increases wins by one and prints the updated value
                document.getElementById("number-of-wins").innerHTML = this.wins;
                document.getElementById("sw-img").src = this.imgList[this.randomNum];      // displays relevant picture from the list of image files
                var audio = new Audio(this.audioList[this.randomNum]);                     // plays the relevant sound byte from the list of audio files
                audio.play();                                                             
                this.reset();
            }
            // updates number of guesses to the page
            this.remainingGuesses.innerHTML = this.totalGuesses;    
            // prints to screen the total amount of guessesguesses
        }
    },
    init: function() {
        this.reset();
        document.addEventListener("keydown", this.processGuess.bind(this));
    }
};

// MAIN PROCESS
// ============================================================================
game.init();