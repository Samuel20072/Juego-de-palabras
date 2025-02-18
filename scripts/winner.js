import { players } from "./app.js";
const podium = document.querySelector('.podium');
export const winner = () =>{
    players.sort((a, b) => b.amount - a.amount);

    players.forEach((player, index) => {
        const playerElement = document.createElement('div');
        playerElement.classList.add('player');

        const positionElement = document.createElement('div');
        positionElement.classList.add(`position-${index + 1}`);
        positionElement.textContent = index + 1;
        playerElement.appendChild(positionElement);

     
        const idElement = document.createElement('div');
        idElement.classList.add('id');
        idElement.textContent = player.id;
        playerElement.appendChild(idElement);

    
        const nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.textContent = player.name;
        playerElement.appendChild(nameElement);

        const scoreElement = document.createElement('div');
        scoreElement.classList.add('score');
        scoreElement.textContent = player.amount;
        playerElement.appendChild(scoreElement);

      
        podium.appendChild(playerElement);
    });

    
    alert(`¡El ganador es ${players[0].name}! Ha acumulado ${players[0].amount} palabras.`);
}
