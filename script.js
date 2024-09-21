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

        let coinsWon = calculateWin([slot1, slot2, slot3]);
        updateCoins(coinsWon);
    }, 2000); // Czas animacji: 2 sekundy
}

function calculateWin(numbers) {
    const [slot1, slot2, slot3] = numbers;
    let coinsWon = 0;

    // Nagrody za wygrane kombinacje
    if (slot1 === 7 && slot2 === 7 && slot3 === 7) {
        coinsWon = 1000;
        document.getElementById('result').textContent = "777 - Jackpot! +1000 coinów";
    } else if (slot1 === 9 && slot2 === 1 && slot3 === 9) {
        coinsWon = 100;
        document.getElementById('result').textContent = "919 - BIG WIN! +100 coinów";
    } else if (slot1 === 1 && slot2 === 1 && slot3 === 1) {
        coinsWon = 50;
        document.getElementById('result').textContent = "111 - WIN! +50 coinów";
    } else if (slot1 === 0 && slot2 === 0 && slot3 === 1) {
        coinsWon = 30;
        document.getElementById('result').textContent = "001 - AGENT WIN! +30 coinów";
    } else if (slot1 === 6 && slot2 === 6 && slot3 === 6) {
        coinsWon = 70;
        document.getElementById('result').textContent = "666 - Super WIN! +70 coinów";
    } else if (slot1 === 5 && slot2 === 5 && slot3 === 5) {
        coinsWon = 40;
        document.getElementById('result').textContent = "555 - Great WIN! +40 coinów";
    } else if (slot1 === 3 && slot2 === 3 && slot3 === 3) {
        coinsWon = 25;
        document.getElementById('result').textContent = "333 - Nice WIN! +25 coinów";
    } 
    // Nowe kombinacje wygranych
    else if (slot1 === 4 && slot2 === 8 && slot3 === 4) {
        coinsWon = 200;
        document.getElementById('result').textContent = "484 - Lucky Strike! +200 coinów";
    } else if (slot1 === 2 && slot2 === 2 && slot3 === 2) {
        coinsWon = 60;
        document.getElementById('result').textContent = "222 - Double Lucky! +60 coinów";
    } else if (slot1 === 4 && slot2 === 4 && slot3 === 4) {
        coinsWon = 50;
        document.getElementById('result').textContent = "444 - Quadra WIN! +50 coinów";
    } else if (slot1 === 8 && slot2 === 8 && slot3 === 8) {
        coinsWon = 80;
        document.getElementById('result').textContent = "888 - Triple Eights! +80 coinów";
    } else if (slot1 === 2 && slot2 === 5 && slot3 === 2) {
        coinsWon = 90;
        document.getElementById('result').textContent = "252 - Power Combo! +90 coinów";
    } else if (slot1 === 7 && slot2 === 2 && slot3 === 7) {
        coinsWon = 100;
        document.getElementById('result').textContent = "727 - Lucky Wings! +100 coinów";
    } else if (slot1 === 3 && slot2 === 6 && slot3 === 9) {
        coinsWon = 70;
        document.getElementById('result').textContent = "369 - Triple Energy! +70 coinów";
    } else if (slot1 === 8 && slot2 === 3 && slot3 === 8) {
        coinsWon = 75;
        document.getElementById('result').textContent = "838 - Power Win! +75 coinów";
    } else if (slot1 === 4 && slot2 === 1 && slot3 === 4) {
        coinsWon = 90;
        document.getElementById('result').textContent = "414 - Double Delight! +90 coinów";
    } else if (slot1 === 7 && slot2 === 5 && slot3 === 7) {
        coinsWon = 110;
        document.getElementById('result').textContent = "757 - Triple Jackpot! +110 coinów";
    } else if (slot1 === 5 && slot2 === 2 && slot3 === 5) {
        coinsWon = 120;
        document.getElementById('result').textContent = "525 - Special Win! +120 coinów";
    } else if (slot1 === 4 && slot2 === 2 && slot3 === 4) {
        coinsWon = 130;
        document.getElementById('result').textContent = "424 - Major Prize! +130 coinów";
    } else if (slot1 === 8 && slot2 === 1 && slot3 === 8) {
        coinsWon = 150;
        document.getElementById('result').textContent = "818 - Mega Lucky! +150 coinów";
    } else if (slot1 === 2 && slot2 === 4 && slot3 === 2) {
        coinsWon = 160;
        document.getElementById('result').textContent = "242 - Lucky Double! +160 coinów";
    } else if (slot1 === 9 && slot2 === 2 && slot3 === 9) {
        coinsWon = 180;
        document.getElementById('result').textContent = "929 - Ultra WIN! +180 coinów";
    } else if (slot1 === 3 && slot2 === 9 && slot3 === 3) {
        coinsWon = 200;
        document.getElementById('result').textContent = "393 - Jackpot Trio! +200 coinów";
    } else if (slot1 === 9 && slot2 === 3 && slot3 === 9) {
        coinsWon = 220;
        document.getElementById('result').textContent = "939 - King’s WIN! +220 coinów";
    } else if (slot1 === 4 && slot2 === 5 && slot3 === 4) {
        coinsWon = 240;
        document.getElementById('result').textContent = "454 - Super Bonus! +240 coinów";
    } else {
        document.getElementById('result').textContent = "Spróbuj ponownie!";
    }

    return coinsWon;
}

function updateCoins(coinsWon) {
    coins += coinsWon;
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
        document.getElementById('coins').textContent = `Coiny: ${coins}`;
        codeResult.textContent = "Kod zaakceptowany! Otrzymałeś 100 coinów.";
    } else if (codeUsed) {
        codeResult.textContent = "Kod został już użyty!";
    } else {
        codeResult.textContent = "Nieprawidłowy kod!";
    }
}

