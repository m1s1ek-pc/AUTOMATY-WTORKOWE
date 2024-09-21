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

        let multiplier = calculateWin([slot1, slot2, slot3]);
        updateCoins(multiplier);
    }, 2000); // Czas animacji: 2 sekundy
}

function calculateWin(numbers) {
    const [slot1, slot2, slot3] = numbers;
    let multiplier = 0;

    // Nagrody za wygrane kombinacje z mnożnikami
    if (slot1 === 7 && slot2 === 7 && slot3 === 7) {
        multiplier = 1000; // Jackpot
        document.getElementById('result').textContent = "777 - Jackpot! x1000";
    } else if (slot1 === 9 && slot2 === 1 && slot3 === 9) {
        multiplier = 10;
        document.getElementById('result').textContent = "919 - BIG WIN! x10";
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
    } 
    // Nowe kombinacje wygranych
    else if (slot1 === 4 && slot2 === 8 && slot3 === 4) {
        multiplier = 20;
        document.getElementById('result').textContent = "484 - Lucky Strike! x20";
    } else if (slot1 === 2 && slot2 === 2 && slot3 === 2) {
        multiplier = 6;
        document.getElementById('result').textContent = "222 - Double Lucky! x6";
    } else if (slot1 === 4 && slot2 === 4 && slot3 === 4) {
        multiplier = 5;
        document.getElementById('result').textContent = "444 - Quadra WIN! x5";
    } else if (slot1 === 8 && slot2 === 8 && slot3 === 8) {
        multiplier = 8;
        document.getElementById('result').textContent = "888 - Triple Eights! x8";
    } else if (slot1 === 2 && slot2 === 5 && slot3 === 2) {
        multiplier = 9;
        document.getElementById('result').textContent = "252 - Power Combo! x9";
    } else if (slot1 === 7 && slot2 === 2 && slot3 === 7) {
        multiplier = 10;
        document.getElementById('result').textContent = "727 - Lucky Wings! x10";
    } else if (slot1 === 3 && slot2 === 6 && slot3 === 9) {
        multiplier = 7;
        document.getElementById('result').textContent = "369 - Triple Energy! x7";
    } else if (slot1 === 8 && slot2 === 3 && slot3 === 8) {
        multiplier = 7;
        document.getElementById('result').textContent = "838 - Power Win! x7";
    } else if (slot1 === 4 && slot2 === 1 && slot3 === 4) {
        multiplier = 9;
        document.getElementById('result').textContent = "414 - Double Delight! x9";
    } else if (slot1 === 7 && slot2 === 5 && slot3 === 7) {
        multiplier = 12;
        document.getElementById('result').textContent = "757 - Triple Jackpot! x12";
    } else if (slot1 === 5 && slot2 === 2 && slot3 === 5) {
        multiplier = 13;
        document.getElementById('result').textContent = "525 - Special Win! x13";
    } else if (slot1 === 4 && slot2 === 2 && slot3 === 4) {
        multiplier = 14;
        document.getElementById('result').textContent = "424 - Major Prize! x14";
    } else if (slot1 === 8 && slot2 === 1 && slot3 === 8) {
        multiplier = 15;
        document.getElementById('result').textContent = "818 - Mega Lucky! x15";
    } else if (slot1 === 2 && slot2 === 4 && slot3 === 2) {
        multiplier = 16;
        document.getElementById('result').textContent = "242 - Lucky Double! x16";
    } else if (slot1 === 9 && slot2 === 2 && slot3 === 9) {
        multiplier = 18;
        document.getElementById('result').textContent = "929 - Ultra WIN! x18";
    } else if (slot1 === 3 && slot2 === 9 && slot3 === 3) {
        multiplier = 20;
        document.getElementById('result').textContent = "393 - Jackpot Trio! x20";
    } else if (slot1 === 9 && slot2 === 3 && slot3 === 9) {
        multiplier = 22;
        document.getElementById('result').textContent = "939 - King’s WIN! x22";
    } else if (slot1 === 4 && slot2 === 5 && slot3 === 4) {
        multiplier = 24;
        document.getElementById('result').textContent = "454 - Super Bonus! x24";
    } else {
        document.getElementById('result').textContent = "Spróbuj ponownie!";
    }

    return multiplier;
}

function updateCoins(multiplier) {
    const coinsWon = stake * multiplier;
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
