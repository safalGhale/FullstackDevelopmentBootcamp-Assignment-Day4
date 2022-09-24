const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


//connect to MongoDB
mongoose.connect('mongodb+srv://safalghalegurung12:12345@cluster0.sygfuh7.mongodb.net/?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', ()=> {
    console.log('Connected to MongoDB');
});

//creating collections of students
const studentSchemas = new mongoose.Schema({name: String, age : Number});
const studentModel = mongoose.model('Student', studentSchemas);

const facultySchemas = new mongoose.Schema({name: String});
const facultyModel = mongoose.model('Faculty', facultySchemas);

app.post('/student', (req, res) => {
    const body = req.body;

    studentModel.create(body);

    res.status(200);
    res.send(body.name + ' created successfully');
});

app.get('/student', async (req, res) => {
    
    console.log('student home page', res.status(200));
    // res.send('you are on home page');
    const body = req.body;
    const studentdata = await studentModel.find(body);
    res.send({
        message: 'student information acquired successfully',
        data: studentdata
    });
});

app.delete('/student', async (req, res) => {
    const body = req.body;

    await studentModel.findOneAndDelete(body);

    console.log('student info deleted successfully', res.status(200));

    res.send({
        message: 'student info deleted successfully'
    });
});

app.patch('/student', async (req, res) => {
    const body = req.body;

    const id = body.id;

    await studentModel.findByIdAndUpdate(id, body);

    res.status(200);
    res.send({ message: 'student info updated successfully'});
});

app.post('/faculty', (req, res) => {
    const body = req.body;

    facultyModel.create(body);
    res.send('Faculty '+ body.name + ' created successfully');
});

app.get('/faculty', async (req, res) => {
    const faculty = await facultyModel.find();

    res.send('Faculty '+ faculty);
});




app.listen(4500, () => {
    console.log('listening on port 4500');
});