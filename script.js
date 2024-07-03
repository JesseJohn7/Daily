document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    getLocation();
    setInterval(updateTime, 1000); // Update time every second
    setInterval(updateQuote, 60000); // Update quote every minute
});

const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "Your limitation—it's only your imagination. - Unknown"
];

function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('currentTime').textContent = time;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('currentLocation').textContent = `${data.city}, ${data.country}`;
                });
        });
    } else {
        document.getElementById('currentLocation').textContent = 'Location not available';
    }
}

function setName() {
    const userName = document.getElementById('userName').value.trim();
    if (userName === '') {
        alert('Please enter your name');
        return;
    }
    document.getElementById('greeting').textContent = `Good morning, ${userName}`;
    document.getElementById('inputSection').style.display = 'none';
    document.getElementById('goalSection').style.display = 'block';
    updateQuote();
}

function addGoal() {
    const userGoal = document.getElementById('userGoal').value.trim();
    if (userGoal === '') {
        alert('Please enter your goal');
        return;
    }
    const goalItem = document.createElement('div');
    goalItem.classList.add('goal');
    goalItem.innerHTML = `
        <div>${userGoal}</div>
        <div>
            <input type="checkbox" onclick="completeGoal(this)">
            <button onclick="deleteGoal(this)">❌</button>
        </div>
    `;
    document.getElementById('goalsList').appendChild(goalItem);
    document.getElementById('userGoal').value = '';
}

function completeGoal(checkbox) {
    const goalItem = checkbox.closest('.goal');
    if (checkbox.checked) {
        goalItem.classList.add('completed');
    } else {
        goalItem.classList.remove('completed');
    }
}

function deleteGoal(button) {
    const goalItem = button.closest('.goal');
    goalItem.remove();
}

function updateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('motivationalQuote').textContent = quotes[randomIndex];
}
