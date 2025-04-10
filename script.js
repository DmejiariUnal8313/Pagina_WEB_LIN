// control de la musica de fondo
const backgroundMusic = document.getElementById('background-music');

const sheetUrl = 'https://api.sheetbest.com/sheets/bbbe6518-b863-450c-bcfc-4adbed0cd426';

let messages = [];

let currentMessageIndex = 0;

// Función para actualizar el mensaje en el carrusel
function updateMessage() {
    const messageElement = document.getElementById('carousel-message');
    if (messages.length > 0) {
        messageElement.textContent = messages[currentMessageIndex];
    } else {
        messageElement.textContent = "No hay mensajes disponibles.";
    }
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

function playSound(nombre) {
    
if (audios[nombre]) {
    audios[nombre].pause();
    audios[nombre].currentTime = 0;
    audios[nombre].play();
}
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

function toggleMusic() {
if (backgroundMusic.paused) {
    backgroundMusic.play();
} else {
    backgroundMusic.pause();
}
}