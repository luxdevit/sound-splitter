const uploadZone = document.getElementById('upload-zone');
const uploadBox = document.querySelector('.upload-content');
const fileInp = document.getElementById('fileInp');
const processBtn = document.getElementById('processBtn');
const stemsSelect = document.getElementById('stems-select');
const loadZone = document.getElementById('loading-zone');
const resultsZone = document.getElementById('results-zone');
const grid = document.getElementById('audio-grid');
const resetBtn = document.getElementById('resetBtn');

let selectedFile = null;

// Drag and drop mechanics
uploadBox.addEventListener('click', () => fileInp.click());

uploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadBox.classList.add('dragover');
});

uploadBox.addEventListener('dragleave', () => {
    uploadBox.classList.remove('dragover');
});

uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadBox.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
    }
});

fileInp.addEventListener('change', () => {
    if (fileInp.files.length > 0) handleFile(fileInp.files[0]);
});

function handleFile(file) {
    if (!file.type.startsWith('audio/')) {
        alert(t('alert_invalid'));
        return;
    }
    selectedFile = file;
    document.querySelector('.upload-content p').innerHTML = `<strong>${file.name}</strong> ${t('file_selected')}`;
    processBtn.disabled = false;
}

processBtn.addEventListener('click', async () => {
    if (!selectedFile) return;

    // Show loading
    uploadZone.classList.add('hidden');
    loadZone.classList.remove('hidden');

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("stems", stemsSelect.value);

    try {
        const res = await fetch("/api/separate", {
            method: "POST",
            body: formData
        });
        
        const data = await res.json();
        if (data.status === "success") {
            displayResults(data.results);
        } else {
            alert(`${t('err_server')} ${data.message}`);
            resetApp();
        }
    } catch (err) {
        alert(`${t('err_net')} ${err.message}`);
        resetApp();
    }
});

function displayResults(resultsObj) {
    loadZone.classList.add('hidden');
    resultsZone.classList.remove('hidden');
    grid.innerHTML = '';

    // resultsObj è un dizionario tipo {"vocals": "separators/...", "instrumental": "..."}
    for (const [trackName, relPath] of Object.entries(resultsObj)) {
        // Correggi backslash per Windows se presenti, non qui ma just in case
        const fixPath = relPath.replace(/\\/g, '/');
        
        const card = document.createElement('div');
        card.className = 'audio-card';
        card.innerHTML = `
            <h4>${trackName.toUpperCase()}</h4>
            <audio controls preload="metadata">
                <source src="/${fixPath}" type="audio/wav">
                ${t('unsupported_audio')}
            </audio>
            <a href="/${fixPath}" download="${trackName}.wav" style="color:#aaa; text-decoration:none; font-size:0.9rem;">${t('btn_download')}</a>
        `;
        grid.appendChild(card);
    }
}

resetBtn.addEventListener('click', resetApp);

function resetApp() {
    selectedFile = null;
    processBtn.disabled = true;
    document.querySelector('.upload-content p').innerHTML = `
        <span data-i18n="upload_text">${t('upload_text')}</span>
    `;
    fileInp.value = '';
    
    resultsZone.classList.add('hidden');
    loadZone.classList.add('hidden');
    uploadZone.classList.remove('hidden');
}
