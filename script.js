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

const trackList = Object.keys(tracks);

const audio = document.getElementById('audio');
const source = document.getElementById('audio-source');
const playPauseBtn = document.getElementById('playPauseBtn');
const stopBtn = document.getElementById('stopBtn');
const repeatBtn = document.getElementById('repeatBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeControl = document.getElementById('volumeControl');
const volumeIcon = document.getElementById('volumeIcon');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const trackTitle = document.getElementById('trackTitle');
const bodyElement = document.body;

let currentTrackIndex = 0;
let isRepeating = false;
let isShuffling = false;

// Cambia el icono según volumen
function updateVolumeIcon(volume) {
    volume = parseFloat(volume);
    if (volume === 0) {
        volumeIcon.textContent = 'volume_off';
    } else if (volume > 0 && volume <= 0.5) {
        volumeIcon.textContent = 'volume_down';
    } else {
        volumeIcon.textContent = 'volume_up';
    }
}

// Carga la pista por índice (usando trackList y tracks)
function loadTrack(index, autoplay = true) {
    if (index < 0) index = trackList.length - 1;
    if (index >= trackList.length) index = 0;

    const trackId = trackList[index];
    const trackSrc = tracks[trackId];
    const bgClass = backgrounds[trackId] || '';

    // Cambiar clase de fondo con transición suave
    Object.values(backgrounds).forEach(c => bodyElement.classList.remove(c));
    setTimeout(() => {
        if (bgClass) bodyElement.classList.add(bgClass);
    }, 50);

    source.src = trackSrc;
    audio.load();
    if (autoplay) audio.play();
    currentTrackIndex = index;

    // Obtener título visible desde .track-title que esté junto al botón
    let displayedTitle = trackId;
    const trackElements = document.querySelectorAll('.track');
    for (const trackElement of trackElements) {
        const button = trackElement.querySelector('button');
        if (button && button.getAttribute('onclick')?.includes(trackId)) {
            const titleSpan = trackElement.querySelector('.track-title');
            if (titleSpan) {
                displayedTitle = titleSpan.textContent.trim();
            }
            break;
        }
    }

    trackTitle.textContent = displayedTitle;
    playPauseBtn.textContent = autoplay ? 'pause' : 'play_arrow';
}

// Play/Pause toggle
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = 'pause';
    } else {
        audio.pause();
        playPauseBtn.textContent = 'play_arrow';
    }
});

// Stop
stopBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    playPauseBtn.textContent = 'play_arrow';
});

// Repetir toggle
repeatBtn.addEventListener('click', () => {
    isRepeating = !isRepeating;
    audio.loop = isRepeating;
    repeatBtn.style.color = isRepeating ? '#00bcd4' : '#fff';
});

// Shuffle toggle
shuffleBtn.addEventListener('click', () => {
    isShuffling = !isShuffling;
    shuffleBtn.style.color = isShuffling ? '#00bcd4' : '#fff';
});

// Siguiente pista
nextBtn.addEventListener('click', () => {
    if (isShuffling) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * trackList.length);
        } while (newIndex === currentTrackIndex);
        loadTrack(newIndex);
    } else {
        loadTrack(currentTrackIndex + 1);
    }
});

// Pista anterior
prevBtn.addEventListener('click', () => {
    if (isShuffling) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * trackList.length);
        } while (newIndex === currentTrackIndex);
        loadTrack(newIndex);
    } else {
        loadTrack(currentTrackIndex - 1);
    }
});

// Control de volumen - actualizar audio y icono
volumeControl.addEventListener('input', () => {
    audio.volume = parseFloat(volumeControl.value);
    updateVolumeIcon(volumeControl.value);
});

// Click en icono para mutear/desmutear
volumeIcon.addEventListener('click', () => {
    if (audio.volume > 0) {
        audio.volume = 0;
        volumeControl.value = 0;
    } else {
        audio.volume = 1;
        volumeControl.value = 1;
    }
    updateVolumeIcon(audio.volume);
});

// Actualizar barra de progreso y tiempo
audio.addEventListener('timeupdate', () => {
    progressBar.max = audio.duration || 0;
    progressBar.value = audio.currentTime || 0;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

// Mostrar progreso temporal mientras se mueve el slider
progressBar.addEventListener('input', () => {
    currentTimeEl.textContent = formatTime(progressBar.value);
});

// Cambiar tiempo con barra cuando el usuario termina de mover el slider
progressBar.addEventListener('change', () => {
    audio.currentTime = progressBar.value;
});

// Al terminar pista
audio.addEventListener('ended', () => {
    if (!audio.loop) {
        if (isShuffling) {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * trackList.length);
            } while (newIndex === currentTrackIndex);
            loadTrack(newIndex);
        } else {
            loadTrack(currentTrackIndex + 1);
        }
    }
});

// Formatear segundos a mm:ss
function formatTime(time) {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

// Permitir reproducción externa por ID (ejemplo: playTrack('track3'))
function playTrack(trackId) {
    const index = trackList.indexOf(trackId);
    if (index !== -1) loadTrack(index);
}

// Inicializar volumen e icono al cargar
if (!volumeControl.value) volumeControl.value = 1;
audio.volume = parseFloat(volumeControl.value);
updateVolumeIcon(audio.volume);

// Inicia con la primera canción cargada pero sin autoplay
loadTrack(currentTrackIndex, false);
