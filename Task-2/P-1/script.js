const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const volumeSlider = document.getElementById("volume");

// Playlist
const songs = [
  {
    title: "Flute 1 : \nby Pandit Hariprasad Chaurasia",
    src: "./music/f1.mp3",
    cover: "./music/flt-1.jpeg",
  },
  {
    title: "Flute 2 : \nby Pandit Pannalal Ghosh",
    src: "./music/f2.mp3",
    cover: "./music/flt-2.jpeg",
  },
  {
    title: "Flute 3 : \nby Ronu Majumdar",
    src: "./music/f3.mp3",
    cover: "./music/flt-3.jpeg",
  },
  {
    title: "Flute 4 : \nby Nityanand Haldipur",
    src: "./music/f4.mp3",
    cover: "./music/flt-4.jpeg",
  },
];

let songIndex = 0;

// Load song
function loadSong(song) {
  title.innerText = song.title;
  audio.src = song.src;
  cover.src = song.cover;
}
loadSong(songs[songIndex]);

// Play Song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fa").classList.remove("fa-play");
  playBtn.querySelector("i.fa").classList.add("fa-pause");
  audio.play();
}

// Pause Song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fa").classList.add("fa-play");
  playBtn.querySelector("i.fa").classList.remove("fa-pause");
  audio.pause();
}

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Progress bar update
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPerCent = (currentTime / duration) * 100;
  progress.style.width = `${progressPerCent}%`;
}
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Auto play next
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
});
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);

// Volume Control
volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});
