#!/bin/bash

# ==========================================
# Sound Splitter - Launcher
# ==========================================

# Move to script directory
cd "$(dirname "$0")" || exit 1

echo "=== Initializing Sound Splitter ==="

# 1. Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python3 is not installed! Download it from python.org"
    read -p "Press Enter to exit..."
    exit 1
fi

# 2. Create the virtual environment if it doesn't exist (.venv)
if [ ! -d ".venv" ]; then
    echo "-> Creating local engine (first run, this might take a minute)..."
    python3 -m venv .venv
fi

# 3. Activate the virtual environment
source .venv/bin/activate

# 4. Install or update requirements
echo "-> Verifying necessary packages..."
python3 -m pip install --upgrade pip > /dev/null
pip install -r requirements.txt

# 5. Start the native desktop application
echo "-> Starting application..."
python3 desktop_app.py
