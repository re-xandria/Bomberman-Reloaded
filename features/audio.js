const STORAGE_KEYS = {
    musicVol: "musicVol",
    sfxVolume: "sfxVolume",
    musicMuted: "musicMuted",
    sfxMuted: "sfxMuted",
    audioTime: "audioTime",
};

// -- Storage --

const saveValue = (key, value) => localStorage.setItem(key, value);
const loadFloat = (key) => parseFloat(localStorage.getItem(key));
const loadBool = (key) => localStorage.getItem(key) === "true";
const toggleMuted = (key) => saveValue(key, !loadBool(key));

const initStorageDefaults = () => {
    const defaults = [
        [STORAGE_KEYS.musicVol, 0.1],
        [STORAGE_KEYS.sfxVolume, 0.5],
        [STORAGE_KEYS.musicMuted, false],
        [STORAGE_KEYS.sfxMuted, false],
        [STORAGE_KEYS.audioTime, 0],
    ];
    for (const [key, value] of defaults) {
        if (localStorage.getItem(key) === null) saveValue(key, value);
    }
};

const saveAudioTime = (time) => saveValue(STORAGE_KEYS.audioTime, time);
const loadAudioTime = () => loadFloat(STORAGE_KEYS.audioTime);

// -- DOM Helpers --

const createAudioSection = (label, volKey) => {
    const section = document.createElement("div");
    section.classList.add("audio-section");

    const slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.setAttribute("id", volKey);
    slider.classList.add("slider");
    slider.value = loadFloat(volKey) * 100;

    const muteBtn = document.createElement("button");
    muteBtn.innerText = `Mute ${label}`;
    muteBtn.classList.add("mute-button");

    section.appendChild(slider);
    section.appendChild(muteBtn);

    return { section, slider, muteBtn };
};

// -- Initialization --

initStorageDefaults();

const startDiv = document.getElementById("start");

const soundSettingsContainer = document.createElement("div");
soundSettingsContainer.classList.add("audio-settings-container");
startDiv.appendChild(soundSettingsContainer);

const soundSettings = document.createElement("dialog");
soundSettings.classList.add("audio-panel");
soundSettingsContainer.appendChild(soundSettings);

const soundPanelButton = document.createElement("button");
soundPanelButton.innerText = "Sound Settings";
soundPanelButton.classList.add("audio-toggle");
soundSettingsContainer.appendChild(soundPanelButton);

const { section: musicSection, slider: musicVol, muteBtn: musicMuteButton } =
    createAudioSection("Music", STORAGE_KEYS.musicVol);

const { section: sfxSection, slider: sfxVol, muteBtn: sfxMuteButton } =
    createAudioSection("SFX", STORAGE_KEYS.sfxVolume);

soundSettings.appendChild(musicSection);
soundSettings.appendChild(sfxSection);

const musicAudio = document.createElement("audio");
musicAudio.setAttribute("autoplay", true);
musicAudio.setAttribute("id", "musicAudio");
musicAudio.setAttribute("loop", true);
musicAudio.volume = loadFloat(STORAGE_KEYS.musicVol);

const musicSource = document.createElement("source");
musicSource.setAttribute("src", "/assets/music/Magic Scout - Nothern Glade.mp3");
musicSource.setAttribute("type", "audio/mpeg");
musicAudio.appendChild(musicSource);
soundSettings.appendChild(musicAudio);

// -- Event Listeners --

soundPanelButton.addEventListener("click", () => {
    soundSettings.open ? soundSettings.close() : soundSettings.show();
});

musicVol.addEventListener("input", (e) => {
    const vol = e.target.value / 100;
    saveValue(STORAGE_KEYS.musicVol, vol);
    musicAudio.volume = loadBool(STORAGE_KEYS.musicMuted) ? 0 : vol;
});

musicMuteButton.addEventListener("click", () => {
    toggleMuted(STORAGE_KEYS.musicMuted);
    musicAudio.volume = loadBool(STORAGE_KEYS.musicMuted) ? 0 : loadFloat(STORAGE_KEYS.musicVol);
});

sfxVol.addEventListener("input", (e) => {
    saveValue(STORAGE_KEYS.sfxVolume, e.target.value / 100);
});

sfxMuteButton.addEventListener("click", () => {
    toggleMuted(STORAGE_KEYS.sfxMuted);
});
