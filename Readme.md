Music Theory Helper B
You can enter notes into the app and it will tell you what key that you are playing in or if not enough notes, give you the options of keys that you might be playing in. You can select a key (for example, D Lydian) and it will tell you all the notes in that key and some chord examples that you can play to give off a D Lydian vibe.

## Frontend

[x] Users should see a fretboard with notes all on each fret
[ ] Users should see a saved song tab on the bottom
[x] Users should see a list of letters/ buttons they can click
[x] Users should be able to select multiple notes
[ ] when multiple notes are selected it will display multiple notes on the fretboard
[ ] Users should see every note highlighted from the selected note/s
[x] Users should see a box at the bottom displaying every key the selected notes are in
[x] Users can select the key button
[ ] A pop up should appear to make a song
[ ] Users should see their chord progression and key/scale displayed with all the notes
[ ] Users should be able to write song name
[ ] Users should be able to save their song
[ ] Users should be able to click on the song tab and be re routed

### Routes
[ ] '/' Login (home if not logged in)
[ ] '/' Home (home if logged in)
[ ] '/songs' Songs (saved song list from users)

## Backend

### Login Page

- post /login

### Home Page

- get /chords
- get /scales - make sure to join scales_chords  
- post /songs


### Songs Page

- get /users/:id/songs
- put /songs/:id
- delete /songs/:id


## DB

Songs
[ ] Id
[ ] Name
[ ] Progression column
[ ] Scale_id
[ ] User_id

Users
[ ] Id
[ ] Name
[ ] Email
[ ] Password

Scales
id
name

chords 
id
name

scales_chords
id
scale_id
chord_id