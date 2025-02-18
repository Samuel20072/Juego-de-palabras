import { Play } from "./play.js";
const btnPlayers = document.querySelectorAll('.btn-players');
const selection = document.querySelector('.selection');
const container = document.querySelector('.container')

export let players = [];
let totalPlayers = 0; 
let currentCount = 0; 

btnPlayers.forEach(button => {
    button.addEventListener('click', () => {
        totalPlayers = parseInt(button.value); 
        if (!isNaN(totalPlayers) && totalPlayers > 0) {
            showForm();
        } else {
            alert('Ingrese un número válido de jugadores.');
        }
    });
});

const showForm = () => {
    selection.innerHTML = ''; 
    const form = document.createElement('form'); 
    form.classList.add('input-group');
    form.id = 'playersForm';
    
    const inputName = document.createElement('input');
    inputName.placeholder = 'Nombre del jugador';
    inputName.name = 'playerName';
    inputName.required = true;

    const inputNickname = document.createElement('input');
    inputNickname.placeholder = 'Apodo del jugador';
    inputNickname.name = 'playerNickname';
    inputNickname.required = true;

    const btnSubmit = document.createElement('button');
    btnSubmit.textContent = 'Añadir';
    btnSubmit.type = 'submit'; 
    btnSubmit.classList.add('start-button');

    form.appendChild(inputName);
    form.appendChild(inputNickname);
    form.appendChild(btnSubmit);  
    selection.insertAdjacentElement('afterend', form);
    

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = inputName.value.trim();
        const nickName = inputNickname.value.trim();

        if (name === '' || nickName === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        const newId = players.length > 0 ? players[players.length - 1].id + 1 : 1;

        const newPlayer = {
            id: newId,
            name,
            nickName,
            amount: 0
        };

        players.push(newPlayer);
        currentCount++;

        console.log(players);

        inputName.value = '';
        inputNickname.value = '';

        if (currentCount >= totalPlayers) {
            alert('Todos los jugadores han sido agregados.');
            container.innerHTML = ''; 
            currentCount = 0; 
            Play();
        }
    });
};
