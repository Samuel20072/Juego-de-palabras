const btnPlayers = document.querySelectorAll('.btn-players');
const content = document.querySelector('.content');

let players = []; // Lista vacía de jugadores
let totalPlayers = 0; // Cantidad total de jugadores a agregar
let currentCount = 0; // Contador de jugadores agregados

btnPlayers.forEach(button => {
    button.addEventListener('click', () => {
        totalPlayers = parseInt(button.value); // Obtener la cantidad de jugadores

        if (!isNaN(totalPlayers) && totalPlayers > 0) {
            showForm();
        } else {
            alert('Ingrese un número válido de jugadores.');
        }
    });
});

const showForm = () => {
    content.innerHTML = ''; // Limpiar contenido antes de agregar el formulario

    const form = document.createElement('form');
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

    form.appendChild(inputName);
    form.appendChild(inputNickname);
    form.appendChild(btnSubmit);
    content.appendChild(form);

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el envío del formulario

        const name = inputName.value.trim();
        const nickName = inputNickname.value.trim();

        if (name === '' || nickName === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        // Generar un nuevo ID
        const newId = players.length > 0 ? players[players.length - 1].id + 1 : 1;

        // Crear el nuevo jugador
        const newPlayer = {
            id: newId,
            name,
            nickName,
            amount: 0
        };

        players.push(newPlayer);
        currentCount++;

        console.log(players); // Verificar que se están agregando correctamente

        // Limpiar los inputs para el siguiente jugador
        inputName.value = '';
        inputNickname.value = '';

        // Si ya se ingresaron todos los jugadores, ocultar el formulario
        if (currentCount >= totalPlayers) {
            alert('Todos los jugadores han sido agregados.');
            content.innerHTML = ''; // Limpiar el formulario
            currentCount = 0; // Reiniciar el contador
        }
    });
};
