const mongoose = require('mongoose');
const connectionURL =process.env.MONGODB_URL;

mongoose.connect(connectionURL,{useNewUrlParser : true , useUnifiedTopology:true, useCreateIndex:true , useFindAndModify : false}).then((result) => {
    console.log(`connected to the database : ${connectionURL}`);
    
}).catch((error) => {

    console.log("error connecting to the database",error);
    
});


