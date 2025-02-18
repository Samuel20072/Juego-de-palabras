export let globalVolume = 1;


export const setVolume = (volume) => {
    globalVolume = parseFloat(volume);
   
    if (globalVolume === 0) {
        console.log("El audio está en mute");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const volumeControl = document.getElementById("volumeControl");
    
    if (volumeControl) {
        volumeControl.addEventListener("input", (event) => {
            setVolume(event.target.value);
        });
    }
});

const settings = () => {
    const menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
};


window.settings = settings;

document.addEventListener("click", function(event) {
    const dropdown = document.querySelector(".config-icon");
    if (!dropdown.contains(event.target)) {
        document.getElementById("menu").style.display = "none";
    }
});

const setFont = (size) => {
    document.body.style.fontSize = `${size}px`;
};

document.addEventListener("DOMContentLoaded", () => {
    const fontControl = document.getElementById("fontControl");

    if (fontControl) {
        fontControl.addEventListener("input", (event) => {
            setFont(event.target.value);
        });
    }
});