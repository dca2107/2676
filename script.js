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

    // Eliminar la clase de fondo actual
    Object.values(backgrounds).forEach(className => {
        bodyElement.classList.remove(className);
    });

    // Agregar la nueva clase de fondo con un pequeño retraso para transición suave
    setTimeout(() => {
        bodyElement.classList.add(backgrounds[trackId] || '');
    }, 50);

    // Actualizar la fuente del audio y reproducir
    sourceElement.src = tracks[trackId];
    
    if (currentTrack && currentTrack !== trackId) {
        audioElement.pause();
    }

    audioElement.load();
    audioElement.play();
    currentTrack = trackId;
}

function pausePlayback() {
    const audioElement = document.getElementById('audio');
    const bodyElement = document.body;

    // Pausar el audio
    audioElement.pause();

    // Restaurar el fondo original
    bodyElement.style.background = '#121212'; // Fondo original sin cambios

    currentTrack = null;
}
