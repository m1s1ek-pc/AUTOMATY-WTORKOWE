let coins = 100;
let stake = 0;
let codeUsed = false; // Flaga do śledzenia użycia kodu

function setStake(amount) {
    if (amount <= coins) {
        stake = amount;
        document.getElementById('spinButton').disabled = false;
        document.getElementById('result').textContent = `Stawka ustawiona na ${stake} coin`;
    } else {
        alert("Nie masz wystarczająco coinów!");
    }
}

function spin() {
    if (stake === 0) return;

    coins -= stake; // Odejmij stawkę od monet
    document.getElementById('coins').textContent = `Coiny: ${coins}`;

    const slotDisplay = document.getElementById('slot');
    const randomNumber = () => Math.floor(Math.random() * 9) + 1;

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

        let winMultiplier = calculateWin([slot1, slot2, slot3]);
        updateCoins(winMultiplier);
    }, 2000); // Czas animacji: 2 sekundy
}

function calculateWin(numbers) {
    const [slot1, slot2, slot3] = numbers;
    let winMultiplier = 0;

    if (slot1 === 7 && slot2 === 7 && slot3 === 7) {
        winMultiplier = 1000;
        document.getElementById('result').textContent = "777 - Jackpot!";
    } else if (slot1 === 9 && slot2 === 1 && slot3 === 9) {
        winMultiplier = 100;
        document.getElementById('result').textContent = "919 - BIG WIN!";
    } else if (slot1 === 1 && slot2 === 1 && slot3 === 1) {
        winMultiplier = 10;
        document.getElementById('result').textContent = "111 - WIN!";
    } else if (slot1 === 0 && slot2 === 0 && slot3 === 1) {
        winMultiplier = 5;
        document.getElementById('result').textContent = "001 - AGENT WIN!";
    } else if (slot1 === 6 && slot2 === 6 && slot3 === 6) {
        winMultiplier = 50;
        document.getElementById('result').textContent = "666 - Super WIN!";
    } else if (slot1 === 5 && slot2 === 5 && slot3 === 5) {
        winMultiplier = 20;
        document.getElementById('result').textContent = "555 - Great WIN!";
    } else if (slot1 === 3 && slot2 === 3 && slot3 === 3) {
        winMultiplier = 5;
        document.getElementById('result').textContent = "333 - Nice WIN!";
    } else {
        document.getElementById('result').textContent = "Spróbuj ponownie!";
    }

    return winMultiplier;
}

function updateCoins(winMultiplier) {
    coins += stake * winMultiplier;
    document.getElementById('coins').textContent = `Coiny: ${coins}`;
    stake = 0; // Resetuj stawkę
    document.getElementById('spinButton').disabled = true;
}

function applyCode() {
    const codeInput = document.getElementById('codeInput').value;
    const codeResult = document.getElementById('codeResult');

    if (codeInput === "FREE100" && !codeUsed) {
        coins += 100;
        codeUsed = true; // Oznacz kod jako użyty
        codeResult.textContent = "Kod użyty! Otrzymujesz 100 coinów!";
        document.getElementById('coins').textContent = `Coiny: ${coins}`;
    } else if (codeUsed) {
        codeResult.textContent = "Kod został już użyty!";
    } else {
        codeResult.textContent = "Nieprawidłowy kod!";
    }

    document.getElementById('codeInput').value = ""; // Wyczyść pole po użyciu
}
