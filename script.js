// script.js

document.addEventListener('DOMContentLoaded', () => {
    const wordInput = document.getElementById('word-input');
    const addWordButton = document.getElementById('add-word');
    const wordList = document.getElementById('word-list');
    const startGameButton = document.getElementById('start-game');
    const gameArea = document.getElementById('game-area');
    const currentWordDisplay = document.getElementById('current-word');
    const typingInput = document.getElementById('typing-input');
    const resultDisplay = document.getElementById('result');
    const endGameButton = document.getElementById('end-game');

    let words = [];
    let currentWord = '';
    let startTime;
    let gameRunning = false;
    let wordIndex = 0; // 現在の単語のインデックス

    // 単語の追加
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

    // ゲーム開始
    startGameButton.addEventListener('click', () => {
        if (words.length > 0 && !gameRunning) {
            gameArea.classList.remove('hidden');
            wordInput.disabled = true;
            addWordButton.disabled = true;
            startGameButton.disabled = true;
            endGameButton.disabled = false; // ゲーム終了ボタンを有効化
            gameRunning = true;
            startGame();
        } else {
            alert('まずは単語を追加してください');
        }
    });

    // タイピングの入力検出
    typingInput.addEventListener('input', () => {
        if (typingInput.value === currentWord && gameRunning) {
            const timeTaken = (new Date() - startTime) / 1000;
            resultDisplay.textContent = `正解！所要時間: ${timeTaken.toFixed(2)}秒`;
            typingInput.value = ''; // 入力欄をクリア
            wordIndex++; // 次の単語へ
            if (wordIndex < words.length) {
                currentWord = words[wordIndex];
                currentWordDisplay.textContent = currentWord;
            } else {
                endGame(); // すべての単語が入力されたらゲーム終了
            }
        }
    });

    // ゲームの初期化
    function startGame() {
        wordIndex = 0; // 最初の単語から開始
        currentWord = words[wordIndex];
        currentWordDisplay.textContent = currentWord;
        startTime = new Date();
        typingInput.focus();
    }

    // ゲーム終了
    function endGame() {
        gameRunning = false;
        gameArea.classList.add('hidden');
        wordInput.disabled = false;
        addWordButton.disabled = false;
        startGameButton.disabled = false;
        endGameButton.disabled = true;
        resultDisplay.textContent = 'すべての単語が入力されました！ゲーム終了。';
    }

    // ゲーム終了ボタンのクリックイベント
    endGameButton.addEventListener('click', () => {
        endGame();
    });
});
