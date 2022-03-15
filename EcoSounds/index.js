const buttonPlay = document.querySelector('.play');
const buttonPause = document.querySelector('.pause');
const songsList = document.querySelectorAll('[data-song]');
const main = document.querySelector('.main');
const img = document.createElement('img');
let isPlaying = false;
const audio = new Audio();
img.setAttribute('src', "./assets/images/solovey.jpg")
main.appendChild(img)

songsList.forEach((el) => {
    audio.pause();
    isPlaying = true;
    el.addEventListener('click', playMusic)
});

function playMusic(e) {
    let audioSong = e.target.getAttribute('data-song');
    songsList.forEach((e) => {
        e.classList.remove('activ')
    });
    e.target.classList.add('activ')
    isPlaying = true;
    (audioSong) ? songs(audioSong) : songs(null);
}
function pauseMusic(e) {
    e.target.classList.add('activ')
    isPlaying = false;
    songs(null);
}

function songs(audioSong) {
    audioSong === null ? audioSong = 'solovey' : audioSong;
    audio.src = `./assets/sounds/${audioSong}.mp3`;
    img.src = `./assets/images/${audioSong}.jpg`;
    if (isPlaying === true) {
        buttonPlay.classList.add('blockPlayNon');
        buttonPause.classList.remove('blockPlayNon');
        audio.currentTime = 0
        audio.play()
    } else {
        buttonPlay.classList.remove('blockPlayNon');
        buttonPause.classList.add('blockPlayNon');
        audio.pause();
    }
}

buttonPlay.addEventListener('click', playMusic);
buttonPause.addEventListener('click', pauseMusic);