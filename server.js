// reqirements 
const express= require('express')
const morgan = require('morgan')
const bodyParser= require('body-parser')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const mongoose= require('mongoose')

require('dotenv').config()

// bringing  routes
const authRoutes = require('./Routes/auth');
const blogRoutes=require('./Routes/blog');
const userRoutes=require('./Routes/user');
const categoryRoutes = require('./Routes/category');
const TagRoutes = require('./Routes/tag');
// app
const app= express()

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
// setting up database


mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false})
.then(()=>{
    console.log("Connected to db")
})
.catch(err=>{
    console.log(err)
})

// setting up cors 
app.use(cors())

if(process.env.NODE_ENV==='development')
{
    app.use(cors({origin:process.env.CLIENT_URL}))
}

// setting up routes 
app.use('/api', blogRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', TagRoutes);



const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})