document.addEventListener('DOMContentLoaded', () => {
    const mainClicker = document.getElementById('mainClicker');
    const coinDisplay = document.getElementById('coinDisplay');
    const blingDisplay = document.getElementById('blingDisplay');
    const powerLevelDisplay = document.getElementById('powerLevel');
    const levelUpBtn = document.getElementById('levelUpBtn');

    let coins = 0; let blings = 451; let powerLevel = 1; let clickPower = 1; let upgradeCost = 15;

    async function loadLocalization() {
        try {
            const response = await fetch('lang/ua.json');
            const langData = await response.json();
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (langData[key]) element.innerText = langData[key];
            });
        } catch (e) { console.error(e); }
    }

    mainClicker.addEventListener('click', (e) => {
        coins += clickPower;
        updateUI();
        createClickEffect(e);
    });

    levelUpBtn.addEventListener('click', () => {
        if (coins >= upgradeCost) {
            coins -= upgradeCost; powerLevel++; clickPower += 1;
            upgradeCost = Math.round(upgradeCost * 1.6); updateUI();
        }
    });

    function updateUI() {
        if(coinDisplay) coinDisplay.innerText = coins; 
        if(blingDisplay) blingDisplay.innerText = blings; 
        if(powerLevelDisplay) powerLevelDisplay.innerText = powerLevel;
    }

    function createClickEffect(e) {
        const text = document.createElement('div');
        text.innerText = `+${clickPower}`; text.style.position = 'absolute';
        text.style.left = `${e.clientX || window.innerWidth/2}px`; text.style.top = `${e.clientY || window.innerHeight/2}px`;
        text.style.color = '#ffeb3b'; text.style.fontSize = '1.8rem'; text.style.fontWeight = '900';
        text.style.textShadow = '2px 2px 0 #000'; text.style.zIndex = '100'; text.style.transform = 'translate(-50%, -50%)';
        text.style.animation = 'floatUp 0.4s ease-out forwards'; document.body.appendChild(text);
        setTimeout(() => text.remove(), 400);
    }

    const style = document.createElement('style');
    style.innerHTML = `@keyframes floatUp { 0% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 100% { transform: translate(-50%, -120%) scale(1.2); opacity: 0; } }`;
    document.head.appendChild(style);
    loadLocalization(); updateUI();
});
