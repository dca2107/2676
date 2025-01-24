// Función para cambiar el fondo según la canción
function changeBackground(songNumber) {
    if (songNumber === 3) {
        document.body.style.background = 'linear-gradient(45deg, #0f4c82, #4b0f82)'; // Azul-morado
        changeSong('2676/3.mp3'); // Ruta de la canción 3
    } else if (songNumber === 10) {
        document.body.style.background = 'linear-gradient(45deg, #2d9c7b, #1bb0c3)'; // Verde-Aqua
        changeSong('2676/10.mp3'); // Ruta de la canción 10
    } else if (songNumber === 12) {
        document.body.style.background = 'linear-gradient(45deg, #d32f2f, #6a1b9a)'; // Rojo-morado
        changeSong('2676/12.mp3'); // Ruta de la canción 12
    }
}

// Función para cambiar la canción en el reproductor de audio
function changeSong(songPath) {
    const audioPlayer = document.querySelector('audio');
    const audioSource = document.querySelector('#audio-source');

    // Cambiar la fuente de la canción en el reproductor
    audioSource.src = songPath;
    audioPlayer.load();  // Recargar el reproductor con la nueva canción
    audioPlayer.play();  // Reproducir la canción automáticamente
}

// Función para restaurar el fondo cuando no hay canción o se pausa
function resetBackground() {
    const audioPlayer = document.querySelector('audio');
    
    // Solo poner el fondo gris si el audio no está reproduciéndose (en pausa o detenido)
    if (audioPlayer.paused || audioPlayer.currentTime === 0) {
        document.body.style.background = '#121212'; // Fondo gris oscuro
    }
}

// Asignar eventos a los botones de reproducción
const playButtons = document.querySelectorAll('.play-btn');
playButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const songNumber = parseInt(e.target.dataset.song);
        changeBackground(songNumber);
    });
});

// Detectar cuando el audio está en pausa
const audioPlayer = document.querySelector('audio');
if (audioPlayer) {
    audioPlayer.addEventListener('pause', resetBackground);
    audioPlayer.addEventListener('ended', resetBackground);  // Para cuando el audio termine de reproducirse también
    audioPlayer.addEventListener('play', () => { // Aseguramos que no se resetee si está en reproducción
        // No hacer nada para el fondo cuando el audio está en reproducción
    });
}
