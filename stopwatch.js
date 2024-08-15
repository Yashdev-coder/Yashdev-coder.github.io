let timer;
let hours = 0, minutes = 0, seconds = 0;
let running = false;

function updateTime() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

document.getElementById('start').addEventListener('click', () => {
    if (!running) {
        timer = setInterval(updateTime, 1000);
        running = true;
    }
});

document.getElementById('stop').addEventListener('click', () => {
    clearInterval(timer);
    running = false;
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timer);
    running = false;
    hours = 0;
    minutes = 0;
    seconds = 0;
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
});
