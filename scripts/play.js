import { players } from "./app.js";
import { setVolume } from "./settings.js"; 

const content = document.querySelector('.content');

export const Play = () => {
    const letter = 'a';
    let countWords = 0;
    let playerWords = [];

    const formWord = document.createElement('form');
    formWord.id = 'WordsForm';

    const inputWord = document.createElement('input');
    inputWord.placeholder = 'Ingrese la palabra';
    inputWord.name = 'playerWord';
    inputWord.required = true;

    const btnSubmitWord = document.createElement('button');
    btnSubmitWord.textContent = 'Verificar';
    btnSubmitWord.type = 'submit';

    formWord.appendChild(inputWord);
    formWord.appendChild(btnSubmitWord);
    content.appendChild(formWord);

    formWord.addEventListener('submit', (event) => {
        event.preventDefault();
        verifyWord();
    });

    const verifyWord = () => {
        let idPlayer = 1;  
        const word = inputWord.value.trim();
        const words = word.startsWith(letter);
        let wordRepeat = false;

        const soundCorrect = new Audio('../assets/sounds/correcto.mp3');
        const soundIncorrect = new Audio('../assets/sounds/incorrecto.mp3');
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = "es-ES"; 

        // Obtiene el volumen actualizado cada vez
        const volume = parseFloat(document.getElementById("volumeControl").value) || 1;

        // Ajustar volumen de los sonidos
        soundCorrect.volume = volume;
        soundIncorrect.volume = volume;
        
        // Ajustar volumen de la síntesis de voz
        utterance.volume = volume;

        if (words) {
            for (const wordPlayer of playerWords) {
                if (word === wordPlayer) {
                    console.log('Esta palabra está repetida');
                    soundIncorrect.play();   
                    return;
                }
            }

            if (!wordRepeat) {
                countWords++;
                playerWords.push(word);
                console.log(playerWords);
                console.log(countWords);
                soundCorrect.play();
                speechSynthesis.speak(utterance);

                const player = players.find(p => p.id === idPlayer);
                if (player) {
                    player.amount += 1;
                    console.log(`Jugador ${player.name} ahora tiene ${player.amount} palabras.`);
                } else {
                    console.log('Jugador no encontrado.');
                }
            }
        } else {
            console.log('Palabra equivocada');
            soundIncorrect.play();   
        }
    };
};
