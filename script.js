
const startButton = document.getElementById('startTimer');
const activeTimers = document.getElementById('activeTimers');
const timerEndSound = document.getElementById('timerEndSound');

let timers = [];

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateNoTimersMessage() {
    const noTimersMessage = activeTimers.querySelector('.no-timers');
    if (timers.length === 0) {
        if (!noTimersMessage) {
            const message = document.createElement('p');
            message.className = 'no-timers';
            message.textContent = 'You have no timers currently!';
            activeTimers.appendChild(message);
        }
    } else {
        if (noTimersMessage) {
            noTimersMessage.remove();
        }
    }
}

function startNewTimer(hours, minutes, seconds) {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds <= 0) return;

    const timerElement = document.createElement('div');
    timerElement.className = 'timer';
    
    const timeDisplay = document.createElement('span');
    timeDisplay.textContent = formatTime(totalSeconds);

    const stopButton = document.createElement('button');
    stopButton.className = 'deletetimer'
    stopButton.textContent = 'Delete';

    timerElement.appendChild(timeDisplay);
    timerElement.appendChild(stopButton);
    activeTimers.appendChild(timerElement);

    const timer = { 
        remainingTime: totalSeconds, 
        interval: null, 
        element: timerElement, 
        timeDisplay, 
    };

    stopButton.addEventListener('click', () => {
        clearInterval(timer.interval);
        activeTimers.removeChild(timer.element);
        timers = timers.filter(t => t !== timer);
        updateNoTimersMessage();
    });

    timer.interval = setInterval(() => {
        timer.remainingTime -= 1;
        timer.timeDisplay.textContent = formatTime(timer.remainingTime);

        if (timer.remainingTime <= 0) {
            clearInterval(timer.interval);
            timer.element.classList.add('ended');
            timer.timeDisplay.textContent = 'Time Is Up!';
            timerEndSound.play();
        }
    }, 1000);

    timers.push(timer);
    updateNoTimersMessage();
}

startButton.addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    startNewTimer(hours, minutes, seconds);
});

updateNoTimersMessage();