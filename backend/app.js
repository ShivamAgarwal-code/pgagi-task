const express = require('express')
const app = express()
const mongoose = require("mongoose")
const morgan = require('morgan')
const bodyParser = require ('body-parser')
require('dotenv').config()
var cors = require("cors")
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/error')
const path = require('path')

//import routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const jobTypeRoute = require('./routes/jobsTypeRoutes')
const jobRoute = require('./routes/jobsRoutes')



//database connection

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology : true
}).then(()=>console.log("DB connected"))
.catch((err) => console.log("error occured"))

//middleware

app.use(morgan('dev'));
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({limit: "5mb", extended: true}));
app.use(cookieParser())
app.use(cors())

//Routes Middleware

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobTypeRoute)
app.use('/api', jobRoute)

// //static files for cyclic
// app.use(express.static(path.join(__dirname, '../frontend/build')))
// app.get('*', function(req,res){
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
// })



//error middleware
app.use(errorHandler);

//port
const port = process.env.PORT || 8000 

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`) 
});
