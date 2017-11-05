# MVP for Social Computing project, dev name: Lipsum

Playing around with Google's [Firebase](https://firebase.google.com/ "Firebase") to determine if it can be used in one of my academic projects here at [University of Michigan School of Information](https://www.si.umich.edu/ "UMSI") for Fall 2017 term. Mastery course: [SI699.003 "Social Computing"](https://www.si.umich.edu/programs/courses/699 "SI699.003"). Adios!

__This MVP is strictly for testing the data persistence feasibility with Firebase__

.

### Terminology
- __user__ or __owner__ - The user of this mvp who can create experiences, upload shots and post comments on these shots. Along with social media stuff such as up voting a comment and reacting to a shot by either expressing "I was here..." or "I wish I was here..."
- __experience__ - The main _social object_ of this project. Basically a collection of photographs/videos taken by a user while transiting from point A to point B. Various geo-tagged photos between these points are available to the user if they reach that particular spot. This creates a sort of an "experience", esp. because of the surprise factor
- __category__ A tag from a pre-determined set of categories which the user can use to tag a particular experience
- __shot__ The photo/video taken by the user while experiencing an experience or creating their own
- __comment__ A snippet of text left by the user on a shot in an experiences

.

### Firebase structure
1. __/users/__
2. __/categories/__
2. __/experiences/\_guid\_/shots/\_guid\_/comments/__

.

### To discuss
- `[ ]` The forking of experiences won't work because then we will be limiting each experience to consist of shots from only one user ( social computing ¯\\\_\(ツ\)\_/¯)
- `[ ]` Let users add shots in others' experience and limit only if the experience is private
- `[ ]` Have a `sessions` object in firebase which will have values of every logged in user? (Can find active users. Will have to maintain this session tho)?
- `[ ]` User updates are only propagated till `experiences` and not `shots` and `comments` because of limitations on scalability

.

### Todo

- `[ ]` Forking an xp [???]
- `[ ]` Selective updates on firebase
- `[ ]` If an xp has a parent, `child.shots = $.extends( true, child.shots, parent.shots )` (gotta fetch the parent separately tho, can also lead to multi-level inheritance, a recursive retrieval can be tough on this MVP)

.

### Author
[Navdeep Singh Bagga](www.navdeepsb.com "Navdeep's online portfolio")