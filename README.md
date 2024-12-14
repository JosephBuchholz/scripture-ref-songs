# scripture-ref-songs

A simple website that displays Scripture references to the lyrics of Christain songs and hymns. The application is made with React, Tailwind CSS, and Django.

# Build and Run

Run these commands:

1. `python -m venv venv`
2. To activate the virtual environment run:
   - Windows cmd: `venv/Scripts/activate.bat`
   - Windows PowerShell: `venv/Scripts/Activate.ps1`
   - Linux or macOS: `soruce venv/bin/activate`
3. `pip install -r requirements.txt`
4. `cd scripture_ref_songs/frontend`
5. `npm install`
6. `npm run build`
7. `cd ..`
8. `python manage.py runserver`
9. Local server should be running now: go to localhost at port 8000 (http://localhost:8000 or http://127.0.0.1:8000)
10. Also try: http://localhost:8000/viewsong/0/

Additionally, run `pip freeze > requirements.txt` in the main folder to add any newly installed libaries (via pip) to the requirements file.

# Changes

- If you make changes to the code and want to rebuild, just run:
  - `npm run build` in the `frontend` folder
  - And make sure the python server is running with: `python manage.py runserver` in the `scripture_ref_songs` folder
