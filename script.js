let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

function playPause() {
  if (ctrlIcon.classList.contains("fa-pause")) {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  } else {
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
  }
}
if (song.play()) {
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
}

progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
};

//
let previous = document.querySelector("#prev");
let next = document.querySelector("#next");
let autoPlayBtn = document.querySelector("#play-all");
let currentVolume = document.querySelector(".volume");
let showVolume = document.querySelector("#show_volume");
let volumeIcon = document.querySelector("#volume-icon");
let volume_slider = document.querySelector("#volume_slider");
let trackImage = document.querySelector(".track_img");
let title = document.querySelector(".title");
let artist = document.querySelector(".artist");
let trackCurrentTime = document.querySelector(".current_time");
let trackDuration = document.querySelector(".total_duration");
let hamBurger = document.querySelector(".fa-bars");
let closeIcon = document.querySelector(".fa-times");
let musicPlaylist = document.querySelector(".music-playlist");
let Playlist = document.querySelector(".playlist");
let curr_track = document.createElement("audio");
//
let timer;
let autoplay = 0;
let track_index = 0;
let isPlaying = false;

//

const trackList = [
  {
    name: "Diamonds",
    path: "src/music/Rihanna-Diamonds.mp3",
    img: "src/images/Rihanna.JPG",
    singer: "Rihanna- Barbados",
  },
  {
    name: "Believer",
    path: "src/music/Imagine-Dragons-Believer.mp3",
    img: "src/images/Imagine-Dragons.JPG",
    singer: "Imagine Dragons. United States",
  },
  {
    name: "Rolling in the deep",
    path: "src/music/adele_rolling_in_the_deep.mp3",
    img: "src/images/Adele.JPG",
    singer: "Adele. England",
  },
  {
    name: "Respect",
    path: "src/music/Respect-Aretha Franklin.mp3",
    img: "src/images/aretha-franklin.jpeg",
    singer: "Aretha Franklin. United States",
  },
  {
    name: "Nothing breaks like a heart",
    path: "src/music/Miley_Cyrus_Nothing_Breaks.mp3",
    img: "src/images/Miley_Cyrus.jpg",
    singer: "Mark Ronson ft. Myley Cyrus",
  },
  {
    name: "Viva la vida",
    path: "src/music/Coldplay_Viva_La_Vida.mp3",
    img: "src/images/Coldplay2.jpg",
    singer: "Coldplay. United States",
  },
  {
    name: "Uptown Funk",
    path: "src/music/Mark Ronson_ft. Bruno Mars-Uptown Funk.mp3",
    img: "src/images/Mark-Ronson-Bruno-Mars.jpg",
    singer: "Mark Ronson ft. Bruno Mars",
  },
];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(timer);
  reset();

  song.src = trackList[track_index].path;
  trackImage.src = trackList[track_index].img;
  title.InnerHTML = trackList[track_index].name;
  artist.InnerHTML = trackList[track_index].singer;
  curr_track.load();

  timer = setInterval(progress, 1000);
}
loadTrack(track_index);

//All Event Listeners
next.addEventListener("click", nextTrack);
previous.addEventListener("click", prevTrack);
autoPlayBtn.addEventListener("click", autoPlayToggle);
volumeIcon.addEventListener("click", muteSound);
currentVolume.addEventListener("change", setVolume);
curr_track.addEventListener("ended", nextTrack);

//Load Tracks

//Next song
function nextTrack() {
  if (track_index < trackList.length - 1) {
    track_index += 1;
    loadTrack(track_index);
    playPause();
  } else {
    track_index = 0;
    loadTrack(track_index);
    playPause();
  }
}
//Prev song
function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
    loadTrack(track_index);
    playPause();
  } else {
    track_index = trackList.length - 1;
    loadTrack(track_index);
    playPause();
  }
}

//Auto Play
function autoPlayToggle() {
  if (autoplay == 1) {
    autoplay = 0;
    autoPlayBtn.style.background = "#2e8a9c";
  } else {
    autoplay = 1;
    autoPlayBtn.style.background = "#fff";
  }
}

//Update slider
function updateSlider() {
  if (track.ended) {
    ctrlIcon.classList.add("fa-play");
    if (autoplay == 1 && track_index < trackList.length - 1) {
      track_index++;
      loadTrack(track_index);
      playPause();
    } else if (autoplay == 1 && track_index == trackList.length - 1) {
      track_index = 0;
      loadTrack(track_index);
      playPause();
    }
  }
}

function reset() {
  progress.value = 0;
}
