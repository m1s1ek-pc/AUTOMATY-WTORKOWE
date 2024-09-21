let coins = 100;
let stake = 0;
let codeUsed = false; // Flaga do śledzenia użycia kodu

// Ustawienie stawki
function setStake(amount) {
    if (amount <= coins) {
        stake = amount;
        document.getElementById('spinButton').disabled = false;
        document.getElementById('result').textContent = `Stawka ustawiona na ${stake} coin`;
    } else {
        alert("Nie masz wystarczająco coinów!");
    }
}

// Losowanie slotów
function spin() {
    if (stake === 0) return;

    coins -= stake; // Odejmij stawkę od monet
    document.getElementById('coins').textContent = `Coiny: ${coins}`;

    const slotDisplay = document.getElementById('slot');
    const randomNumber = () => {
        const symbols = [1, 2, 3, 4, 5, 6, 7, '🌹']; // Usunięte liczby 8 i 9, dodana róża
        return symbols[Math.floor(Math.random() * symbols.length)];
    };

    let interval;
    // Animacja losowania
    interval = setInterval(() => {
        slotDisplay.textContent = `${randomNumber()} ${randomNumber()} ${randomNumber()}`;
    }, 100);

    // Po 2 sekundach zatrzymaj animację i pokaż wyniki
    setTimeout(() => {
        clearInterval(interval);
        const slot1 = randomNumber();
        const slot2 = randomNumber();
        const slot3 = randomNumber();
        const finalDisplay = `${slot1} ${slot2} ${slot3}`;
        slotDisplay.textContent = finalDisplay;

        let multiplier = calculateWin([slot1, slot2, slot3]);
        updateCoins(multiplier);
    }, 2000); // Czas animacji: 2 sekundy
}

// Kalkulacja wygranej
function calculateWin(numbers) {
    const [slot1, slot2, slot3] = numbers;
    let multiplier = 0;

    // Specjalne wygrane z różami
    if (slot1 === '🌹' && slot2 === '🌹' && slot3 === '🌹') {
        multiplier = 30; // 3 róże mnożą x30
        document.getElementById('result').textContent = "3x 🌹 - Super Róża! x30";
    } else if ((slot1 === '🌹' && slot2 === '🌹') || (slot2 === '🌹' && slot3 === '🌹') || (slot1 === '🌹' && slot3 === '🌹')) {
        multiplier = 4; // 2 róże mnożą x4
        document.getElementById('result').textContent = "2x 🌹 - Duża Wygrana! x4";
    } else if (slot1 === '🌹' || slot2 === '🌹' || slot3 === '🌹') {
        multiplier = 2; // 1 róża mnoży x2
        document.getElementById('result').textContent = "1x 🌹 - Mała Wygrana! x2";
    }
    // Nagrody za inne wygrane kombinacje z mnożnikami
    else if (slot1 === 7 && slot2 === 7 && slot3 === 7) {
        multiplier = 1000; // Jackpot
        document.getElementById('result').textContent = "777 - Jackpot! x1000";
    } else if (slot1 === 1 && slot2 === 1 && slot3 === 1) {
        multiplier = 5;
        document.getElementById('result').textContent = "111 - WIN! x5";
    } else if (slot1 === 0 && slot2 === 0 && slot3 === 1) {
        multiplier = 3;
        document.getElementById('result').textContent = "001 - AGENT WIN! x3";
    } else if (slot1 === 6 && slot2 === 6 && slot3 === 6) {
        multiplier = 7;
        document.getElementById('result').textContent = "666 - Super WIN! x7";
    } else if (slot1 === 5 && slot2 === 5 && slot3 === 5) {
        multiplier = 4;
        document.getElementById('result').textContent = "555 - Great WIN! x4";
    } else if (slot1 === 3 && slot2 === 3 && slot3 === 3) {
        multiplier = 2;
        document.getElementById('result').textContent = "333 - Nice WIN! x2";
    } else if (slot1 === 2 && slot2 === 2 && slot3 === 2) {
        multiplier = 6;
        document.getElementById('result').textContent = "222 - Double Lucky! x6";
    } else if (slot1 === 4 && slot2 === 4 && slot3 === 4) {
        multiplier = 5;
        document.getElementById('result').textContent = "444 - Quadra WIN! x5";
    } else if (slot1 === 2 && slot2 === 5 && slot3 === 2) {
        multiplier = 9;
        document.getElementById('result').textContent = "252 - Power Combo! x9";
    } else if (slot1 === 7 && slot2 === 2 && slot3 === 7) {
        multiplier = 10;
        document.getElementById('result').textContent = "727 - Lucky Wings! x10";
    } else if (slot1 === 3 && slot2 === 6 && slot3 === 9) {
        multiplier = 7;
        document.getElementById('result').textContent = "369 - Triple Energy! x7";
    } else {
        document.getElementById('result').textContent = "Spróbuj ponownie!";
    }

    return multiplier;
}

// Aktualizacja liczby coinów
function updateCoins(multiplier) {
    const coinsWon = stake * multiplier;
    coins += coinsWon;
    document.getElementById('coins').textContent = `Coiny: ${coins}`;
    stake = 0; // Resetuj stawkę
    document.getElementById('spinButton').disabled = true;
}

// Kod na darmowe coiny
function applyCode() {
    const codeInput = document.getElementById('codeInput').value;
    const codeResult = document.getElementById('codeResult');

    if (codeInput === "FREE100" && !codeUsed) {
        coins += 100;
        codeUsed = true; // Oznacz kod jako użyty
        document.getElementById('coins').textContent = `Coiny: ${coins}`;
        codeResult.textContent = "Kod zaakceptowany! Otrzymałeś 100 coinów.";
    } else if (codeUsed) {
        codeResult.textContent = "Kod został już użyty!";
    } else {
        codeResult.textContent = "Nieprawidłowy kod!";
    }
}

