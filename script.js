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

// Función para detener la reproducción y restaurar el fondo original
function stopPlayback() {
    const audioElement = document.getElementById('audio');
    const bodyElement = document.body;
    
    audioElement.pause();
    audioElement.currentTime = 0;
    
    // Elimina todas las clases de fondo
    Object.values(backgrounds).forEach(className => {
        bodyElement.classList.remove(className);
    });
    
    currentTrack = null;
}

// Agregar evento de pausa para restaurar el fondo original
document.getElementById('audio').addEventListener('pause', function() {
    const bodyElement = document.body;
    
    // Eliminar el fondo actual
    Object.values(backgrounds).forEach(className => {
        bodyElement.classList.remove(className);
    });
    
    // Restaurar el fondo original
    bodyElement.style.background = '#121212'; // Color original
});
