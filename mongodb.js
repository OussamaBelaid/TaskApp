// const mongodb = require('mongodb');

// const MongoClient = mongodb.MongoClient

// const ObjectId = mongodb.ObjectID;

const {MongoClient,ObjectID} = require('mongodb');


const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';



MongoClient.connect(connectionURL, {useNewUrlParser:true , useUnifiedTopology : true},(error , client) => {
   if(error)
   {
      return console.log("unable to connect to database");
   }
   console.log("connected");
   const db = client.db(databaseName);

// const fetch = db.collection('users').findOne({ _id: new ObjectID("5da5d7e74f2b3921dc7eabce")}, (error , user) => {
//   if(error)
//   {
//       return console.log(error);
//   }
//   console.log(user);
// });
// db.collection('users').find({age : "28"}).count((error,count) => {
//     console.log(count);
// })
//findone
// const fetchTasks = db.collection('tasks').findOne({ _id : new ObjectID("5da5d913dd2c8718589aaf5d")},(error,task) => {
//     if(error)
//     {
//         return console.log(error);
//     }
//     console.log(task);
// })
//find
// db.collection("tasks").find({completed : false}).toArray((error,task) => {
//     console.log("*********************************")
// console.log(task);
// })
//update
// db.collection('users').updateOne({_id : new ObjectID("5da5d7e74f2b3921dc7eabcf")}, {
//     $set : {
//         name  :'Mike'
//     }
// }).then((result) => {
//  console.log(result);
// }).catch((error) => {
// console.log(error);
// })

db.collection('users').deleteMany({
    age : "25"
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})

//    db.collection('users').insertOne({
//        _id:id,
//        name : 'salem',
//        age:'29'
//    }, (error,result) => {
//        if(error)
//        {
//            return console.log("unable to insert user");
//        }
//        console.log(result.ops);
//    })


////insert many
// db.collection('users').insertMany([{
//     name:'ahmed', 
//     age:'26'
// },{
//     name : 'ala',
//     age : '25'
// }], (error, result) => {
//     if(error)
//     {
//         return console.log('unable to insert document');
//     }
//     console.log(result.ops);

// })



// db.collection('tasks').insertMany([{
//     description : 'this is a ',
//     completed : false
// },
// {
//     description:'final description',
//     completed:true
// }], (error,result) => {
//     if(error)
//     {
//         return console.log("error inserting documents");
//     }
//     console.log(result.ops);
// })



})