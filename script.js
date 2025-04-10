const messages = [
    "¡Eres nuestra estrella favorita, Lin! 🌟",
    "Gracias por hacernos sonreír cada día. 💖",
    "¡Feliz cumpleaños! Que todos tus sueños se hagan realidad. 🎉",
    "Tu luz ilumina nuestras vidas. 🌟",
    "¡Sigue brillando como siempre, Lin! ✨"
];

let currentMessageIndex = 0;

function updateMessage() {
    const messageElement = document.getElementById('carousel-message');
    messageElement.textContent = messages[currentMessageIndex];
}

function prevMessage() {
currentMessageIndex = (currentMessageIndex - 1 + messages.length) % messages.length;
    updateMessage();


function nextMessage() {
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;
    updateMessage();
}

  // Inicializa el primer mensaje
updateMessage();

const audios = {
saludo1: new Audio('audios/saludo1.mp3'),
saludo2: new Audio('audios/saludo2.mp3'),
saludo3: new Audio('audios/saludo3.mp3'),
};

const backgroundMusic = document.getElementById('background-music');

function toggleMusic() {
if (backgroundMusic.paused) {
    backgroundMusic.play();
} else {
    backgroundMusic.pause();
}
}

function playSound(nombre) {
    
if (audios[nombre]) {
    audios[nombre].pause();
    audios[nombre].currentTime = 0;
    audios[nombre].play();
}
}
}