const locales = {
    it: {
        subtitle: "Separa la voce dalla base musicale in pochi secondi",
        upload_text: "Trascina o clicca per caricare un audio",
        upload_subtext: "MP3, WAV supportati",
        label_mode: "Numero di canali da estrarre:",
        opt_2_stems: "2 canali (voce e base)",
        opt_4_stems: "4 canali (voce, basso, batteria, altro)",
        btn_extract: "Estrai",
        loading_title: "Elaborazione in corso...",
        loading_desc: "Stiamo processando l'audio. I tempi variano in base alla lunghezza del brano.",
        results_title: "Tracce Estratte!",
        btn_reset: "Carica Nuova Traccia",
        alert_invalid: "Inserisci un file audio valido (mp3, wav, ecc)",
        file_selected: "selezionato!",
        err_server: "Errore Server",
        err_net: "Errore di Rete",
        unsupported_audio: "Il browser non supporta HTML5 audio.",
        btn_download: "Scarica traccia wav"
    },
    en: {
        subtitle: "Separate voice from the musical base in seconds",
        upload_text: "Drop or click to upload audio",
        upload_subtext: "Supported: MP3, WAV",
        label_mode: "Number of channels to extract:",
        opt_2_stems: "2 channels (vocals and base)",
        opt_4_stems: "4 channels (vocals, bass, drums, other)",
        btn_extract: "Extract",
        loading_title: "Processing...",
        loading_desc: "We are processing the audio. The time required varies depending on the length of the song.",
        results_title: "Tracks Extracted!",
        btn_reset: "Upload New Track",
        alert_invalid: "Please upload a valid audio file (mp3, wav, etc)",
        file_selected: "selected!",
        err_server: "Server Error",
        err_net: "Network Error",
        unsupported_audio: "Browser does not support HTML5 audio.",
        btn_download: "Download wav track"
    }
};

let currentLang = 'it';

function setLanguage(lang) {
    if (!locales[lang]) return;
    currentLang = lang;
    
    // Switch translations in DOM
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (locales[lang][key]) {
            el.innerHTML = locales[lang][key]; 
        }
    });

    // Update the switcher button text
    const switcher = document.getElementById('langSwitcher');
    if (switcher) {
        switcher.innerHTML = lang === 'it' ? 'ITA' : 'ENG';
    }
}

function toggleLanguage() {
    setLanguage(currentLang === 'it' ? 'en' : 'it');
}

// Global shortcut for js side
function t(key) {
    return locales[currentLang][key] || key;
}

// Init when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    setLanguage('it');
    const switcher = document.getElementById('langSwitcher');
    if (switcher) switcher.addEventListener('click', toggleLanguage);
});
