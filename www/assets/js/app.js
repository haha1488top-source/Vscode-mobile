// Стан гри
let score = 0;
let clickPower = 1;
let upgradeCost = 10;

// Елементи інтерфейсу
const scoreDisplay = document.getElementById('scoreDisplay');
const clickBtn = document.getElementById('clickBtn');
const upgradeBtn = document.getElementById('upgradeBtn');
const upgradeCostDisplay = document.getElementById('upgradeCostDisplay');

// Функція кліку
clickBtn.addEventListener('click', () => {
    score += clickPower;
    updateUI();
});

// Купівля апгрейду
upgradeBtn.addEventListener('click', () => {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        clickPower += 1;
        upgradeCost = Math.round(upgradeCost * 1.5); // Збільшуємо ціну наступного апгрейду
        updateUI();
    } else {
        alert('Не вистачає монет!');
    }
});

// Оновлення екрану
function updateUI() {
    scoreDisplay.innerText = score;
    upgradeCostDisplay.innerText = 'Ціна: ' + upgradeCost;
}
