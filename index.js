const express = require('express');

const app = express();
// process.env.PORT to allow this app to be deployed in other environments
const PORT = process.env.PORT||3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//static folder is public folder
app.use(express.static('public'));

app.use('/api/notes', require('./routes/apiroutes'));
app.use('/', require('./routes/htmlroutes'));

app.listen(PORT, () => {
    console.log(`App Listening on PORT ${PORT}`);
});