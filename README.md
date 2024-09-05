# scripture-ref-songs

A simple website that displays Scripture references to the lyrics of Christain songs and hymns. The application is made with React, Tailwind CSS, and Django.

# Build and Run

Run these commands:

1. `cd scripture_ref_songs/frontend`
2. `npm install`
3. `npm run build`
4. `cd ..`
5. `python manage.py runserver`
6. Local server should be running now: go to localhost at port 8000 (http://localhost:8000 or http://127.0.0.1:8000)
7. Also try: http://localhost:8000/viewsong/0/

# Changes

- If you make changes to the code and want to rebuild, just run:
    - `npm run build` in the `frontend` folder
    - And make sure the python server is running with: `python manage.py runserver` in the `scripture_ref_songs` folder
