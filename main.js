const numbersContainer = document.getElementById('numbers-container');
const generateButton = document.getElementById('generate-button');

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
