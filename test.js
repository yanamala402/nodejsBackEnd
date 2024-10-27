
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())
app.use(cors())

//mongoose
console.log('pok',process.env.MONGO_URI)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection;

db.on('error',()=>{})
db.once('open',()=>{
    console.log('connecteds')
})

// model
const User =  new mongoose.Schema({
    name : {type : String},
    password : {type :  String}
})
const monUser = mongoose.model('details',User);

// controllers
const register = async (req, res) => {
    try {
        // console.log('kl',req)
        const { name, password } = req.body;
        console.log('klk', req.body)
        // const hashedPassword = await bcrypt.hash(password, 8);

        const user = new monUser({ password, name });
        console.log('done loading')
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUser = async (req, res) => {
    try {
        const userData = await monUser.find();

        res.status(201).json({ message: 'User registered successfully', data : userData });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// routers
const routs = express.Router();
const reg = routs.post('/register',register)
const regget = routs.get('/get',getUser)

// app use
app.use('/app/auth',reg)
app.use('/app/auth',regget)

app.listen(5000,()=>{
    console.log('port at 5000')
})