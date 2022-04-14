const router = require("express").Router();
const fs = require("fs");

// take the data from the db.json object and parse it to give the data length

const notesLength = () => {
  let data = fs.readFileSync("./db/db.json", "UTF8");
  data = JSON.parse(data);
  return data.length;
};

// router to get the data from db.json and then parsing the data to allow user to add new data 
router.get("/", (req, res) => {
  fs.readFile("./db/db.json", "UTF8", (err, data) => {
    if (err) throw err;
    const newData = JSON.parse(data);
    res.json(newData);
  });
});

//router post new data into the body and then using the JSON.stringify input this new data into an object to store in the db.json
router.post("/", (req, res) => {
  if (!noteId) noteId = notesLength();
  var noteId = Number(noteId);
  noteId += 1;
  req.body.id = noteId;
  fs.readFile("./db/db.json", "UTF8", (err, data) => {
    if (err) throw err;
    const newData = JSON.parse(data);
    const newNote = req.body;
    newData.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(newData), (err) => {
      if (err) throw err;
      res.json(newData);
    });
  });
});

//router to delete any unwanted data from db.json 

router.delete("/:id", (req, res) => {
  var deletion = req.params.id;
  console.log(deletion);
  fs.readFile("./db/db.json", "UTF8", (err, data) => {
    if (err) throw err;
    const newData = JSON.parse(data);
    for (var i = 0; i < newData.length; i++) {
      if (deletion == newData[i].id) {
        newData.splice(i, 1);
        fs.writeFile("./db/db.json", JSON.stringify(newData), (err) => {
          if (err) throw err;
          res.json(newData);
        });
      }
    }
  });
});

// module to encapsulate related code into a single unit of code to be used by other programs in the app
module.exports = router;
