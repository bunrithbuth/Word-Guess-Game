const wordHangmanChoices = [
    'CALL OF DUTY', 'WARCRAFT', 'SONIC', 'MARIO', 'POKEMON', 'TETRIS', 'BOMBERMAN', 'MINECRAFT', 'OVERWATCH'
]
const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
/*
const wordHangmanChoices = [
    'Call of Duty'
]
*/
const gameHangman = {
    word: 'none',
    guessAmount: 6,
    keyPress: '1',
    keysPressedAlready: [],
    wordArray: [],
    score: 0,
    countSpaces: 0,
    init: function(){
        this.chooseWord()
        this.hideSlots()

    },
    chooseWord: function(){
        this.word = wordHangmanChoices[Math.floor(Math.random() * wordHangmanChoices.length)];
        console.log(this.word)
        let temp = this.word
        this.wordArray = temp.split('') //split up word into an array of characters aka. wordArray[]
    },
    hideSlots: function(){
        let wordlength = this.word.length       
        let tempWord = this.word

        while(tempWord.indexOf(' ') !== -1){
            let classString = '.slot' + tempWord.indexOf(' ') + ' > .bar'
            $(classString).addClass('hide')
            tempWord = setCharAt(tempWord, tempWord.indexOf(' '), 'i')
            ++this.countSpaces
        }
    
        for(i = wordlength; i < 12; i++){
            let classString = '.slot' + i + ' > .bar'
            $(classString).addClass('hide')
        }
    },
    disableButton: function(kPress){
        //disable the letter/button
        $(`.${kPress}`).addClass('disabled')
    },
    updateHangmanImage: function(){
        //updates the hangman image per incorrect guess using guessAmount
        let offset = 'assets/images/Hangman-' + (6 - this.guessAmount) + '.png'
        console.log(offset)
        $('.hangmanImage').attr('src',offset)
    },
    gameUpdate: function(kPress){
        // checking to see if we havent pressed yet
        if(this.keysPressedAlready.indexOf(kPress) === -1){
            //then we want to add it to keysPressedAlready if letter, o.w. its not a letter
            if(alphabet.indexOf(kPress) > -1){
                $('.pressKey').addClass('blackText')
                $('.pressKey').removeClass('redText')
                $('.pressKey').html(kPress)
                // add it to keys already pressed
                this.keysPressedAlready.push(kPress)
                $('.pressedKey').html(this.keysPressedAlready)
                //disable the letter
                this.disableButton(kPress)
                // if its a letter in hangmanword, we display it on the gui
                if(this.wordArray.indexOf(kPress) > -1){
                    let tempWord = this.word
                    while(tempWord.indexOf(kPress) !== -1){
                        let classString = '.slot' + tempWord.indexOf(kPress) + ' > .bar'
                        $(classString).html(kPress)
                        tempWord = setCharAt(tempWord, tempWord.indexOf(kPress), '1')
                        ++this.score
                    }
                    if(this.score === this.wordArray.length-this.countSpaces){
                        setTimeout(() => alert(`You Win. The word is ${this.word}`), 100);
                    }
                }else{
                    --this.guessAmount
                    $('.numGuess').html(this.guessAmount)
                    this.updateHangmanImage()
                }
                if(this.guessAmount === 0){
                    setTimeout(() => alert('You Lose'), 100);
                }
            }else{ // not a letter
                $('.pressKey').addClass('redText')
                $('.pressKey').removeClass('blackText')
                $('.pressKey').html(`${kPress} is not a valid letter!`)
            }
        }else if(this.keysPressedAlready.indexOf(kPress) > -1){
            // key is already in keyPressed
            $('.pressKey').addClass('redText')
            $('.pressKey').removeClass('blackText')
            $('.pressKey').html(`${kPress} is already Pressed letter!`)
        }
    }
}


$(document).ready(function() {
    gameHangman.init()

    document.onkeyup = function (event) {
        let keyPress = event.key
        gameHangman.gameUpdate(keyPress.toUpperCase())
    }

    let btn = '.btn-large'
    $(btn).on("click", function( event ) {
        gameHangman.gameUpdate($( this ).text())
    })
    
})

// helper functions
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}