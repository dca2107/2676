const tracks = {
    track3: '2676/3.mp3',
    track10: '2676/10.mp3',
    track12: '2676/12.mp3',
};

// Asociar canciones con fondos
const backgrounds = {
    track3: 'mesh-blue-purple',    // Azul-morado
    track10: 'mesh-green-aqua',   // Verde-aqua
    track12: 'mesh-red-purple',   // Rojo-morado
};

let currentTrack = null;

// Función para reproducir una canción y cambiar el fondo
function playTrack(trackId) {
    const audioElement = document.getElementById('audio');
    const sourceElement = document.getElementById('audio-source');
    const bodyElement = document.body;

    // Cambiar la fuente del audio al track seleccionado
    sourceElement.src = tracks[trackId];

    // Cambiar la clase del fondo del <body>
    bodyElement.className = backgrounds[trackId] || ''; // Fondo gris oscuro si no se encuentra

    // Detener la canción anterior si está en reproducción
    if (currentTrack && currentTrack !== trackId) {
        audioElement.pause();
    }

    // Reproducir la nueva canción
    audioElement.load();
    audioElement.play();
    currentTrack = trackId;
}


function stopPlayback() {
    const audioElement = document.getElementById('audio');
    const bodyElement = document.body;

    audioElement.pause();
    audioElement.currentTime = 0; // Reinicia el tiempo del audio
    bodyElement.className = ''; // Restablece el fondo predeterminado
    currentTrack = null;
}
