@echo off
TITLE Sound Splitter - Setup

:: Move to the folder containing this script
cd /d "%~dp0"

echo === Initializing Sound Splitter ===
echo.

:: 1. Check Python
python --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo [Error] Python is not installed or not in PATH!
    echo Make sure to download it from python.org and check "Add Python to PATH" during installation.
    pause
    exit /b
)

:: 2. Create virtual environment if it doesn't exist
IF NOT EXIST ".venv" (
    echo -^> Creating local engine (first run, this might take a minute)...
    python -m venv .venv
)

:: 3. Activate environment and Install/Update requirements
echo -^> Verifying necessary packages...
call .venv\Scripts\activate.bat
python -m pip install --upgrade pip >nul 2>&1
pip install -r requirements.txt

:: 4. Start the native application
echo.
echo -^> Starting application...
python desktop_app.py

pause
