import colorama
import uvicorn
from main_build import app

colorama.just_fix_windows_console()

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)