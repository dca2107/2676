const songs = [
    { number: 3, title: "Canción 3", path: "2676/3.mp3", gradient: "linear-gradient(120deg, #0f4c82, #4b0f82)" },
    { number: 10, title: "Canción 10", path: "2676/10.mp3", gradient: "linear-gradient(120deg, #2d9c7b, #1bb0c3)" },
    { number: 12, title: "Canción 12", path: "2676/12.mp3", gradient: "linear-gradient(120deg, #d32f2f, #6a1b9a)" },
];

const trackList = document.querySelector('.track-list');

songs.forEach(song => {
    const track = document.createElement('div');
    track.classList.add('track');
    track.innerHTML = `
        <span class="track-title">${song.title}</span>
        <button class="play-btn" data-song="${song.number}">Reproducir</button>
    `;
    trackList.appendChild(track);
});

function playSong(song) {
    document.body.style.background = song.gradient;
    const audioPlayer = document.querySelector('#audio-player');
    const audioSource = document.querySelector('#audio-source');
    audioSource.src = song.path;
    audioPlayer.load();
    audioPlayer.play();
}

document.querySelectorAll('.play-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const songNumber = parseInt(e.target.dataset.song);
        const song = songs.find(s => s.number === songNumber);
        if (song) playSong(song);
    });
});
