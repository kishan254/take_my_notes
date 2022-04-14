const router = require("express").Router()
const path = require('path');

//router to get the notes and respond by sending the file to the path and joining it with notes.html

router.get('./notes', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'notes.html'))
})

// router to get the global file and respond by join the file to index.html 
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

// mapping of router
module.exports = router