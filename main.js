const numbersContainer = document.getElementById('numbers-container');
const generateButton = document.getElementById('generate-button');
const themeToggle = document.getElementById('theme-toggle');

generateButton.addEventListener('click', () => {
    numbersContainer.innerHTML = '';
    const lottoNumbers = new Set();
    while (lottoNumbers.size < 6) {
        lottoNumbers.add(Math.floor(Math.random() * 45) + 1);
    }

    lottoNumbers.forEach(number => {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number');
        numberDiv.textContent = number;
        numbersContainer.appendChild(numberDiv);
    });
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
});

