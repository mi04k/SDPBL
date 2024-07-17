document.addEventListener('DOMContentLoaded', () => {
    const wordInput = document.getElementById('word-input');
    const addWordButton = document.getElementById('add-word');
    const wordList = document.getElementById('word-list');
    const startGameButton = document.getElementById('start-game');
    const gameArea = document.getElementById('game-area');
    const currentWordDisplay = document.getElementById('current-word');
    const typingInput = document.getElementById('typing-input');
    const resultDisplay = document.getElementById('result');

    let words = [];
    let currentWord = '';
    let startTime;

    addWordButton.addEventListener('click', () => {
        const word = wordInput.value.trim();
        if (word) {
            words.push(word);
            const wordItem = document.createElement('div');
            wordItem.textContent = word;
            wordList.appendChild(wordItem);
            wordInput.value = '';
        }
    });

    startGameButton.addEventListener('click', () => {
        if (words.length > 0) {
            gameArea.classList.remove('hidden');
            wordInput.disabled = true;
            addWordButton.disabled = true;
            startGame();
        } else {
            alert('まずは単語を追加してください');
        }
    });

    typingInput.addEventListener('input', () => {
        if (typingInput.value === currentWord) {
            const timeTaken = (new Date() - startTime) / 1000;
            resultDisplay.textContent = `正解！所要時間: ${timeTaken}秒`;
            setTimeout(startGame, 1000);
        }
    });

    function startGame() {
        typingInput.value = '';
        resultDisplay.textContent = '';
        currentWord = words[Math.floor(Math.random() * words.length)];
        currentWordDisplay.textContent = currentWord;
        startTime = new Date();
        typingInput.focus();
    }