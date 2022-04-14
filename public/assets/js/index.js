const { json } = require("express");

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