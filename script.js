// Rutas de las canciones disponibles
const tracks = {
    track3: '2676/3.mp3',
    track10: '2676/10.mp3',
    track12: '2676/12.mp3',
};

// Cambios en el fondo por canción
const backgrounds = {
    track3: 'mesh-blue-purple',    // Azul-morado oscuro
    track10: 'mesh-green-aqua',   // Verde-aqua oscuro
    track12: 'mesh-red-purple',   // Rojo-morado oscuro
};

let currentTrack = null;

// Función para reproducir una canción y cambiar el fondo
function playTrack(trackId) {
    const audioElement = document.getElementById('audio');
    const sourceElement = document.getElementById('audio-source');
    
    // Cambiar la fuente del audio al track seleccionado
    sourceElement.src = tracks[trackId];
    
    // Cambiar el fondo de la página aplicando la clase adecuada
    document.body.className = backgrounds[trackId] || ''; // Fondo gris oscuro por defecto
    
    // Detener la canción anterior si está en reproducción
    if (currentTrack && currentTrack !== trackId) {
        audioElement.pause();
    }

    audioElement.load();
    audioElement.play();
    currentTrack = trackId;
}
