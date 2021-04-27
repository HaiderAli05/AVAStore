const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
},()=>console.log('Connected with MongoDB'));