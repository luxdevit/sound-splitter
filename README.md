# Sound Splitter Studio

A high-performance, local-first, privacy-focused audio track separator. Extract pristine vocals, bass, drums, and instrumentals from any track using the power of AI (Demucs) right on your local machine.

## Features
- **True Local Processing**: No cloud, no subscriptions, no data sent remotely. 100% privacy.
- **Hardware Accelerated**: Automatically utilizes Apple Silicon (M1/M2/M3/M4 MPS) or CPU.
- **Desktop Application**: Beautiful glassmorphism-styled web interface enclosed in a lightweight native desktop window (thanks to `pywebview` and `FastAPI`).
- **1-Click Install**: Pre-configured setup scripts for macOS/Linux and Windows.
- **Stem Options**: Extract 2 stems (Vocals + Instrumental) or 4 stems (Vocals, Bass, Drums, Other).

## Getting Started

### 1-Click Installation (Recommended)
You do not need any coding or terminal experience.
1. Download or `git clone` this repository.
2. If you are on **macOS/Linux**: double-click on `start_mac.command`.
3. If you are on **Windows**: double-click on `start_windows.bat`.

The launcher will automatically create an isolated environment, download all the necessary AI models, and start the beautiful Desktop Application.
*Note: The first launch might take a few minutes as it downloads PyTorch and the AI models.*

### Manual Installation (For developers)
If you prefer setting things up yourself:
```bash
git clone https://github.com/yourusername/sound-splitter.git
cd sound-splitter
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 desktop_app.py
```

## Architecture & Stack
- **[Demucs](https://github.com/facebookresearch/demucs)** - The core AI model for state-of-the-art music source separation.
- **[FastAPI](https://fastapi.tiangolo.com/)** - High performance backend framing the API.
- **[pywebview](https://pywebview.flowrl.com/)** - Cross-platform lightweight native webview container.
- **Vanilla Web (HTML/CSS/JS)** - Highly customized, ultra-lightweight glass UI without bloated UI frameworks.

## Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## License
This project is released under the [MIT License](LICENSE.md).
