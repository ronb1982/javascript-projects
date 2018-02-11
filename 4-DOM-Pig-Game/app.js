/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, bgMusicWAV, badNumbers,
    pigWAV, prevDiceRolls, winningScore, winningScoreDOM, diceDOM, numBadPreviousRolls,
    minGoal, maxGoal, startingMesssageDOM, startingMessage;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        document.querySelector('.btn-hold').style.display = 'block';

        // Reset starting message if it's been change
        startingMessageDOM.textContent = startingMessage;

        var diceArr = [0,0];
        diceArr[0] = Math.floor(Math.random() * 6) + 1;
        diceArr[1] = Math.floor(Math.random() * 6) + 1;

        /*** TESTING ***/
        //diceArr[0] = 6;
        //diceArr[1] = 2;
        /****************/

        for (var i = 0; i < diceDOM.length; i++) {
            diceDOM[i].style.display = 'block';
            diceDOM[i].src = 'dice-' + diceArr[i] + '.png';
        }

        var badPreviousNumber = checkForBadRoll(badNumbers.previousRoll);

        for (var i = 0; i < diceArr.length; i++) {
            var dice = diceArr[i];

            // Check if we are within 10 points of our winningScore
                // if we are, then check for bad number and force another roll (cannot hold on a 6)
            var distanceToGoal = winningScore - scores[activePlayer];

            if (distanceToGoal <= 10 && dice === badNumbers.previousRoll && numBadPreviousRolls === 0) {
                document.querySelector('.btn-hold').style.display = 'none';
                startingMessageDOM.textContent = "Oh no, you've been oinked! Roll again.";
                addToRoundScore();
                numBadPreviousRolls = 1;
            } else {
                if (badPreviousNumber && dice === badNumbers.previousRoll) {
                    nextPlayer(true);
                    pigWAV.play();
                    break;
                } else if (dice === badNumbers.singleRoll) {
                    nextPlayer(false);
                    pigWAV.play();
                    break;
                } else {
                    addToRoundScore();
                }
            }
        }
    }

    function addToRoundScore() {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

        var diceRollWAV = new Audio('rolling-dice.wav');
        diceRollWAV.play();
        diceRollWAV.volume = 1.0;
        prevDiceRolls[i] = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.diaplay = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            var winnerWAV = new Audio('winner.wav');
            winnerWAV.play();
            winningScoreDOM.textContent = 'PLAYER ' + (activePlayer + 1) + ' WINS!';
        } else {
            if (roundScore > 0) {
                nextPlayer(false);
                var holdWAV = new Audio('hold.mp3');
                holdWAV.play();
            }
        }
    }
});

function nextPlayer(clearTotalScore) {
    if (clearTotalScore) {
        document.getElementById('score-' + activePlayer).textContent = '0';
        scores[activePlayer] = 0;
    }

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    prevDiceRolls[0] = 0;
    prevDiceRolls[1] = 0;
    numBadPreviousRolls = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    startingMessageDOM = document.getElementById('messages');

    // Object to define what makes a bad roll
        // singleRoll = if this number is rolled, there will be a player turn change
        // previousRoll = if this nunber was PREVIOUSLY rolled, and rolled again in succession
            // then there will be a player turn change
    badNumbers = {
        singleRoll: 1,
        previousRoll: 6
    };

    minGoal = 20;
    maxGoal = 500;
    numBadPreviousRolls = 0;
    document.querySelector('.mute-icon').classList.add('ion-android-volume-off');
    bgMusicWAV = document.getElementById('bg-music');
    pigWAV = new Audio('pig.wav');
    bgMusicWAV.volume = 0.4;
    pigWAV.volume = 0.5;
    bgMusicWAV.play();
    pigWAV.play();

    scores = [0,0];
    prevDiceRolls = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    diceDOM = document.querySelectorAll('.dice');

    for (var i = 0; i < diceDOM.length; i++) {
        diceDOM[i].style.display = 'none';
    }

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}

bgMusicWAV.addEventListener('timeupdate', function(){
    var buffer = .50;
    if (this.currentTime > this.duration - buffer) {
        this.currentTime = 0;
        this.play();
    }
}, false);

document.querySelector('.btn-mute').addEventListener('click', function() {
    if (bgMusicWAV.muted) {
        bgMusicWAV.muted = false;
        document.getElementById('spn-mute').textContent = 'Mute Music';
        document.querySelector('.mute-icon').classList.remove('ion-android-volume-up');
        document.querySelector('.mute-icon').classList.add('ion-android-volume-off');
    } else {
        bgMusicWAV.muted = true;
        document.getElementById('spn-mute').textContent = 'Unmute';
        document.querySelector('.mute-icon').classList.remove('ion-android-volume-off');
        document.querySelector('.mute-icon').classList.add('ion-android-volume-up');
    }
});

document.querySelector('.btn-set-score').addEventListener('click', function() {
    winningScore = document.querySelector('.txt-winning-score').value;
    winningScoreDOM = document.getElementById('msg-winning-score');

    if (winningScore < minGoal || winningScore > maxGoal) {
        winningScoreDOM.textContent = 'Winning score must between ' + minGoal + ' and ' + maxGoal + '.';
    } else {
        winningScoreDOM.textContent = 'First player to ' + winningScore + ' points wins!';
        document.querySelector('.btn-roll').style.display = 'block';
        startingMessage = 'Click "Roll Dice".';
        startingMessageDOM.textContent = startingMessage;
    }

    winningScoreDOM.style.display = 'block';
});

// Function that checks for a bad number that'll force a player turn.
function checkForBadRoll(badNumber) {
    for (var j = 0; j < prevDiceRolls.length; j++) {
        if (prevDiceRolls[j] === badNumber) {
            return true;
        }
    }
    return false;
}
