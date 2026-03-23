const URL = "https://teachablemachine.withgoogle.com/models/F8i530Ud8/";

let model, labelContainer, maxPredictions;

// DOM Elements
const imageUpload = document.getElementById('image-upload');
const previewImage = document.getElementById('preview-image');
const uploadPlaceholder = document.getElementById('upload-placeholder');
const resultSection = document.getElementById('result-section');
const loading = document.getElementById('loading');
const labelContainerEl = document.getElementById('label-container');
const retryButton = document.getElementById('retry-button');
const themeToggle = document.getElementById('theme-toggle');

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
});

// Load the model
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        console.log("Model loaded");
    } catch (e) {
        console.error("Error loading model", e);
    }
}

// Handle image upload
imageUpload.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
            uploadPlaceholder.style.display = 'none';
            
            await analyze();
        };
        reader.readAsDataURL(file);
    }
});

// Analyze the image
async function analyze() {
    if (!model) {
        loading.style.display = 'block';
        await init();
    }

    loading.style.display = 'block';
    resultSection.style.display = 'none';

    // Ensure image is loaded before predicting
    await new Promise((resolve) => {
        if (previewImage.complete) resolve();
        else previewImage.onload = resolve;
    });

    const predictions = await model.predict(previewImage);
    displayResults(predictions);
}

// Display results
function displayResults(predictions) {
    loading.style.display = 'none';
    resultSection.style.display = 'block';
    labelContainerEl.innerHTML = '';

    predictions.sort((a, b) => b.probability - a.probability);

    predictions.forEach(p => {
        const percentage = (p.probability * 100).toFixed(0);
        const barContainer = document.createElement('div');
        barContainer.classList.add('bar-container');

        const label = document.createElement('div');
        label.classList.add('label-text');
        label.innerText = `${p.className}: ${percentage}%`;

        const barWrapper = document.createElement('div');
        barWrapper.classList.add('bar-wrapper');

        const bar = document.createElement('div');
        bar.classList.add('bar-fill');
        bar.style.width = '0%'; // Start at 0 for animation
        bar.dataset.targetWidth = `${percentage}%`;
        
        // Specific colors for Dog and Cat
        if (p.className === '강아지') {
            bar.classList.add('dog-bar');
        } else if (p.className === '고양이') {
            bar.classList.add('cat-bar');
        }

        barWrapper.appendChild(bar);
        barContainer.appendChild(label);
        barContainer.appendChild(barWrapper);
        labelContainerEl.appendChild(barContainer);

        // Animate bar
        setTimeout(() => {
            bar.style.width = bar.dataset.targetWidth;
        }, 100);
    });
}

// Retry button
retryButton.addEventListener('click', () => {
    imageUpload.value = '';
    previewImage.src = '';
    previewImage.style.display = 'none';
    uploadPlaceholder.style.display = 'block';
    resultSection.style.display = 'none';
});

// Initialize model on load
window.onload = init;