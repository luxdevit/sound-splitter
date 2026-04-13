# Hardware Requirements

Sound Splitter Studio runs completely offline using advanced AI (Demucs) to process and separate audio stems. Because all processing happens on your local machine, the speed of extraction depends heavily on your hardware.

## Minimum Requirements (Works, but slower)
These are the bare minimum specifications to get the application to open and run. Processing a 3-minute song on CPU will take approximately **2 to 5 minutes**.

- **OS**: Windows 10, macOS 11 (Big Sur), or Linux
- **Processor (CPU)**: Any 64-bit processor (Intel Core i3, AMD Ryzen 3 or newer)
- **Memory (RAM)**: 8 GB RAM
- **Storage**: ~5 GB of free disk space (for Python, PyTorch, and AI models)
- **Graphics (GPU)**: Not strictly required (the app will fall back to CPU rendering and processing)

## Recommended Requirements (Lightning Fast)
If you meet these specifications, processing a 3-minute song will typically take **less than 20 seconds**. The application takes full advantage of Hardware Acceleration.

- **OS**: Windows 11 or macOS 13+ (Ventura/Sonoma)
- **Processor (CPU)**: Apple Silicon (M1/M2/M3/M4) or Intel Core i7 / AMD Ryzen 7
- **Memory (RAM)**: 16 GB RAM or Unified Memory
- **Storage**: SSD (Solid State Drive) with 10 GB of free space
- **Graphics (GPU)**: 
  - **Mac**: Built-in Apple Silicon GPU (Automatically utilizes MPS acceleration)
  - **Windows/Linux**: Nvidia GPU with at least 4GB of VRAM (RTX 2060, 3060, 4060 or better). *Note: CUDA acceleration is required for GPU speeds on Windows.*
