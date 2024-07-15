let words = ["apple", "banana", "grape", "orange", "mango", "peach", "lemon", "lime", "cherry", "berry"];
let currentWord;
let startTime;
const wordElement = document.getElementById("word");
const inputElement = document.getElementById("input");
const messageElement = document.getElementById("message");
const startButton = document.getElementById("start");
const wordListInputElement = document.getElementById("wordListInput");
const updateWordsButton = document.getElementById("updateWords");

function updateWords() {
    const userInput = wordListInputElement.value;
    words = userInput.split(",").map(word => word.trim());
    alert("単語リストが更新されました: " + words.join(", "));
}

function startGame() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    wordElement.textContent = currentWord;
    inputElement.value = "";
    inputElement.disabled = false;
    inputElement.focus();
    messageElement.textContent = "";
    startTime = new Date().getTime();
}

function checkInput() {
    if (inputElement.value === currentWord) {
        const endTime = new Date().getTime();
        const timeTaken = (endTime - startTime) / 1000;
        messageElement.textContent = `正確にタイピングできました！かかった時間: ${timeTaken} 秒`;
        inputElement.disabled = true;
    }
}

updateWordsButton.addEventListener("click", updateWords);
startButton.addEventListener("click", startGame);
inputElement.addEventListener("input", checkInput);
