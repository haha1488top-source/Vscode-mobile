let score = 0;
let clickPower = 1;
let upgradeCost = 10;

const scoreDisplay = document.getElementById('scoreDisplay');
const clickBtn = document.getElementById('clickBtn');
const upgradeBtn = document.getElementById('upgradeBtn');
const upgradeCostDisplay = document.getElementById('upgradeCostDisplay');

clickBtn.addEventListener('click', () => {
    score += clickPower;
    updateUI();
});

upgradeBtn.addEventListener('click', () => {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        clickPower += 1;
        upgradeCost = Math.round(upgradeCost * 1.5);
        updateUI();
    } else {
        alert('Не вистачає монет!');
    }
});

function updateUI() {
    scoreDisplay.innerText = score;
    upgradeCostDisplay.innerText = 'Ціна: ' + upgradeCost;
}
