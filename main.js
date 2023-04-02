
const musiclibsContainer = document.getElementById('music-lib');
const audioPlayer = document.getElementById('audio_player');

var currentSongObj = {};

window.addEventListener('load', bootUpApp);

function bootUpApp() {
    fetchAndRenderAllSection();
}

function fetchAndRenderAllSection() {
    fetch('/assests/js/ganna.json')
        .then(res => res.json())
        .then(res => {
            console.table('response:',res);
            const {cardbox} = res;
            if (Array.isArray(cardbox) && cardbox.length) {
                cardbox.forEach(section=>{
                    const {songsbox,songscards} = section;
                    renderSection(songsbox,songscards);
                });
            }
        })
        .catch((err) => {
            console.log(err);
            alert("Error Occure");
        })
}

function renderSection(title, songsList) {
   const songsSection = makeSectionDom(title,songsList);
   musiclibsContainer.appendChild(songsSection);
}

function makeSectionDom(title,songsList) {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'songs-section'; 
    sectionDiv.innerHTML = `<h2 class="section-heading">${title}</h2>
    <div class="songs-cont">
         ${songsList.map(songObj=>buildSongCardDom(songObj)).join('')}
    </div>`;
    console.log(sectionDiv);
    return sectionDiv;
}

function buildSongCardDom(songObj) {
    return `<div class="songs-card" onclick="playSong(this)" data-songobj='${JSON.stringify(songObj)}'>
    <div class="img-cont">
        <img src="/${songObj.image_source}" alt="${songObj.song_name}">
        <div class="overlay"></div>
    </div>
    <p class="song-name">${songObj.song_name}</p>
</div>`;
}

//music player function
function playSong(songCardEl){
     const songObj =JSON.parse(songCardEl.dataset.songobj);
     console.log(songObj);
     setCurrentSong(songObj);
    document.getElementById('music-player').style.visibility = "visible";
}

function setCurrentSong(songObj){
    currentSongObj = songObj;
    audioPlayer.pause();
    audioPlayer.src = songObj.quality.low;
    audioPlayer.currentTime = 0;
    audioPlayer.play();

    updatePlayerUi(songObj);
}

function updatePlayerUi(songObj){
    const songImg = document.getElementById('song-img');
    const songName = document.getElementById('song-name');
    const songCurrentTime = document.getElementById('songTimeStart');
    const songTotalTime = document.getElementById('songTotalTime');
    const platBtn = document.getElementById('play');

    songImg.src = songObj.image_source;
    songName.src = songObj.song_name;
    songCurrentTime.innerHTML = audioPlayer.currentTime;
    songTotalTime.innerHTML = audioPlayer.duration;  


}

