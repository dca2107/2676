const tracks = {
    track3: '2676/3.mp3',
    track10: '2676/10.mp3',
    track12: '2676/12.mp3',
};

const backgrounds = {
    track3: 'mesh-blue-purple',
    track10: 'mesh-green-aqua',
    track12: 'mesh-red-purple',
};

let currentTrack = null;

function playTrack(trackId) {
    const audioElement = document.getElementById('audio');
    const sourceElement = document.getElementById('audio-source');
    const bodyElement = document.body;

    // Elimina la clase de fondo actual
    Object.values(backgrounds).forEach(className => {
        bodyElement.classList.remove(className);
    });

    // Agrega la nueva clase de fondo con un pequeño retraso para una transición suave
    setTimeout(() => {
        bodyElement.classList.add(backgrounds[trackId] || '');
    }, 50);

    // Actualiza la fuente del audio y reproduce
    sourceElement.src = tracks[trackId];
    
    if (currentTrack && currentTrack !== trackId) {
        audioElement.pause();
    }

    audioElement.load();
    audioElement.play();
    currentTrack = trackId;
}

// Función para pausar la reproducción y restaurar el fondo original
function pausePlayback() {
    const audioElement = document.getElementById('audio');
    const bodyElement = document.body;

    // Pausar el audio
    audioElement.pause();

    // Restaurar el fondo original
    bodyElement.style.background = '#121212'; // Fondo original sin cambios

    currentTrack = null;
}

// Escuchar el evento de pausa del audio y restaurar el fondo original
document.getElementById('audio').addEventListener('pause', function() {
    const bodyElement = document.body;
    
    // Restaurar el fondo original
    bodyElement.style.background = '#121212'; // Fondo original
});
