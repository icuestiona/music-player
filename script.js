let progress = document.getElementById("progress");
let song = document.createElement("audio");
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
let autoPlayBtn = document.querySelector("#play_all");
let currentVolume = document.querySelector(".volume");
let showVolume = document.querySelector("#show_volume");
let volumeIcon = document.querySelector("#volume_icon");
let volume_slider = document.querySelector("#volume_slider");
let trackImage = document.querySelector(".track_img");
let title = document.querySelector(".title");
let artist = document.querySelector(".artist");
let songCurrentTime = document.querySelector(".current_time");
let songDuration = document.querySelector(".total_duration");
let hamBurger = document.querySelector(".fa-bars");
let closeIcon = document.querySelector(".fa-times");
let musicPlaylist = document.querySelector(".music_playlist");
let playlistDiv = document.querySelector(".playlist_div");
let Playlist = document.querySelector(".playlist");

//All Event Listeners
next.addEventListener("click", nextTrack);
previous.addEventListener("click", prevTrack);
autoPlayBtn.addEventListener("click", autoPlayToggle);
autoPlayBtn.addEventListener("click", updateProgress);
volumeIcon.addEventListener("click", muteSound);
volume_slider.addEventListener("change", setVolume);
song.addEventListener("timeupdate", songTimeUpdate);
hamBurger.addEventListener("click", showPlayList);
closeIcon.addEventListener("click", hidePlayList);

//
let timer;
let autoplay = 0;
let track_index = 0;
let isPlaying = false;

//Load Tracks
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
    path: "src/music/Adele_Rolling.mp3",
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

function loadTrack(track_index) {
  clearInterval(timer);
  reset_progress();

  song.src = trackList[track_index].path;
  trackImage.src = trackList[track_index].img;
  title.textContent = trackList[track_index].name;
  artist.textContent = trackList[track_index].singer;
  song.load();

  timer = progress.onchange();
  song.addEventListener("ended", nextTrack);
  playPause();
}
loadTrack(track_index);

// reset progress slider
function reset_progress() {
  progress.value = 0;
}

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
function updateProgress() {
  let position = 0;

  if (!isNaN(song.duration)) {
    position = song.currentTime * (100 / song.duration);
    progress.value = position;
  }

  if (song.ended) {
    play.innerHTML = '<i class="fa-solid fa-play"></i>';
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

//Update current some time
function songTimeUpdate() {
  if (song.duration) {
    let currentMinutes = Math.floor(song.currentTime / 60);
    let currentSeconds = Math.floor(song.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(song.duration / 60);
    let durationSeconds = Math.floor(song.duration - durationMinutes * 60);

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    songCurrentTime.textContent = currentMinutes + ":" + currentSeconds;
    songDuration.textContent = durationMinutes + ":" + durationSeconds;
  } else {
    songCurrentTime.textContent = "00" + ":" + "00";
    songDuration.textContent = "00" + ":" + "00";
  }
}

//Mute Sound
function muteSound() {
  song.volume = 0;
  volumeIcon.value = 0;
  showVolume.textContent = 0;
}

//Change Volume
function setVolume() {
  showVolume.innerHTML = volume_slider.value;
  song.volume = volume_slider.value / 100;
}

//Show PlayList
function showPlayList() {
  musicPlaylist.style.transform = "translateX(0)";
}

//Hide PlayList
function hidePlayList() {
  musicPlaylist.style.transform = "translateX(-100%)";
}

// Display tracks in Playlist
let counter = 1;
function displayTracks() {
  for (let i = 0; i < trackList.length; i++) {
    console.log(trackList[i].name);
    let div = document.createElement("div");
    div.classList.add("playlist");
    div.innerHTML = ` 
      <span class="song_index">${counter++}</span>
      <p class="single_song">${trackList[i].name}</p> `;

    playlistDiv.appendChild(div);
  }
  playFromPlaylist();
}

displayTracks();

//Play song from the Playlist
function playFromPlaylist() {
  playlistDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("single_song")) {
      // alert(e.target.innerHTML);
      const indexNum = trackList.findIndex((item, index) => {
        if (item.name === e.target.innerHTML) {
          return true;
        }
      });
      loadTrack(indexNum);
      playPause();
      hidePlayList();
    }
  });
}
