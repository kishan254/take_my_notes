let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if(window.location.pathname === '/notes') {
    noteTitle = document.querySelector('.note-title');
    noteText = document.querySelector('.note-textarea');
    saveNoteBtn = document.querySelector('.save-note');
    newNoteBtn = document.querySelector('.new-note');
    noteList = document.querySelectorAll('.list-container .list-group');
}

// This shows an element

const show = (elem) => {
    elem.style.display = 'inline';
};

// This hides an element

const hide = (elem) => {
    elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the text area

let activeNote = {};

const getNotes = () =>
    fetch('/api/notes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

const saveNote = (note) => 
    fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });

const deleteNote = (id) =>
// `` are used to define template literals = interpolate any kind of exprssion in the template literals || For personal knowledge and remembering
    fetch (`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

const renderActiveNote = () => {
    hide(saveNoteBtn);

    if(activeNote.id) {
        noteTitle.setAttribute('readonly', true);
        noteText.setAttribute('readonly', true);
        noteTitle.value = activeNote.title;
        noteText.value = activeNote.text;
    } else {
        noteTitle.value = '';
        noteText.value = '';
    }
};

const handleNoteSave = () => {
    const newNote = {
        title: noteTitle.value,
        text: noteText.value,
    };

    saveNote(newNote).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    });
};

// Deleting the slected note

const handleNoteDelete = (e) => {
    //prevents the click listen for the list fro, being called when the button inside of it is clicked, stops event bubbling
    e.stopPropagation();

    const note = e.target;
    const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

    if (activeNote.id === noteId) {
        activeNote = {};
    }

    deleteNote(noteId).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    });
};

// sets the activeNote to an empty object and allows the user to enter a new note

const handleNewNoteView = (e) => {
    activeNote = {};
    renderActiveNote();
};

const handleRenderSaveBtn = () => {
    if (!noteTitle.value.trim() || !noteText.value.trim()) {
        hide(saveNoteBtn);
    } else {
        show(saveNoteBtn);
    }
};

// Render the list of note titles

const renderNoteList = async (note) => {
    let jsonNotes = await noteList.json();
    if (window.location.pathname === '/notes') {
        noteList.forEach((el) => (el.innerHTML = ''));
    }

    let noteListItems = [];

    // Returns HTML element with or woithout a delete button
    const createLi = (text, delBtn = true) => {
        const liEl = document.createElement('li');
        liEl.classList.add('list-group-item');

        const spanEl = document.createElement('span');
        spanEl.innerText = text;
        spanEl.addEventListener('click', handleNoteView);

        liEl.append(spanEl);

        if(delBtn) {
            const delBtnEl = document.createElement('i');
            delBtnEl.classList.add (
                'fas',
                'fa-trash-alt',
                'float-right',
                'text-danger',
                'delete-note'
            );

            delBtnEl.addEventListener('click', handleNoteDelete);

            liEl.append(delBtnEl);
        }

        return liEl;
    };

    if (jsonNotes.length === 0) {
        noteListItems.push(createLi('No saved notes', false));
    }

    jsonNotes.forEach((note) => {
        const li = createLi(note.title);
        li.dataset.note = JSON.stringify(note);

        noteListItems.push(li);
    });

    if (window.location.pathname === '/notes') {
        noteListItems.forEach((note) => noteList[0].append(note));
    }
};

//Gets notes from the db and renders them toi the sidebar

const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
    saveNoteBtn.addEventListener('click', handleNoteSave);
    newNoteBtn.addEventListener('click', handleNewNoteView);
    noteTitle.addEventListener('keyup', handleRenderSaveBtn);
    noteText.addEventListener('keyup', handleRenderSaveBtn);
};

getAndRenderNotes();