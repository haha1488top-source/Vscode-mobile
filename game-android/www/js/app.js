document.addEventListener('DOMContentLoaded', () => {
    // Елементи інтерфейсу для оновлення математики
    const mainClicker = document.getElementById('mainClicker');
    const coinDisplay = document.getElementById('coinDisplay');
    const blingDisplay = document.getElementById('blingDisplay');
    const powerLevelDisplay = document.getElementById('powerLevel');
    const levelUpBtn = document.getElementById('levelUpBtn');

    // Стан рахунків
    let coins = 0;
    let blings = 451;
    let powerLevel = 1;
    let clickPower = 1;
    let upgradeCost = 15;

    // 1. Функція динамічної локалізації з JSON
    async function loadLocalization() {
        try {
            const response = await fetch('lang/ua.json');
            if (!response.ok) throw new Error('Не вдалося завантажити мовний файл');
            const langData = await response.json();
            
            // Заміна тексту для всіх елементів з атрибутом data-i18n
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (langData[key]) {
                    if (element.tagName === 'SPAN' && element.id === 'power2') {
                        // Захист змінних значень
                    } else {
                        element.innerText = langData[key];
                    }
                }
            });
            console.log('Українська локалізація успішно активована 🇺🇦');
        } catch (error) {
            console.error('Помилка локалізації:', error);
        }
    }

    // 2. Клік по Сигма Пін (заробляємо Монети як просив)
    mainClicker.addEventListener('click', (e) => {
        coins += clickPower;
        updateUI();
        createClickEffect(e);
    });

    // 3. Прокачка Сили (Апгрейд кліку)
    levelUpBtn.addEventListener('click', () => {
        if (coins >= upgradeCost) {
            coins -= upgradeCost;
            powerLevel++;
            clickPower += 1;
            upgradeCost = Math.round(upgradeCost * 1.6);
            updateUI();
        } else {
            // Візуальний ефект нехватки коштів
            levelUpBtn.style.animation = 'shake 0.2s ease';
            setTimeout(() => levelUpBtn.style.animation = '', 200);
        }
    });

    // 4. Оновлення лічильників на екрані
    function updateUI() {
        coinDisplay.innerText = coins;
        blingDisplay.innerText = blings;
        powerLevelDisplay.innerText = powerLevel;
    }

    // 5. Спливаючий ефект числа при кліку
    function createClickEffect(e) {
        const text = document.createElement('div');
        text.innerText = `+${clickPower}`;
        text.style.position = 'absolute';
        text.style.left = `${e.clientX || window.innerWidth/2}px`;
        text.style.top = `${e.clientY || window.innerHeight/2}px`;
        text.style.color = '#ffeb3b';
        text.style.fontSize = '1.8rem';
        text.style.fontWeight = '900';
        text.style.textShadow = '2px 2px 0 #000';
        text.style.pointerEvents = 'none';
        text.style.zIndex = '100';
        text.style.transform = 'translate(-50%, -50%)';
        text.style.animation = 'floatUp 0.4s ease-out forwards';
        
        document.body.appendChild(text);
        setTimeout(() => text.remove(), 400);
    }

    // Додаємо анімацію вильоту цифр до CSS динамічно
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes floatUp {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -120%) scale(1.2); opacity: 0; }
        }
        @keyframes shake {
            0%, 100% { transform: skewX(-10deg) translateX(0); }
            25% { transform: skewX(-10deg) translateX(-4px); }
            75% { transform: skewX(-10deg) translateX(4px); }
        }
    `;
    document.head.appendChild(style);

    // Старт
    loadLocalization();
    updateUI();
});
