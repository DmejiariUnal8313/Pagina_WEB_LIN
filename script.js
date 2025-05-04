// control de la musica de fondo
const backgroundMusic = document.getElementById('background-music');

const sheetUrl = 'https://script.google.com/macros/s/AKfycbxdCn8gyE2n38oy8FppMj8kceOm-OJe9akYjgmDizlmc-837ybSgV9rr82nK3lvNgE/exec';

let messages = [];

let currentMessageIndex = 0;

// Función para actualizar el mensaje en el carrusel
function updateMessage() {
    const messageElement = document.getElementById('carousel-message');
    if (messages.length > 0) {
        let message = messages[currentMessageIndex];
        // Limitar el mensaje a 200 caracteres
        if (message.length > 300) {
            message = message.substring(0, 300) + '...';
        }
        messageElement.textContent = message;
    } else {
        messageElement.textContent = "No hay mensajes disponibles.";
    }
}

// Reproducir música seleccionada
function playSelectedMusic() {
    const musicSelector = document.getElementById('music-selector');
    const selectedMusic = musicSelector.value;

    backgroundMusic.src = selectedMusic;
    backgroundMusic.play();
}

// Función para seleccionar un índice aleatorio
function getRandomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
}


function prevMessage() {
currentMessageIndex = (currentMessageIndex - 1 + messages.length) % messages.length;
    updateMessage();}


function nextMessage() {
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;
    updateMessage();
}

  // Inicializa el primer mensaje
updateMessage();

// Reproducir sonido asociado a un mensaje
function playSound(audioPath) {
    const audio = new Audio(audioPath);
    audio.play();
}
// Función para cargar datos dinámicos desde la API
async function fetchMessages() {
    try {
        const response = await fetch(sheetUrl);
        const data = await response.json();

        // Agregar mensajes dinámicos al array de mensajes
        const dynamicMessages = data.map(entry => `${entry.Mensaje} - ${entry.Apodo}`);
        messages.push(...dynamicMessages);

        // Asignar un índice aleatorio si hay mensajes disponibles
        if (messages.length > 0) {
            currentMessageIndex = getRandomIndex(messages.length);
        }

        // Actualiza el mensaje en el carrusel después de cargar los datos
        updateMessage();

    } catch (error) {
        console.error('Error al cargar los datos dinámicos:', error);
    }
}

// Llama a la función para cargar los datos dinámicos al iniciar la página
fetchMessages();

// Pausar o reanudar la música de fondo
function toggleMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    } else {
        backgroundMusic.pause();
    }
}

// Función para generar una estrella en una posición aleatoria
function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');

    // Generar posición aleatoria
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    // Asignar posición a la estrella
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    // Agregar la estrella al contenedor de estrellas
    document.body.appendChild(star);

    // Eliminar la estrella después de un tiempo para evitar acumulación
    setTimeout(() => {
        star.remove();
    }, 3000); // La estrella desaparecerá después de 3 segundos
}

// Agregar un evento para generar una estrella al hacer clic en la pantalla
document.addEventListener('click', createStar);

