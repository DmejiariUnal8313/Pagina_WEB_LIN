// control de la musica de fondo
const backgroundMusic = document.getElementById('background-music');

const sheetUrl = 'https://api.sheetbest.com/sheets/bbbe6518-b863-450c-bcfc-4adbed0cd426';

let messages = [];

let currentMessageIndex = 0;

// funcion para actualizar el mensaje en el carrusel
function updateMessage() {
    const messageElement = document.getElementById('carousel-message');
    messageElement.textContent = messages[currentMessageIndex];
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
async function fetchMessagesAndAudios() {
    try {
        const response = await fetch(sheetUrl);
        const data = await response.json();

        // Agregar mensajes dinámicos al array de mensajes
        const dynamicMessages = data.map(entry => `${entry.Mensaje} - ${entry.Apodo}`);
        messages.push(...dynamicMessages);

        
    } catch (error) {
        console.error('Error al cargar los datos dinámicos:', error);
    }
}


function toggleMusic() {
if (backgroundMusic.paused) {
    backgroundMusic.play();
} else {
    backgroundMusic.pause();
}
}