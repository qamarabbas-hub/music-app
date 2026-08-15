
let songIndex = 0;
let currentsong = new Audio('songs/1.mp3');

let songItems = Array.from(document.getElementsByClassName('songItem'));
let songplay = document.getElementById('play');

let songNames = [
    "let me down slowly.Mp3", "Tum Hi Ho", "Kabira", "Kun Faya Kun",
    "Channa Mereya", "Raabta", "Jeene Laga Hoon",
    "Muskurane", "Tera Ban Jaunga", "Hawayein", "Tujh Mein Rab"
];

let songs = [];













for (let i = 0; i < songNames.length; i++) {
    songs.push({
        songName: songNames[ i ],
        filePath: `songs/${i + 1}.mp3`,
        coverPath: `covers/${i + 1 <= 10 ? i + 1 : 10}.jpg`
    });
}




songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[ 0 ].src = songs[ i ].coverPath;
    element.getElementsByClassName("songName")[ 0 ].innerText = songs[ i ].songName;

})




// Function to play selected song
function playSong(index) {
    currentsong.src = songs[ index ].filePath;

    currentsong.play();
    songIndex = index;
    play.src = "images/pause.svg";

    document.getElementById("currentSongName").innerText = `Now Playing: ${songs[ index ].songName}`;
    document.querySelector(".songtime").innerHTML = "00:00/00:00";


}

// Add event listeners to play buttons
document.querySelectorAll('.playSongBtn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let index = parseInt(e.currentTarget.getAttribute('data-index'));
        playSong(index);

    });


});
// song play on seekbar
songplay.addEventListener("click", () => {
    if (currentsong.paused) {
        currentsong.play();
        play.src = "images/pause.svg";
    }
    else {
        currentsong.pause();
        play.src = "images/play.svg";

    }
})

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const formattedMins = mins < 10 ? `0${mins}` : mins;
    const formattedSecs = secs < 10 ? `0${secs}` : secs;
    return `${formattedMins}:${formattedSecs}`;
}

currentsong.addEventListener("timeupdate", () => {
    console.log(currentsong.currentTime, currentsong.duration);
    document.querySelector(".songtime").innerHTML = `${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`
    document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";

})
// seekbar movement
document.querySelector(".seekbar").addEventListener("click", e => {
    let percentage = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percentage + "%";
    currentsong.currentTime = ((currentsong.duration) * percentage) / 100;
})

document.querySelector(".hamberger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
})

document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-110%";
})



// Ensure these elements exist in your HTML
let previous = document.getElementById("previous");
let next = document.getElementById("next");

previous.addEventListener("click", () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1; // Loop to last song
    } else {
        songIndex--;
    }
    playSong(songIndex);
});

next.addEventListener("click", () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0; // Loop to first song
    } else {
        songIndex++;
    }
    playSong(songIndex);
});

currentsong.addEventListener("ended", () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0; // Start from the beginning
    } else {
        songIndex++;
    }
    playSong(songIndex);
});

// Get volume slider and display span
let volumeSlider = document.querySelector(".volume input");
let volumePercent = document.querySelector(".volume-percent");

// Set initial volume
currentsong.volume = 1; // max volume
volumeSlider.value = 1;
volumePercent.innerText = "100%";

// Update volume and percentage when slider moves
volumeSlider.addEventListener("input", (e) => {
    let volumeValue = parseFloat(e.target.value);
    currentsong.volume = volumeValue;

    let percent = Math.round(volumeValue * 100);
    volumePercent.innerText = `${percent}%`;
});

// Optional: If you change the volume programmatically somewhere else,
// update the slider and percentage display too.
function updateVolumeUI() {
    volumeSlider.value = currentsong.volume;
    volumePercent.innerText = `${Math.round(currentsong.volume / 100)}%`;
}






