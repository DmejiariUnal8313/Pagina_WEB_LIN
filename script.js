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
function convertToDirectLink(url) {
    if (url.includes('drive.google.com/open?id=')) {
        const fileId = url.split('id=')[1];
        return `https://drive.google.com/uc?id=${fileId}`;
    } else if (url.includes('drive.google.com/file/d/')) {
        const fileId = url.split('/d/')[1].split('/')[0];
        return `https://drive.google.com/uc?id=${fileId}`;
    }
    return url; // Devuelve la URL original si ya es un enlace directo
}

// Función para reproducir un audio dinámico
function playAudio(audioUrl) {
    const directUrl = convertToDirectLink(audioUrl); // Convierte la URL a un enlace directo
    console.log('Intentando reproducir:', directUrl); // Verifica la URL en la consola

    const audio = new Audio(directUrl);
    audio.play().catch(error => {
        console.error('Error al reproducir el audio:', error);
    });
}

// Llama a la función para cargar los datos dinámicos al iniciar la página
fetchMessagesAndAudios();



function toggleMusic() {
if (backgroundMusic.paused) {
    backgroundMusic.play();
} else {
    backgroundMusic.pause();
}
}