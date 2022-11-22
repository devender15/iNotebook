const mongoos = require('mongoose');

const mongo_uri = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connect_to_mongo = ()=>{
    mongoos.connect(mongo_uri, ()=>{
        console.log("Connected to Mongo Successfully !");
    })
}

module.exports = connect_to_mongo;