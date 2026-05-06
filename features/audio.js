const inputSlider = {
  type: "input",
  inputType: "range",
  musicText: "Music Volume",
  sfxText: "SFX Volume",
};

const muteButton = {
  type: "button",
  text: "Mute Music",
  musicText: "Mute Music",
  sfxText: "Mute SFX",
};

const keys = {
    musicVol: "musicVol",
    sfxVolume: "sfxVolume",
    musicMuted: "musicMuted",
    sfxMuted: "sfxMuted",
    audioTime: "audioTime",
}

const toggleSoundPanel = () => {
  if (soundSettings.contains(musicVol)) {
    soundSettings.removeChild(musicVol);
    soundSettings.removeChild(musicMuteButton);
    soundSettings.removeChild(sfxVol);
    soundSettings.removeChild(sfxMuteButton);
  } else {
    soundSettings.appendChild(musicVol);
    soundSettings.appendChild(musicMuteButton);
    soundSettings.appendChild(sfxVol);
    soundSettings.appendChild(sfxMuteButton);
  }
};

const saveVolume = (storageKey, value) => {
    localStorage.setItem(storageKey, value);
};

const getVolume = (storageKey) => {
    return localStorage.getItem(storageKey);
};

const updateVolume = (storageKey, value) => {
    const audioElement = document.getElementById(storageKey);
    saveVolume(storageKey, value);
}

const toggleMuted = (storageKey) => {
    const isMuted = getMutedStatus(storageKey);
    localStorage.setItem(storageKey, !isMuted);
};

const getMutedStatus = (storageKey) => {
    return localStorage.getItem(storageKey) === "true";
};

// save current audio time before switching pages
const updateAudioTime = (time) => {
};

// get audio time from storage and update audio on page load
const setAudioTime = (time) => {
    localStorage.setItem(keys.audioTime, time);
};

//
//    Local Storage Initialization
//

localStorage.setItem(keys.musicVol, 0.1);
localStorage.setItem(keys.sfxVolume, 0.5);
localStorage.setItem(keys.musicMuted, false);
localStorage.setItem(keys.sfxMuted, false);
localStorage.setItem(keys.audioTime, 0);

//
//    Sound Panel Initialization
//

// create a div that shows in the bottom right-hand corner of all pages, for now focus on working in index.js
const soundSettings = document.createElement("div");

const startDiv = document.getElementById("start");
startDiv.appendChild(soundSettings);

//Add element IDs that match storage keys for easier access when updating values

const soundPanelButton = document.createElement("button");
soundPanelButton.innerText = "Sound Settings"; // replace with speaker icon
soundSettings.appendChild(soundPanelButton);

const musicVol = document.createElement(inputSlider.type);
musicVol.setAttribute("id", keys.musicVol);
musicVol.innerText = inputSlider.musicText;
musicVol.setAttribute("type", inputSlider.inputType);
musicVol.value = getVolume(keys.musicVol) * 100;

const musicMuteButton = document.createElement(muteButton.type);
musicMuteButton.innerText = muteButton.musicText;

const sfxVol = document.createElement(inputSlider.type);
sfxVol.innerText = inputSlider.sfxText;
sfxVol.setAttribute("type", inputSlider.inputType);
sfxVol.value = getVolume(keys.sfxVolume);

const sfxMuteButton = document.createElement(muteButton.type);
sfxMuteButton.innerText = muteButton.sfxText;

//
// Audio Initialization
//

const musicAudio = document.createElement("audio");
musicAudio.setAttribute("autoplay", true);
musicAudio.setAttribute("id", "musicAudio");
musicAudio.setAttribute("loop", true);

const musicSource = document.createElement("source");
musicSource.setAttribute("src", "/assets/music/Magic Scout - Cottages.mp3");
musicSource.setAttribute("type", "audio/mpeg");
musicAudio.appendChild(musicSource);

musicAudio.volume = getVolume(keys.musicVol);
soundSettings.appendChild(musicAudio);

// Play Magic Scout - Cottage in Main Menu, Northern Glade in Game


//
//   Event Listeners
//

soundPanelButton.addEventListener("click", toggleSoundPanel);

musicVol.addEventListener("input", (e) => {
    updateVolume(keys.musicVol, e.target.value / 100);
    musicAudio.volume = getVolume(keys.musicVol);
});

musicMuteButton.addEventListener("click", () => {
    toggleMuted(keys.musicMuted);
    musicAudio.volume = getMutedStatus(keys.musicMuted) ? 0 : getVolume(keys.musicVol);
});
