import { players } from "./app.js";
import { randomLetters } from "./randomLetters.js";
import { chronometer } from "./randomLetters.js";
import { winner } from "./winner.js";
import { setVolume } from "./settings.js";

const container = document.querySelector(".container");

export const Play = () => {
    let countWords = 0;
    let playerWords = [];
    let currentPlayerIndex = 0;
    let totalRounds = players.length;
    let currentRound = 0;
    let { letterElement, allowedLetter } = randomLetters();

    const updatePlayer = () => {
        currentRound++;
        if (currentRound >= totalRounds) {
            endGame();
            return;
        }
        
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        const currentPlayer = players[currentPlayerIndex];
        playerName.textContent = currentPlayer.name;
        inputWord.value = "";
        inputWord.disabled = false;
        btnSubmitWord.disabled = false;
        
        countWords = 0;
        playerWords = [];
        
        letterRandom.innerHTML = "";
        ({ letterElement, allowedLetter } = randomLetters());
        letterRandom.appendChild(letterElement);
        chronometer(updatePlayer);
    };

    const endGame = () => {
        winner();
        alert("El juego ha terminado");
        inputWord.disabled = true;
        btnSubmitWord.disabled = true;
        window.location.href = '../templates/puntaje.html'; 
    };

    chronometer(updatePlayer);
    
    const player = players[currentPlayerIndex];

    const playerName = document.createElement("p");
    playerName.id = "playerName";
    playerName.textContent = player.name;

    const chronometerElement = document.createElement("p");
    chronometerElement.id = "chronometer";
    chronometerElement.textContent = "00:00";

    const configIcon = document.createElement("div");
    configIcon.classList.add("config-icon");

    const dropdownButton = document.createElement("button");
    dropdownButton.classList.add("dropdown-button");
    dropdownButton.textContent = "⚙️";
    dropdownButton.addEventListener("click", settings);

    const dropdownContent = document.createElement("div");
    dropdownContent.classList.add("dropdown-content");
    dropdownContent.id = "menu";

    const sound = document.createElement("a");
    sound.textContent = "Sonido";
    sound.href = "#";

    const volumeControl = document.createElement("input");
    volumeControl.type = "range";
    volumeControl.id = "volumeControl";
    volumeControl.min = "0";
    volumeControl.max = "1";
    volumeControl.step = "0.1";
    volumeControl.value = "1";

    sound.appendChild(volumeControl);

    const font = document.createElement("a");
    font.textContent = "Tamaño de la letra";
    font.href = "#";

    const fontControl = document.createElement("input");
    fontControl.type = "range";
    fontControl.id = "fontControl";
    fontControl.min = "10";
    fontControl.max = "50";
    fontControl.step = "1";
    fontControl.value = "16";

    font.appendChild(fontControl);
    
    configIcon.appendChild(dropdownButton);
    configIcon.appendChild(dropdownContent);
    dropdownContent.appendChild(sound);
    dropdownContent.appendChild(font);
    
    const message = document.createElement("h1");
    message.textContent = "Palabras que empiecen con la letra:";

    const letterRandom = document.createElement("div");
    letterRandom.classList.add("letter-circle");
    letterRandom.appendChild(letterElement);

    const formWord = document.createElement("form");
    formWord.id = "WordsForm";

    const inputWord = document.createElement("input");
    inputWord.placeholder = "Ingrese la palabra";
    inputWord.name = "playerWord";
    inputWord.required = true;
    inputWord.classList.add("input-field");

    const btnSubmitWord = document.createElement("button");
    btnSubmitWord.textContent = "Verificar";
    btnSubmitWord.type = "submit";

    container.appendChild(playerName);
    container.appendChild(chronometerElement);
    container.appendChild(configIcon);
    container.appendChild(message);
    container.appendChild(letterRandom);
    formWord.appendChild(inputWord);
    formWord.appendChild(btnSubmitWord);
    container.appendChild(formWord);

    formWord.addEventListener("submit", (event) => {
        event.preventDefault();
        verifyWord();
    });

    const verifyWord = () => {
        const word = inputWord.value.trim();
        const words = word.startsWith(allowedLetter.toLowerCase());
        let wordRepeat = playerWords.includes(word);

        const soundCorrect = new Audio("../assets/sounds/correcto.mp3");
        const soundIncorrect = new Audio("../assets/sounds/incorrecto.mp3");
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = "es-ES";

        const volume = parseFloat(document.getElementById("volumeControl").value) || 1;

        soundCorrect.volume = volume;
        soundIncorrect.volume = volume;
        utterance.volume = volume;

        if (words && !wordRepeat) {
            countWords++;
            playerWords.push(word);
            soundCorrect.play();
            speechSynthesis.speak(utterance);
        
            players[currentPlayerIndex].amount += 1;
            console.log(`Jugador ${players[currentPlayerIndex].name} ahora tiene ${players[currentPlayerIndex].amount} palabras.`);
        } else {
            console.log("Palabra equivocada o repetida");
            soundIncorrect.play();
        }
        
    };
};
