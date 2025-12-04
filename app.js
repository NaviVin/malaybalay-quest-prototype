// Audio pool for button clicks
const audioPool = [];
let poolIndex = 0;
const POOL_SIZE = 4;

for (let i = 0; i < POOL_SIZE; i++) {
    const audio = new Audio("../FX/8bit-click.mp3");
    audio.volume = 0.6;
    audioPool.push(audio);
}

function playClickSound() {
    try {
        const sfx = audioPool[poolIndex];
        sfx.currentTime = 0;
        sfx.play().catch(() => {});
        poolIndex = (poolIndex + 1) % POOL_SIZE;
    } catch (err) {}
}

// Play sound and delay navigation
function startGame() {
    playClickSound();
    setTimeout(() => {
        window.location.href = "HTML/name.html";
    }, 1000);
}

function saveName() {
    const name = document.getElementById("playerNameInput").value.trim();

    if (name === "") {
        alert("Please enter your name!");
        return;
    }

    localStorage.setItem("playerName", name);
    playClickSound();
    setTimeout(() => {
        window.location.href = "avatar.html";
    }, 1000);
}

// Global click handler - intercepts button and anchor clicks
// Use capturing phase to catch clicks before any other handlers
document.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    const anchor = e.target.closest('a');
    
    if (button || anchor) {
        playClickSound();
        
        // If it's an anchor with href, delay navigation to allow sound to play
        if (anchor && anchor.href) {
            e.preventDefault();
            const href = anchor.href;
            setTimeout(() => {
                window.location.href = href;
            }, 1000);
        }
    }
}, true); // capturing phase
