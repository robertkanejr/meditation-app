const song = document.querySelector('.song');
const play = document.querySelector('.play');
// const replay = document.querySelector('.replay');
const outline = document.querySelector('.moving-outline circle');
const video = document.querySelector('.vid-container video');

//Sounds
const sounds = document.querySelectorAll('.sound-picker button');

//Time Display
const timeDisplay = document.querySelector('.time-display');
const timeSelect = document.querySelectorAll('.time-select button');
const outlineLength = outline.getTotalLength();

//Set Duration
let duration = 600;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;
timeDisplay.textContent = `${Math.floor(duration / 60)}:${("0" + Math.floor(duration % 60))}`

//Select Sound
sounds.forEach(sound => {
    sound.addEventListener("click", function () {
        song.src = this.getAttribute('data-sound');
        video.src = this.getAttribute('data-video');
        checkPlaying(song);
    })
})

//Play Song
play.addEventListener("click", () => {
    checkPlaying(song);
});

//Replay Song
// replay.addEventListener("click", () => {
//     restartSong(song);
// })

// const restartSong = (song) => {
//     let currentTime = song.currentTime;
//     if (song.currentTime == 0) {
//         console.log("Namaste")
//     }
// }

//Select Duration
timeSelect.forEach(option => {
    option.addEventListener("click", function () {
        duration = this.getAttribute("data-time");
        timeDisplay.textContent = `${Math.floor(duration / 60)}:${("0" + Math.floor(duration % 60))}`;
    });
});

//Toggle Sound
const checkPlaying = (song) => {
    if (song.paused) {
        song.play();
        video.play();
        play.src = './svg/pause.svg';
    } else {
        song.pause();
        video.pause();
        play.src = './svg/play.svg';
    }
};

//Animations
song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = duration - currentTime;
    let seconds = ("0" + Math.floor(elapsed % 60)).slice(-2);
    let minutes = Math.floor(elapsed / 60);

    //Time Animation
    timeDisplay.textContent = `${minutes}:${seconds}`;

    //Circle animation
    let progress = outlineLength - (currentTime / duration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    if (currentTime >= duration) {
        song.pause();
        song.currentTime = 0;
        play.src = './svg/play.svg';
        video.pause();
    };
};