import webview
import threading
import uvicorn
import time

# Importiamo la tua app FastAPI da api.py
from api import app as fastapi_app

def run_server():
    # Facciamo girare FastAPI in un thread
    uvicorn.run(fastapi_app, host="127.0.0.1", port=8000, log_level="warning")

if __name__ == '__main__':
    # 1. Avviamo il server FastAPI in un demone che gira sullo sfondo
    t = threading.Thread(target=run_server, daemon=True)
    t.start()
    
    # 2. Diamo mezzo secondo a FastAPI per avviarsi prima di aprire la finestra
    time.sleep(1.0)
    
    # 3. Creiamo la finestra nativa stile Desktop
    # Su Mac userà WebKit di default (in pratica una finestra Safari senza bordi del browser)
    webview.create_window(
        title='Sound Splitter Desktop', 
        url='http://127.0.0.1:8000', 
        width=1200, 
        height=850,
        min_size=(900, 600),
        background_color='#0f172a' # Colore di sfondo scuro durante il caricamento
    )
    
    # 4. Facciamo partire la UI nativa.
    # Questo bloccherà il processo e terrà in vita anche Uvicorn.
    # Quando l'utente chiude la finestra dell'app, tutto il processo si spegnerà pulito!
    webview.start()
