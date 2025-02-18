export const randomLetters = () => {
    const words = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const allowedLetter = words[Math.floor(Math.random() * words.length)];

    const letterElement = document.createElement('div');
    letterElement.textContent = allowedLetter;
    letterElement.classList.add('letter-circle');

    return { letterElement, allowedLetter };
};
 export const chronometer = (updatePlayer) => {
     let seconds = 0;
     let interval = setInterval(() => {
         seconds++;

         let minutes = Math.floor(seconds / 60);
         let seg = seconds % 60;
         let timeFormatted = 
             (minutes < 10 ? "0" : "") + minutes + ":" + 
             (seg < 10 ? "0" : "") + seg;

         const chronometerElement = document.getElementById('chronometer');
         if (chronometerElement) {
             chronometerElement.textContent = timeFormatted;
         }

         if (seconds >= 60) {
             clearInterval(interval);
             console.log("Tiempo terminado! Turno finalizado.");
            
            
             updatePlayer(); 
         }
     }, 1000);
     return interval;
};

