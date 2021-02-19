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

        resetIcons();

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

    function resetIcons() {

        const svgPlayerIcon = document.querySelector('.player-icon');
        const svgComputerIcon = document.querySelector('.computer-icon');

        if (svgPlayerIcon != null) {
            svgPlayerIcon.classList.remove('player-icon');
            svgPlayerIcon.classList.add('option');
        }

        if (svgComputerIcon != null) {
            svgComputerIcon.classList.remove('computer-icon');
        }
    }

    function playRound(e) {

        const playerSelection = e.target.dataset.key;
        const computerSelection = computerPlay();
    
        const svgPlayerIcon = document.getElementById(playerSelection);
        const svgComputerIcon = document.getElementById(computerSelection);

        svgPlayerIcon.classList.remove('option');
        svgPlayerIcon.classList.add('player-icon');
        svgComputerIcon.classList.add('computer-icon');
    
        return determineResult(playerSelection, computerSelection);
    }

    function computerPlay() {
        let randomNumber = Math.random();
    
        if (randomNumber < (1 / 3)) {
            return "Rock";
        } else if (randomNumber > (1 / 3) && randomNumber < ( 2 / 3)) {
            return "Paper";
        } else {
            return "Scissors";
        }
    }

    function determineResult(playerSelection, computerSelection) {

        let result = [];
    
        switch (playerSelection) {
            case "Rock":
                switch (computerSelection) {
                    case "Rock":
                        return ["It's a draw!", 0];
                        break;
                    case "Paper":
                        return ["You Lose! Paper covers Rock", -1];
                        break;
                    case "Scissors":
                        return ["You Win! Rock smashes Scissors", 1];
                        break;
                }
                break;
            case "Paper":
                switch (computerSelection) {
                    case "Rock":
                        return ["You Win! Paper covers Rock", 1];
                        break;
                    case "Paper":
                        return ["It's a draw!", 0];
                        break;
                    case "Scissors":
                        return ["You Lose! Scissors cut Paper", -1];
                        break;
                }
                break;
            case "Scissors":
                switch (computerSelection) {
                    case "Rock":
                        return ["You Lose! Rock smashes Scissors", -1];
                        break;
                    case "Paper":
                        return ["You Win! Scissors cut Paper", 1];
                        break;
                    case "Scissors":
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