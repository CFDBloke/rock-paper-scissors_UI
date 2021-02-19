startGame();

function startGame() {

    let playerScore = 0;
    let computerScore = 0;

    const buttons = document.querySelectorAll('.option');
    const divPlayerScore =  document.querySelector('.player-score');
    const divComputerScore =  document.querySelector('.computer-score');
    const outcome =  document.querySelector('.outcome');

    buttons.forEach(button => button.addEventListener('click', keepScore));

    function keepScore(e) {

        let result = playRound(e);

        outputResult(result);

        if (result[1] === 1) {
            playerScore = playerScore + 1;
        } else if (result[1] === -1) {
            computerScore = computerScore + 1;
        }

        divPlayerScore.textContent = "Player Score: " + playerScore;
        divComputerScore.textContent = "Computer Score: " + computerScore;

        if (playerScore === 5 || computerScore === 5) {
            if (playerScore > computerScore) {
                outcome.textContent = ("Player Wins");
            } else {
                outcome.textContent = ("Computer Wins");
            }

            buttons.forEach(button => button.removeEventListener('click', keepScore));
        }
    }

    function playRound(e) {

        const playerSelection = e.target.dataset.key;
        const computerSelection = computerPlay();
        
        const playerSelectionDiv = document.querySelector('.player-selection');
        const computerSelectionDiv = document.querySelector('.computer-selection');
    
        playerSelectionDiv.textContent = "Player chose: " + playerSelection;
        computerSelectionDiv.textContent = "Computer chose: " + computerSelection;
    
        return determineResult(playerSelection, computerSelection);
    }

    function computerPlay() {
        let randomNumber = Math.random();
    
        if (randomNumber < (1 / 3)) {
            return "rock";
        } else if (randomNumber > (1 / 3) && randomNumber < ( 2 / 3)) {
            return "paper";
        } else {
            return "scissors";
        }
    }

    function determineResult(playerSelection, computerSelection) {

        let result = [];
    
        switch (playerSelection) {
            case "rock":
                switch (computerSelection) {
                    case "rock":
                        return ["It's a draw!", 0];
                        break;
                    case "paper":
                        return ["You Lose! Paper covers Rock", -1];
                        break;
                    case "scissors":
                        return ["You Win! Rock smashes Scissors", 1];
                        break;
                }
                break;
            case "paper":
                switch (computerSelection) {
                    case "rock":
                        return ["You Win! Paper covers Rock", 1];
                        break;
                    case "paper":
                        return ["It's a draw!", 0];
                        break;
                    case "scissors":
                        return ["You Lose! Scissors cut Paper", -1];
                        break;
                }
                break;
            case "scissors":
                switch (computerSelection) {
                    case "rock":
                        return ["You Lose! Rock smashes Scissors", -1];
                        break;
                    case "paper":
                        return ["You Win! Scissors cut Paper", 1];
                        break;
                    case "scissors":
                        return ["It's a draw!", 0];
                        break;
                }
                break;
        }
    }

    function outputResult(result) {

        const outputDiv = document.querySelector('.result');
    
        outputDiv.textContent = result[0];
        
    }
}