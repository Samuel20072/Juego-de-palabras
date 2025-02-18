const puntajePlayers = JSON.parse(localStorage.getItem("puntajePlayers")) || [];

const container = document.querySelector('.container');

const winner = () => {
    // Ordenar los jugadores por puntaje de mayor a menor
    puntajePlayers.sort((a, b) => b.amount - a.amount);

    const podium = document.createElement('div');
    podium.classList.add('podium');

    puntajePlayers.forEach((player, index) => {
        const playerElement = document.createElement('div');

        if (index === 0) {
            playerElement.classList.add('first'); 
        } else if (index === 1) {
            playerElement.classList.add('second'); 
        } else if (index === 2) {
            playerElement.classList.add('third'); 
        } else {
            playerElement.classList.add('fourth'); 
        }

        const positionElement = document.createElement('div');
        positionElement.classList.add(`number${index + 1}`); // Asigna clase de número (number1, number2, etc.)
        positionElement.textContent = index + 1;
        playerElement.appendChild(positionElement);

        const nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.textContent = player.name;
        playerElement.appendChild(nameElement);

        const scoreElement = document.createElement('div');
        scoreElement.classList.add('score');
        scoreElement.textContent = `Puntos: ${player.amount}`;
        playerElement.appendChild(scoreElement);

        podium.appendChild(playerElement);
    });

    container.appendChild(podium);

    // Mostrar mensaje con el ganador
    if (puntajePlayers.length > 0) {
        alert(`¡El ganador es ${puntajePlayers[0].name}! Ha acumulado ${puntajePlayers[0].amount} palabras.`);
    }
};

winner();
