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

    // Remove current background class
    Object.values(backgrounds).forEach(className => {
        bodyElement.classList.remove(className);
    });

    // Add new background class with a slight delay for smooth transition
    setTimeout(() => {
        bodyElement.classList.add(backgrounds[trackId] || '');
    }, 50);

    // Update audio source and play
    sourceElement.src = tracks[trackId];
    
    if (currentTrack && currentTrack !== trackId) {
        audioElement.pause();
    }
    
    audioElement.load();
    audioElement.play();
    currentTrack = trackId;
}

function stopPlayback() {
    const audioElement = document.getElementById('audio');
    const bodyElement = document.body;
    
    audioElement.pause();
    audioElement.currentTime = 0;
    
    // Remove all background classes with smooth transition
    Object.values(backgrounds).forEach(className => {
        bodyElement.classList.remove(className);
    });
    
    currentTrack = null;
}

if (tracks[trackId]) {
    sourceElement.src = tracks[trackId];
} else {
    console.error('Track no encontrado:', trackId);
    return; // O manejar el error de otra forma
}

