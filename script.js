// Rutas de las canciones del álbum (puedes poner la ruta de tus archivos de audio)
const tracks = {
    track1: '2676/1.mp3',
    track2: '2676/2.mp3',
    // Agrega más canciones según sea necesario
};

let currentTrack = null;

// Función para reproducir una canción
function playTrack(trackId) {
    const audioElement = document.getElementById('audio');
    const sourceElement = document.getElementById('audio-source');
    
    // Cambiar la fuente del audio al track seleccionado
    sourceElement.src = tracks[trackId];
    
    // Detener la canción anterior si está en reproducción
    if (currentTrack && currentTrack !== trackId) {
        audioElement.pause();
    }

    audioElement.load();
    audioElement.play();
    currentTrack = trackId;
}
